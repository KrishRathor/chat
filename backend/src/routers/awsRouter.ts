import { config } from "dotenv";
import { Router, type Request, type Response } from "express";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { z } from "zod";
import crypto from "crypto";
import { db } from "../drizzle/db";
import { fileTable } from "../drizzle/schema";

const awsRouter = Router();

config({ path: '.env' });

const s3 = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY as string,
    secretAccessKey: process.env.SECRET_KEY as string
  }
})

awsRouter.get('/getPresignedUrl', async (req: Request, res: Response) => {

  const name = crypto.randomUUID();
  const link = `https://d1okbxed4nu0ml.cloudfront.net/chat/${name}`

  try {
    const { url, fields } = await createPresignedPost(s3, {
      Bucket: "ytvideoraw",
      Key: `chat/${name}`,
      Conditions: [
        { bucket: "ytvideoraw" },
        ["content-length-range", 0, 100000000],
      ],
      Fields: {
        key: `chat/${name}`,
      },
      Expires: 600, // Expires in 10 minutes
    });
    res.json({ fields, url, link });
  } catch (error) {
    console.log(error);
  }

})

const saveToDbSchema = z.object({
  fromUsername: z.string(),
  toUsername: z.string(),
  link: z.string()
});


awsRouter.post('/saveToDb', async (req: Request, res: Response) => {

  const result = saveToDbSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      code: 400,
      message: 'Invalid input',
      body: result.error.format(),
    });
  }

  const { fromUsername, toUsername, link } = result.data;

  try {

    const saveToDb = await db.insert(fileTable).values({
      fromUsername,
      toUsername,
      link
    })

    res.json({
      code: 200,
      message: 'success',
      body: saveToDb
    })

  } catch (error) {
    console.log(error);
  }


})

export default awsRouter;

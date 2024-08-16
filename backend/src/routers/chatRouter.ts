import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { db } from "../drizzle/db";
import { chatTable, fileTable } from "../drizzle/schema";
import { and, eq } from "drizzle-orm";

const chatRouter = Router();

const sendMessageSchema = z.object({
  content: z.string(),
  fromUsername: z.string(),
  toUsername: z.string()
});

chatRouter.post('/sendMessage', async (req: Request, res: Response) => {


  const result = sendMessageSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      code: 400,
      message: 'Invalid input',
      errors: result.error.format(),
    });
  }

  const { content, fromUsername, toUsername } = result.data;

  try {

    const createMessage = await db.insert(chatTable).values({
      content,
      fromUsername,
      toUsername
    })

    return res.json({
      code: 200,
      message: 'msg sent',
      body: createMessage
    })

  } catch (error) {
    console.log(error);
  }

})

const getMsgSchema = z.object({
  fromUsername: z.string().min(1, 'Password is required'),
  toUsername: z.string(),
});

chatRouter.post('/getMsgBetweenUser', async (req: Request, res: Response) => {

  const result = getMsgSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      code: 400,
      message: 'Invalid input',
      errors: result.error.format(),
    });
  }

  const { fromUsername, toUsername } = result.data;

  try {

    const getMsg1 = await db.select().from(chatTable).where(
      and(
        eq(chatTable.fromUsername, fromUsername),
        eq(chatTable.toUsername, toUsername)
      )
    );

    const getMsg2 = await db.select().from(chatTable).where(
      and(
        eq(chatTable.fromUsername, toUsername),
        eq(chatTable.toUsername, fromUsername)
      )
    );

    const getFiles1 = await db.select().from(fileTable).where(
      and(
        eq(fileTable.fromUsername, fromUsername),
        eq(fileTable.toUsername, toUsername)
      )
    )

    const getFiles2 = await db.select().from(fileTable).where(
      and(
        eq(fileTable.fromUsername, toUsername),
        eq(fileTable.toUsername, fromUsername)
      )
    )

    const mergedMessages = [...getMsg1, ...getMsg2, ...getFiles1, ...getFiles2];

    const getMsg = mergedMessages.sort((a, b) =>
      // @ts-ignore
      a.createdAt < b.createdAt ? -1 : 1
    );

    return res.json({
      code: 200,
      message: 'conversation found',
      body: getMsg
    })

  } catch (error) {
    console.log(error);
  }

})

export default chatRouter;

import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { db } from "../drizzle/db";
import { statusTable } from "../drizzle/schema";
import { and } from "drizzle-orm";
import { eq } from "drizzle-orm";

const statusRouter = Router();

const changeStatusSchema = z.object({
  fromUsername: z.string(),
  toUsername: z.string(),
  status: z.string()
});

statusRouter.post('/changeStatus', async (req: Request, res: Response) => {
  console.log('came here');
  const result = changeStatusSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      code: 400,
      message: 'Invalid input',
      errors: result.error.format(),
    });
  }

  const { fromUsername, toUsername, status } = result.data;

  try {

    if (status !== "Archive" && status !== "UnArchive") {
      return res.status(400).json({
        code: 400,
        message: 'Invalid status value',
      });
    }

    const get = await db.select().from(statusTable).where(
      and(
        eq(statusTable.fromUsername, fromUsername),
        eq(statusTable.toUsername, toUsername)
      )
    )

    if (get.length > 0) {
      const changeStatus = await db.update(statusTable).set({
        status
      })
        .where(
          and(
            eq(statusTable.fromUsername, fromUsername),
            eq(statusTable.toUsername, toUsername)
          )
        );
    } else {
      await db.insert(statusTable).values({
        fromUsername,
        toUsername,
        status
      })
    }

    return res.json({
      code: 200,
      message: 'status changed successfully',
    })

  } catch (error) {
    console.log(error);
  }

})

const getStatusSchema = z.object({
  fromUsername: z.string(),
});


statusRouter.post('/getStatus', async (req: Request, res: Response) => {

  const result = getStatusSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      code: 400,
      message: 'Invalid input',
      errors: result.error.format(),
    });
  }

  const { fromUsername } = result.data;


  try {

    const status = await db.select().from(statusTable).where(
      and(
        eq(statusTable.fromUsername, fromUsername)
      )
    )

    return res.json({
      code: 200,
      message: 'status',
      body: status
    })

  } catch (error) {
    console.log(error);
  }
})

export default statusRouter;

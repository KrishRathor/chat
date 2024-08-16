import jwt from 'jsonwebtoken';
import { config } from "dotenv";
import { Router, type Request, type Response } from "express";
import { db } from "../drizzle/db";
import { usersTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt';
import { z } from "zod";

config({ path: '.env' });
const jwtSecret = process.env.JWT_SECRET as string;

const userRouter = Router();

const createUserSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  email: z.string().email('Invalid email address'),
});

async function hashPassword(password: string) {
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

userRouter.post('/signup', async (req: Request, res: Response) => {

  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      code: 400,
      message: 'Invalid input',
      errors: result.error.format(),
    });
  }

  const { username, password, email } = result.data;

  try {
    const user = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (user.length > 0) {
      return res.json({
        code: 200,
        message: 'User already exists',
        user: null
      })
    }

    const hashedPassword = await hashPassword(password);

    const createUser = await db.insert(usersTable).values({
      username,
      email,
      password: hashedPassword
    })

    return res.json({
      code: 200,
      message: 'User created',
      user: createUser
    })

  } catch (error) {
    console.log(error);
  }

})

const credentialsSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters long'),
});

userRouter.post('/signin', async (req: Request, res: Response) => {

  const result = credentialsSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      code: 400,
      message: 'Invalid input',
      body: result.error.format(),
    });
  }

  const { email, password } = result.data;

  try {

    const user = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if (user.length == 0) {
      return res.json({
        code: 404,
        message: 'User not found',
        body: null
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user[0].password);

    if (!isPasswordCorrect) {
      return res.json({
        code: 500,
        message: 'Invalid password',
        body: null
      })
    }

    const token = jwt.sign({
      username: user[0].username,
      email: user[0].email,
      avatar: user[0].createdAt,
      id: user[0].id
    }, jwtSecret);

    return res.json({
      code: 200,
      message: 'signin successful',
      body: {
        token,
        username: user[0].username
      }
    })

  } catch (error) {
    console.log(error);
  }

})

userRouter.get('/getAllUsers', async (req: Request, res: Response) => {
  try {
    const users = await db.select().from(usersTable);
    return res.json({
      code: 200,
      message: 'Users',
      body: users
    })
  } catch (error) {
    console.log(error);
  }
})

export default userRouter;

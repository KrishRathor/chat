import express, { type Request, type Response } from 'express';
import userRouter from './routers/userRouter';
import cors from "cors";
import chatRouter from './routers/chatRouter';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/chat', chatRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express, { type Request, type Response } from 'express';
import userRouter from './routers/userRouter';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/api/v1/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

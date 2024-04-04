import dotenv from 'dotenv'
import express from 'express'
import { Router, Request, Response } from 'express';
import cors from 'cors';

const app = express();
const route = Router()

app.use(cors());
app.use(express.json())
dotenv.config();

const PORT = parseInt(`${process.env.PORT || 3000}`);

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript ts Dev 123 testando' })
})

app.use(route)

app.listen(PORT, () => 'server running on port 3333')
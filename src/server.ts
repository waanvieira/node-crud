// formas diferentes de fazer import, modo tradicional
// import express from 'express'
// com require
const express = require('express')
const dotenv = require('dotenv')
// import dotenv from 'dotenv'
import { Router, Request, Response, response } from 'express';
dotenv.config();
import cors from 'cors';
import './database/connection'
import productController from './controllers/product.controller';

const app = express();
const route = Router();
app.use(cors());
app.use(express.json());

const PORT = parseInt(`${process.env.PORT || 3000}`);

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript ts Dev 123 testando' })
})

route.get('/api/products', productController.findAll);
route.get('/api/products/:id', productController.findById);
route.post('/api/products', productController.store);
route.put('/api/products/:id', productController.update);
route.delete('/api/products/:id', productController.destroy);

route.all('*', (req, res) => {
  res.status(404).json({message: 'Rota não encontrada'});
})

app.use(route)

app.listen(PORT, () => 'server running on port 3333')
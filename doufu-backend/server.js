import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// fetches variables from .env
dotenv.config();

// connect to mongo db, connect() returns a promise
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((error) => {
    console.log(error.message);
  });

const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/products/item/:slug', (req, res) => {
  const product = data.products.find((a) => a.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
  res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((a) => a._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
  res.send(data.products);
});

const port = process.env.PORT || 4000;

// Callback function to run when server is ready
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Router from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

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

// calling this endpoint populates the database
app.use('/api/seed', Router);
// calling this shows you the products
app.use('/api/products', productRouter);

const port = process.env.PORT || 4000;

// Callback function to run when server is ready
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

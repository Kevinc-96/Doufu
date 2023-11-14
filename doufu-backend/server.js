import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dataRouter from './routes/dataRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import expressAsyncHandler from 'express-async-handler';

// Fetches variables from .env
dotenv.config();

// Connect to mongo db, connect() returns a promise
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((error) => {
    console.log(error.message);
  });

const app = express();

// Converts data in req.body into a JSON object
// If you dont include this you will get this error
// {"message":"Cannot read properties of undefined (reading 'email')"}
// because the message wasn't converted to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Calling this populates the database
app.use('/api/data', dataRouter);
// Calling this shows you the products
app.use('/api/products', productRouter);

app.use('/api/users', userRouter);

// An middleware error handler for express
app.use((error, req, res, next) => {
  res.status(500).send({ message: error.message });
});

const port = process.env.PORT || 4000;

// Callback function to run when server is ready
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

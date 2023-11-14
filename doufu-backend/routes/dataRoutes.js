import express from 'express';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import data from '../data.js';

const dataRouter = express.Router();

dataRouter.get('/', async (req, res) => {
  await Product.deleteOne({});
  const Products = await Product.insertMany(data.products);
  await User.deleteOne({});
  const Users = await User.insertMany(data.users);
  res.send({ Products, Users });
});

export default dataRouter;

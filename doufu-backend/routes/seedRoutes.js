import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';

const Router = express.Router();

Router.get('/', async (req, res) => {
  await Product.deleteOne({});
  const Products = await Product.insertMany(data.products);
  res.send({ Products });
});

export default Router;

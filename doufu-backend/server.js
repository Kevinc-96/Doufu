import express from 'express';
import data from './data.js';

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

const port = process.env.PORT || 4000;

// Callback function to run when server is ready
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

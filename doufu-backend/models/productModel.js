import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviewCount: { type: Number, required: true },
    desc: { type: String, required: true },
  },
  {
    timestamps: true, // gives you timestamps for created and last updated
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;

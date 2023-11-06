import { Link } from 'react-router-dom';
import Rating from './Rating';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/esm/Badge';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(params) {
  const { product } = params;
  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCart = async (item) => {
    const itemExists = cartItems.find((a) => a._id === product._id);
    const quantity = itemExists ? itemExists.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.stock < quantity) {
      window.alert('Product Out of Stock');
      return;
    }
    contextDispatch({
      type: 'ADD_TO_CART',
      payload: { ...item, quantity },
    });
  };

  return (
    <div className="product" key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name}></img>
      </Link>
      <div className="product-details">
        <Link className="product-name-menu" to={`/product/${product.slug}`}>
          <p>{product.name}</p>
        </Link>
        <Rating rating={product.rating} reviewCount={product.reviewCount} />
        {/* <div>
          {product.stock > 0 ? (
            <Badge bg="success">In Stock</Badge>
          ) : (
            <Badge bg="danger">Out of Stock</Badge>
          )}
        </div> */}

        <p>${product.price}</p>
        {product.stock === 0 ? (
          <Button variant="light" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button onClick={() => addToCart(product)} className="add-to-cart">
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
}
export default Product;

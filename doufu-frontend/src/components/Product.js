import { Link } from 'react-router-dom';
import Rating from './Rating';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/esm/Badge';

function Product(params) {
  const { product } = params;
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
        <div>
          {product.stock > 0 ? (
            <Badge bg="success">In Stock</Badge>
          ) : (
            <Badge bg="danger">Out of Stock</Badge>
          )}
        </div>
        <p>${product.price}</p>
      </div>
    </div>
  );
}
export default Product;

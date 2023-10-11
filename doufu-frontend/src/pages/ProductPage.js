import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Badge from 'react-bootstrap/esm/Badge';

import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      // return previous state, set loading variable to true to show loading box
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      // Set products to the action in the payload which is from the backend
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      // return current state
      return state;
  }
};

function ProductPage() {
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        // Make an AJAX request an address, retrieve data then store in a variable
        const result = await axios.get(`/api/products/item/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
      // setProducts(result.data);
    };
    fetchData();
    // Include slug as a dependency
  }, [slug]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="product-page-image"
            src={product.image}
            alt={product.name}
          />
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item className="border-0">
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
              <hr></hr>
            </ListGroup.Item>
            <ListGroup.Item className="border-0">
              <Rating
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            </ListGroup.Item>
            <ListGroup.Item className="border-0">
              <p>${product.price}</p>
            </ListGroup.Item>
            <ListGroup.Item className="border-0">
              <p>{product.desc}</p>
            </ListGroup.Item>
            <ListGroup.Item className="border-0">
              {product.stock > 0 ? (
                <Button className="add-to-cart">Add to cart</Button>
              ) : (
                <Badge bg="danger">Out of Stock</Badge>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}
export default ProductPage;

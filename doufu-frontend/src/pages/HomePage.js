import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadBox from '../components/LoadBox';
import MsgBox from '../components/MsgBox';
// import data from './data.js';

// define a reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      // return previous state, set loading variable to true to show loading box
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      // Set products to the action in the payload which is from the backend
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      // return current state
      return state;
  }
};

function HomePage() {
  // dispatch is used to call an action to update state
  // logger is used to log the state changes in the reducer
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  // Using state hooks to fetch data from backend, use reducer instead of this
  // const [products, setProducts] = useState([]);

  // Effect hook
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        // Make an AJAX request to an address, retrieve data then store in a variable
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>doufu</title>
      </Helmet>
      <h1>Featured Items</h1>
      <div className="products">
        {/* Implement a loading screen */}
        {loading ? (
          <LoadBox />
        ) : error ? (
          <MsgBox variant="danger">{error}</MsgBox>
        ) : (
          <Row>
            {/* Reference the products fetched by the state hook above */}
            {products.map((product) => (
              <Col key={product.slug} sm={12} md={6} lg={3} className="mb-2">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomePage;

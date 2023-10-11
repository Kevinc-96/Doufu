import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column website-container">
        <header>
          <Navbar className="navbar">
            <Container fluid>
              <LinkContainer to="/">
                <Navbar.Brand>doufu</Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
        </header>

        <main>
          <Container fluid className="mt-2">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
            </Routes>
          </Container>
        </main>

        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

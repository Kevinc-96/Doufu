import data from './data';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header className="App-header">
          <a href="/">doufu</a>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <h2>Featured Pastries</h2>
          <div className="items">
            {data.products.map((item) => (
              <div className="item" key={item.slug}>
                <a href={`/product/${item.slug}`}>
                  <img src={item.image} alt={item.name}></img>
                </a>
                <div className="item-details">
                  <a href={`/product/${item.slug}`}>
                    <p>{item.name}</p>
                  </a>
                  <p>${item.price}</p>
                  <button>Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

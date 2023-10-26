import { useState } from 'react';
import './App.css';
import ProductPage from './pages/ProductPage';
import BeautyPage from './pages/BeautyPage';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import FashionPage from './pages/FashionPage';
import FoodDrinksPage from './pages/FoodDrinksPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <nav>
          <Link to="/product-page">Go to Product Page</Link>
        </nav> */}
        <Routes>
          <Route path='/product-page' element={<ProductPage />} />
          <Route path='/beauty-page' element={<BeautyPage />} />
          <Route path='/fashion-page' element={<FashionPage />} />
          <Route path='/fooddrinks-page' element={<FoodDrinksPage />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
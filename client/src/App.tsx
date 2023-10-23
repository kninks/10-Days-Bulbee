import { useState } from 'react';
import './App.css';
import ProductPage from './pages/ProductPage';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <nav>
          <Link to="/product-page">Go to Product Page</Link>
        </nav> */}
        <Routes>
          <Route path='/product-page' element={<ProductPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
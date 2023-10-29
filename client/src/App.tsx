import { useState } from 'react'
import { Routes, Route, Link, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home'
import Description from './pages/Description/Description';
import Summary from './pages/Summary/Summary';
import Header from './components/Header/Header';
import AdminAdd from './pages/AdminAdd/AdminAdd';
import Login from './pages/Login'
import Register from './pages/Register'
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation';
import ProductPage from './pages/Product/ProductPage';
import BeautyPage from './pages/Product/BeautyPage';
import FashionPage from './pages/Product/FashionPage';
import FoodDrinksPage from './pages/Product/FoodDrinksPage';

function App() {
  const navigate = useNavigate();
  const pathsWithoutHeader = ['/login', '/register'];
  const isHeaderVisible = !pathsWithoutHeader.includes(window.location.pathname);

  return (
    <div className="App">
      {isHeaderVisible && <Header />}
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/description' element={ <Description /> } />
        <Route path='/adminadd' element={ <AdminAdd /> } />
        <Route path='/summary' element={ <Summary /> } />
        <Route path='/product-page' element={<ProductPage />} />
        <Route path='/beauty-page' element={<BeautyPage />} />
        <Route path='/fashion-page' element={<FashionPage />} />
        <Route path='/fooddrinks-page' element={<FoodDrinksPage />} />
        {/* <Route path='/confirm' element={ <OrderConfirmation /> }></Route> */}
      </Routes>
    </div>
  )
}

export default App;
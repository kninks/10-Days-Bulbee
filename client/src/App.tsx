import { useState } from 'react'
import { Routes, Route, Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home'
import Description from './pages/Description/Description';
import Summary from './pages/Summary/Summary';
import Header from './components/Header/Header';
import AdminAdd from './pages/AdminAdd/AdminAdd';
import Login from './pages/Login'
import Register from './pages/Register'
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation';
import ProductPage from './pages/ProductPage';
import BeautyPage from './pages/BeautyPage';
import FashionPage from './pages/FashionPage';
import FoodDrinksPage from './pages/FoodDrinksPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={ <Home /> }></Route>
        <Route path='/login' element={ <Login /> }></Route>
        <Route path='/register' element={ <Register /> }></Route>
        <Route path='/adminadd' element={ <AdminAdd /> }></Route>
        <Route path='/summary' element={ <Summary /> }></Route>
        <Route path='/product-page' element={<ProductPage />} />
        <Route path='/beauty-page' element={<BeautyPage />} />
        <Route path='/fashion-page' element={<FashionPage />} />
        <Route path='/fooddrinks-page' element={<FoodDrinksPage />} />
        {/* <Route path='/confirm' element={ <OrderConfirmation /> }></Route> */}
      </Routes>
      {/* <Header /> */}
    </div>
  )
}

export default App;
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

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path:'/register',
    element: <Register />,
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Routes>
        <Route path='/home' element={ <Home /> }></Route>
        <Route path='/description' element={ <Description /> }></Route>
        <Route path='/adminadd' element={ <AdminAdd /> }></Route>
        <Route path='/summary' element={ <Summary /> }></Route>
        {/* <Route path='/confirm' element={ <OrderConfirmation /> }></Route> */}
      </Routes>
      <Header />
    </div>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './pages/Login'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Register from './pages/Register'

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
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
      <>
        <RouterProvider router={router} />
        {/* <Login /> */}
        {/* <u>
          <li><Link to='/login'>Login</Link> </li>
          <li><Link to='/register'>Register</Link></li>
        </u> */}
        
        {/* <Routes>
          <Route path='/' element={ <Login /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/login' element={ <Register /> } />
        </Routes> */}
      </>
    )
}

export default App

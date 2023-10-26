import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Home from './pages/Home'
import Header from './components/Header/Header'
import OrderConfirmation from './pages/OrderConfirmation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />
      <Home />
      {/* <OrderConfirmation /> */}
    </div>
  )
}

export default App

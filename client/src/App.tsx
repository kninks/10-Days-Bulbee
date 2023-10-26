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
      {/* <Home /> */}
      <OrderConfirmation
        image={"https://image-optimizer-th.production.sephora-asia.net/images/product_images/closeup_LANEIGE_NEO-Cushion_Matte_Open_top_02_a1233871836da13bc7c26ab233676004a29169b0_1687247803.png"}
        name={"Laneige Neo Cushion Matte SPF46 PA++ 25N1"}
        price={"1,500"}
        item={"1 Item"}
      />
    </div>
  )
}

export default App

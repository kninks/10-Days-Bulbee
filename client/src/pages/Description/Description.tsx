import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Description.css';

const Description = () => {
  const navigate = useNavigate();
  const handleBuyNowClick = () => {
    navigate('/summary')
  };

  const product = {
    name: 'Oh My Tint',   
    id: 'd80729a5-c736-4d50-8fec-c961c2ce5057',   
    description: 'OH MY TINT โฉมใหม่ล่าสุด 💋ลิปเนื้อละมุนในตำนานกลับมาอีก ครั้งแต่ราคาน่ารักเหมือนเดิม',
    category: 'Beauty',   
    picture_url: '',      
    bulb_price: 99,       
    quantity: 5
  }

  // const [product, setProduct] = useState<{name: string, id: string, description: string, categorry: string, picture_url: string, bulb_price: number, quantity: number}>({name: "", id: "", description: "", categorry: "", picture_url: "", bulb_price: 0, quantity: 0});

  // useEffect(() => {
  //   fetch('http://localhost:4000/products/get?param=d80729a5-c736-4d50-8fec-c961c2ce5057')
  //     .then((res) => res.json())
  //     .then((data) => setProduct(data)) 
  //     .catch((error) => console.log(error));
  // }, []);

  const [count, setCount] = useState(0)
    const lowestCount = () => {
      if (count > 0) {
        setCount(count - 1)
      }
    }

  const highestCount = () => {
    if (count < product.quantity) {
      setCount(count + 1)
    }
  }

  return (
    <div>
      <Link to ='/' className='back-link'>Back</Link>
      <h1>Description</h1>
      <div className='product-title'>
        {product.name}
      </div>
      <div className='bulb-price'>
        {product.bulb_price}
      </div>
      <div className='product-description'>
        <p className='description-text'>Description</p>
        {product.description}
      </div>
      <div className='product-quantity'>
        <p className='quantity-text'>Quantity</p>
        <div className='quantity-number'>
          <button className='quantity-button' onClick={lowestCount}>-</button>
            {count}  
          <button className='quantity-button' onClick={highestCount}>+</button>
        </div>
      </div>
      <div className='footer'>
        <button className='buynow-button' onClick={handleBuyNowClick}>Buy Now</button>
      </div>
    </div>
  );
};

export default Description;
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Description.css';
import useSwr from "swr"

const Description = () => {
  const navigate = useNavigate();
  const handleBuyNowClick = () => {
    navigate(`/summary?count=${count}`);
  };

  const productId = { param: '46ca6f33-cd6d-44a7-8078-0bd4e33e420d' };
  const queryParam = new URLSearchParams(productId).toString();

  // const { data, isLoading, error} = useSwr(`http://localhost:4000/product/get?${queryParam}`, () => {
    
  // })

  const [product, setProduct] = useState<{name: string, id: string, description: string, categorry: string, picture_url: string, bulb_price: number, quantity: number}>({name: "", id: "", description: "", categorry: "", picture_url: "", bulb_price: 0, quantity: 0});

  useEffect(() => {
    let isRun = false

    fetch(`http://localhost:4000/products/get?${queryParam}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log('Getting error', error));

    return () => {
      isRun = true
    }
  }, []);

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
    <div className='container'>
      <Link to ='/' className='back-link'>Back</Link>
      <div className='content'>
      <div>
        <img src={product.picture_url} alt="Product Image" className="product-image" style={{ width: "100%", height: "100%" }}/>
      </div>
      <div className='product-title'>
        {product.name}
      </div>
      <div className='bulb-price'>
        {product.bulb_price}
        <img src='light-bulb.png' className='bulb-png'/>
      </div>
      <div className='description-text'>Description</div>
        <div className='product-description'>
        {product.description}
      </div>
      </div>

      <div className='product-quantity'>
        <div className='quantity-text'>Quantity</div>
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
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Description.css';

const Description = () => {
  const navigate = useNavigate();
  const handleBuyNowClick = () => {
    navigate('/summary')
  };

  const productId = { param: 'eb306512-988f-436c-b236-10b94cdb15c8' };
  const queryParam = new URLSearchParams(productId).toString();

  const [product, setProduct] = useState<{name: string, id: string, description: string, categorry: string, picture_url: string, bulb_price: number, quantity: number}>({name: "", id: "", description: "", categorry: "", picture_url: "", bulb_price: 0, quantity: 0});

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch(`http://localhost:4000/products/get?${queryParam}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => setProduct(data)) 
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:4000/s3/get?${queryParam}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => setImageUrl(data.url)) 
      .catch((error) => console.log('Getting error at signed url', error));
  })

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
      <div>
        {imageUrl}
      </div>
      <div className='product-title'>
        {product.name}
      </div>
      <div className='bulb-price'>
        {product.bulb_price}
        <img src='light-bulb.png' className='bulb-png'/>
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
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Summary.css'

const Summary = () => {
  const navigate = useNavigate();
  const handleConfirmClick = () => {
    navigate('/confirm')
  };

  const [textData, setTextData] = useState('');
  const handleInputChange = (e: any) => {
    setTextData(e.target.value);
  }
  

  const handleSubmit = async () => {
    const sid = '6411111121';
    try {
      const response = await fetch('http://localhost:4000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textData, sid })
      });

      if (response.ok) {
        console.log('Discount Applied')
      }
    } catch (error) {
      console.error('Error sending text data:', error);
    }
  }

  const productId = { param: 'eb306512-988f-436c-b236-10b94cdb15c8' };
  const queryParam = new URLSearchParams(productId).toString();

  const [product, setProduct] = useState<{name: string, id: string, description: string, categorry: string, picture_url: string, bulb_price: number, quantity: number}>({name: "", id: "", description: "", categorry: "", picture_url: "", bulb_price: 0, quantity: 0});

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

  return (
    <div>
      <Link to ='/description' className='back-link'>Back</Link>
      <div className='order-summary'>
        Order Summary
      </div>
      <div className='product-description'>
        <div className='product-name'>{product.name}</div>
        <div className='product-bulb'>{product.bulb_price}</div><img src='light-bulb.png' className='bulb-png'/> 
      </div>
      <div className='head-sub'>
          Discount Code
      </div>
      <div className='discount-container'>
        <input type="text" value={textData} onChange={handleInputChange} className='input-text'/>
        <button className='apply-button' onClick={handleSubmit}>Apply</button>
      </div>

      <div className='seperate-line'></div>

      <div className='head-sub'>
        Payment
      </div>
      <div className='text-both'>
        <div className='text-both-sub'>Payment subtotal</div>
        <div className='text-both-sub'>{product.bulb_price}</div>
      </div>
      <div className='text-both'>
        <div className='text-both-sub'>Shipping</div>
        <div className='text-both-sub'>45</div>
      </div>
      <div className='text-both'>
        <div className='text-both-sub'>Discount</div>
        <div className='text-both-sub'>-25</div>
      </div>
      <div className='total-payment'>
        <div className='total-payment-left'>Total Payment</div>
        <div className='total-payment-right'>1500</div><img src='light-bulb.png' className='bulb-png'/>
      </div>

      <div className='seperate-line'></div>

      <div className='head-sub'>
        Delivery Address
      </div>
      <div className='detail'>
        Sasinapa (0xxxxxx)
      </div>
      <div className='detail'>
        1234 Bangkok, TH
      </div>

      <div className='seperate-line'></div>

      <div className='head-sub'>
        Additional Note
      </div>
      <input type='text' className='additional-box' />

      <div className='footer'>
        <button className='confirm-button' onClick={handleConfirmClick}>Confirm</button>
        {/* <div className='back-link'>
          <Link to ='/description' >Cancel Order</Link></div> */}
      </div>
    </div>
  )
}

export default Summary
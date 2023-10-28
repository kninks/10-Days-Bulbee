import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Summary.css'

const Summary = () => {
  const navigate = useNavigate();
  const handleConfirmClick = () => {
    navigate('/confirm')
  };

  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState(0)

  // const handleInputChange = (e: any) => {
  //   setCode(e.target.value);
  // }
  
  const handleSubmit = async () => {
    const sid = '6543222221';
    try {
      const response = await fetch('http://localhost:4000/info/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, sid })
      });
      // console.log(response)
      
      if (response.ok) {
        const yay = await response.json();
        console.log(yay)
        console.log(yay.amount)
        setDiscount(yay.amount);
      } else {
        console.error('Request failed with status: ' + response.status);
      }
    } catch (error) {
      console.error('Error sending text data:', error);
    }
  }

  const productId = { param: '86f2addc-8387-4922-8afa-3610f231cc50' };
  const queryParam = new URLSearchParams(productId).toString();

  const [product, setProduct] = useState<{name: string, id: string, description: string, categorry: string, picture_url: string, bulb_price: number, quantity: number}>({name: "", id: "", description: "", categorry: "", picture_url: "", bulb_price: 0, quantity: 0});

  useEffect(() => {
    let isRun = false

    fetch(`http://localhost:4000/product/get?${queryParam}`, {
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


  return (
    <div>
      <Link to ='/description' className='back-link'>Back</Link>
      <div className='order-summary'>
        Order Summary
      </div>

      <div>
        <img src={product.picture_url} alt="Product Image" className="product-image" style={{ width: "30%", height: "30%" }}/>
        <div className='product-description'>
          <div className='product-name'>{product.name}</div>
          <div className='product-bulb'>
            {product.bulb_price}
            <img src='light-bulb.png' className='bulb-png'/>
          </div> 
        </div>
      </div>

      <div className='head-sub'>
          Discount Code
      </div>
      <div className='discount-container'>
        <input type="text" value={code} onChange={(e: any) => setCode(e.target.value)} className='discount-text'/>
        <button className='discount-button' onClick={handleSubmit}>Apply</button>
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
        <div className='text-both-sub'>-{discount}</div>
      </div>
      <div className='total-payment'>
        <div className='total-payment-left'>Total Payment</div>
        <div className='total-payment-right'>
          1500<img src='light-bulb.png' className='bulb-png2'/>
        </div>
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
      <textarea className='additional-box' />

      <div className='footer'>
        <button className='confirm-button' onClick={handleConfirmClick}>Confirm</button>
        {/* <div className='back-link'>
          <Link to ='/description' >Cancel Order</Link></div> */}
      </div>
    </div>
  )
}

export default Summary
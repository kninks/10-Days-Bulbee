import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Summary.css'

const Summary = () => {

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

  const navigate = useNavigate();
  const handleConfirmClick = () => {
    navigate('/confirm')
  };

  return (
    <div>
      <Link to ='/description' className='back-link'>Back</Link>
      <div className='order-summary'>
        Order Summary
      </div> 
      <div>
      <input type="text" value={textData} onChange={handleInputChange} className='input-text'/>
        <button className='apply-button' onClick={handleSubmit}>Apply</button>
      </div>

      <div className='footer'>
        <button className='confirm-button' onClick={handleConfirmClick}>Confirm</button>
        <div className='back-link'>
          <Link to ='/description' >Cancel Order</Link></div>
      </div>
    </div>
  )
}

export default Summary
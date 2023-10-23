import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Summary = () => {
  return (
    <div>
      <Link to ='/description' className='back-link'>Back</Link>
      <div className='order-summary'>
        Order Summary
      </div>
      <div>
        <input className='input-code'></input>
        <button className='apply-button'>Apply</button>
      </div>
    </div>
  )
}

export default Summary
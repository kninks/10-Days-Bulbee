import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Summary = () => {
  return (
    <div>
      <Link to ='/description' className='back-link'>Back</Link>
      <h1>Order Summary</h1>
    </div>
  )
}

export default Summary
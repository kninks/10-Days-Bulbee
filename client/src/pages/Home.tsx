import React from 'react'

const Home = () => {
  return (
    <div className="homepage">
      <div className='banner'>
        <h1>Banner Area</h1>
      </div>
      <div className='banner-indicator'>

      </div>
      <div className='section'>
        <div className='my-bulb'>
          <img src='/light-bulb.png' className='bulb-icon' />
          <h3>Balance</h3>
        </div>
      </div>
      <div className='category'>
        <h2>Browse Category</h2>
      </div>
    </div>
  )
}

export default Home
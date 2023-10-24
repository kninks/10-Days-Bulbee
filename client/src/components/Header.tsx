import React from 'react'
import "../App.css"

const Header = () => {
  return (
    <div className="header">
      <div className="profile">
        <img src="/profile-icon.svg" className="profile" />
      </div>
      <div className='bulbee-logo'>
        <p>Bulbee</p>
      </div>
      <div className='bulb-balance-top'>
        <img src='/light-bulb.png' className='balance-top-img' />
        <p>10,000</p>
      </div>
    </div>
  );
}

export default Header
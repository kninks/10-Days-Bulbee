import React, { useState, useEffect } from "react";
import './Header.css'

const Header = () => {

  const userSid = { param: "6438888821" };
  const queryParam2 = new URLSearchParams(userSid).toString();

  const [bulb, setBulb] = useState(0);

  useEffect(() => {
    let isRun = false;

    fetch(`http://localhost:4000/info/get?${queryParam2}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setBulb(data.bulb))
      .catch((error) => console.log("Getting error", error));

    return () => {
      isRun = true;
    };
  }, []);
  
  return (
    <div className="header">
      <div className="profile">
        <img src="/profile-icon.png" className="profile" />
      </div>
      <div className='bulbee-logo'>
        <p>Bulbee</p>
      </div>
      <div className='bulb-balance-top'>
        <img src='/light-bulb.png' className='balance-top-img' />
        {bulb}
      </div>
    </div>
  );
}

export default Header
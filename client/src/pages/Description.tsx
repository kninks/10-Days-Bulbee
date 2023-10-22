import React, { useState, useEffect } from 'react'
import { DescriptionButton } from '../components/DescriptionButton'

const Description = () => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch('http://localhost:4000/products/get?param=d80729a5-c736-4d50-8fec-c961c2ce5057')
      .then((res) => res.json())
      .then((data) => setProduct(data)) 
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Description</h1>
      <DescriptionButton />
      {/* <p>{product.name}</p> */}
    </div>
  );
};

export default Description;
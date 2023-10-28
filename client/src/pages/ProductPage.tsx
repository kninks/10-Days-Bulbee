import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import Header from '../components/Header/Header';

import '../earn.css'


const ProductPage: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from your server
    fetch('http://localhost:4000/products/get-all')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
//        console.log(products)
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  return (
    <div>
      <Header/>
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            name={`${product.name} ${index + 1}`}
            price={product.bulb_price}
          />
        ))}
      </div>
    </div>

    
  );
};

export default ProductPage;
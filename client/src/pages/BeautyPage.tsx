import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const BeautyPage: React.FC = () => {
  const [products, setProducts] = useState([]);

useEffect(() => {
    fetch(`http://localhost:4000/products/get-by-category?category=Beauty`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log(products);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, []);
  

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          image={product.image} //--------------- ?
          name={`${product.name} ${index + 1}`}
          price={product.bulb_price}
        />
      ))}
    </div>
  );
  
};

export default BeautyPage;
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useNavigate, Link } from 'react-router-dom';


import './ProductPage.css'
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;700&display=swap" rel="stylesheet"></link>

const FoodDrinksPage: React.FC = () => {
  const [products, setProducts] = useState([]);

useEffect(() => {
    fetch(`http://localhost:4000/products/get-by-category?category=FoodDrinks`)
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
    <div>
      <Link to ='/' className='back-link'>Back</Link>
      <div className='product-cat-title'>Food and Drinks</div>
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            id={product.id}
            picture_url={product.picture_url}
            name={`${product.name} ${index + 1}`}
            price={product.bulb_price}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDrinksPage;
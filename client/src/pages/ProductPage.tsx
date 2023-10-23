import React from 'react';
import ProductCard from '../components/ProductCard';
import productImageA from '../assets/product-cush.png';

const products = Array(7).fill({
  id: 1, 
  name: "Product", 
  price: "$100", 
  image: productImageA  
});

const ProductPage: React.FC = () => {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={index} image={product.image} name={`${product.name} ${index+1}`} price={product.price} />
      ))}
    </div>
  );
};

export default ProductPage;

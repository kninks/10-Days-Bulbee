import React from 'react';

import '../earn.css'



interface ProductCardProps {
  image: string;
  name: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, price }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{price}</p>
    </div>
  );
};

export default ProductCard;
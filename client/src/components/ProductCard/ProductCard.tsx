import React from 'react';

import './ProductCard.css';
import LightBulbImg from '../../assets/light-bulb.png'

interface ProductCardProps {
  name: string;
  price: string;
  picture_url: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, picture_url }) => {
  return (
    <div className="product-card">
      <img src={picture_url} alt={name} />
      <div className="product-name">{name}</div>
      <div className = "price-container">
        <p>{price}</p>
        <img src={LightBulbImg} alt="รูปหลอดไฟจ้า" className="thumbnail"></img>
      </div>
    </div>
  );
};

export default ProductCard;


// import React from 'react';

// import '../earn.css'



// interface ProductCardProps {
//   image: string;
//   name: string;
//   price: string;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ image, name, price }) => {
//   return (
//     <div className="product-card">
//       <img src={image} alt={name} />
//       <h2>{name}</h2>
//       <p>{price}</p>
//     </div>
//   );
// };

// export default ProductCard;
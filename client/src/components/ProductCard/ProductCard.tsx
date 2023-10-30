import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./ProductCard.css";
import LightBulbImg from "../../assets/light-bulb.png";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  picture_url: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  picture_url,
}) => {
  return (
    <Link to={`/description?id=${id}`} className="product-card">
      <div className="img-area">
        <img src={picture_url} alt={name} />
      </div>
      <div className="text-area">
        <div className="product-name">
          <p>{name}</p>
        </div>
        <div className="product-price">
          <p>{price}</p>
          <img src="/light-bulb.png" />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

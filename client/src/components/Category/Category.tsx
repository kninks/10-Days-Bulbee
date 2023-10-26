import React from "react";
import "./Category.css";
interface Props {
  category: string;
  items: number;
}

const Category = ({category, items}: Props) => {
  return (
    <div className="category-box">
      <div className="category-img">
        <img />
      </div>
      <div className="text-area">
        <div className="category-name">
          <p>{category}</p>
        </div>
        <div className="item-value">
          <p>{items} items</p>
        </div>
      </div>
    </div>
  );
};

export default Category;

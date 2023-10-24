import React from "react";
import "./Category.css";

const Category = () => {
  return (
    <div className="category-box">
      <div className="category-img">
        <img />
      </div>
      <div className="text-area">
        <div className="category-name">
          <p>All Category</p>
        </div>
        <div className="item-value">
          <p>150 items</p>
        </div>
      </div>
    </div>
  );
};

export default Category;

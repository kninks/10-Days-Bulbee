import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./OrderConfirmation.css";
import BackToHome from "../../components/BackToHome/BackToHome";

interface Products {
  image: string;
  name: string;
  total: number;
  count: number | undefined;
}

function OrderConfirmation() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const count = parseInt(params.get("count") || "0", 10); // Parse the count from URL or default to 0.
  const total = parseInt(params.get("total") || "0", 10)

  const productId = { param: "46ca6f33-cd6d-44a7-8078-0bd4e33e420d" };
  const queryParam = new URLSearchParams(productId).toString();

  const [product, setProduct] = useState<{
    name: string;
    picture_url: string;
  }>({
    name: "",
    picture_url: "",
  });

  useEffect(() => {
    let isRun = false;

    fetch(`http://localhost:4000/products/get?${queryParam}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log("Getting error", error));

    return () => {
      isRun = true;
    };
  }, []);

  function renderItemsCount(props: Products) {
    const { count } = props;
    const itemText = count === 1 ? "Item" : "Items";
    return `${count} ${itemText}`;
  }

  return (
    <div className="order-confirmed-section">
      <div className="confirm-pic">
        <img src="./green-check.svg" />
      </div>
      <div className="confirm-message-1">
        <h1>Your order<br/>has been placed</h1>
      </div>
      <div className="confirm-message-2">
        <p>Thank you so much for your <br/>purchase, and have a bright day</p>
      </div>
      <div className="divider"></div>
      <div className="my-order">
        <h2>My Order</h2>
        <div className="my-order-box">
          <div className="product-img">
            <img src={product.picture_url} />
          </div>
          <p className="product-name">{product.name}</p>
          <div className="product-items">
            <p>{renderItemsCount({
              count,
              image: "",
              name: "",
              total: 0
            })}</p>
          </div>
          <div className="product-view-details">
            <p><u>View Details</u></p>
          </div>
          <div className="product-price">
            <p>{total}</p>
            <img src="./light-bulb.png" className="bulb"/>
          </div>
        </div>
      </div>
      <div className="back-to-home-button">
        <BackToHome />
      </div>
    </div>
  );
}

export default OrderConfirmation;

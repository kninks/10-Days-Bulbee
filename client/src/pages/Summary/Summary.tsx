import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./Summary.css";

const Summary = () => {
  const navigate = useNavigate();
  const handleConfirmClick = () => {
    navigate(`/confirm?count=${count}&total=${total}`);
  };

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(45);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const count = parseInt(params.get("count") || "0", 10); // Parse the count from URL or default to 0.

  const handleSubmit = async () => {
    const sid = "6543222221";
    try {
      const response = await fetch("http://localhost:4000/info/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, sid }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data.amount);
        setDiscount(data.amount);
      } else {
        console.error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Error sending text data:", error);
    }
  };

  const productId = { param: "46ca6f33-cd6d-44a7-8078-0bd4e33e420d" };
  const queryParam = new URLSearchParams(productId).toString();

  const [product, setProduct] = useState<{
    name: string;
    id: string;
    description: string;
    category: string;
    picture_url: string;
    bulb_price: number;
    quantity: number;
  }>({
    name: "",
    id: "",
    description: "",
    category: "",
    picture_url: "",
    bulb_price: 0,
    quantity: 0,
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

  const userSid = { param: "6438888821" };
  const queryParam2 = new URLSearchParams(userSid).toString();

  const [user, setUser] = useState<{
    first_name: string;
    last_name: string;
    address: string;
    postal_code: string;
    phone_number: string;
  }>({
    first_name: "",
    last_name: "",
    address: "",
    postal_code: "",
    phone_number: "",
  });

  useEffect(() => {
    let isRun = false;

    fetch(`http://localhost:4000/auth/get_one?${queryParam2}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.log("Getting error", error));

    return () => {
      isRun = true;
    };
  }, []);

  useEffect(() => {
    const calSub: number = parseFloat(product.bulb_price) * count;
    const calculate: number = parseFloat(calSub) + shipping - discount;
    setTotal(calculate);
    setSubtotal(calSub);
  }, [discount, product.bulb_price, shipping]);

  return (
    <div>
      <Link to="/description" className="back-link">
        Back
      </Link>
      <div className="order-summary">Order Summary</div>

      <div>
        <img
          src={product.picture_url}
          alt="Product Image"
          className="product-image"
          style={{ width: "30%", height: "30%" }}
        />
        <div className="product-description">
          <div className="product-name">{product.name}</div>
          <div className="coount-item"> {count} item</div>
          <div className="product-bulb">
            {product.bulb_price}
            <img src="light-bulb.png" className="bulb-png" />
          </div>
        </div>
      </div>

      <div className="head-sub">Discount Code</div>
      <div className="discount-container">
        <input
          type="text"
          value={code}
          onChange={(e: any) => setCode(e.target.value)}
          className="discount-text"
        />
        <button className="discount-button" onClick={handleSubmit}>
          Apply
        </button>
      </div>

      <div className="seperate-line"></div>

      <div className="head-sub">Payment</div>
      <div className="text-both">
        <div className="text-both-sub">Payment subtotal</div>
        <div className="text-both-sub">{subtotal}</div>
      </div>
      <div className="text-both">
        <div className="text-both-sub">Shipping</div>
        <div className="text-both-sub">{shipping}</div>
      </div>
      <div className="text-both">
        <div className="text-both-sub">Discount</div>
        <div className="text-both-sub">-{discount}</div>
      </div>
      <div className="total-payment">
        <div className="total-payment-left">Total Payment</div>
        <div className="total-payment-right">
          {total}
          <img src="light-bulb.png" className="bulb-png2" />
        </div>
      </div>

      <div className="seperate-line"></div>

      <div className="head-sub">Delivery Address</div>
      <div className="detail">
        {user.first_name} {user.last_name} ({user.phone_number})
      </div>
      <div className="detail">
        {user.address}
        {user.postal_code}
      </div>

      <div className="seperate-line"></div>

      <div className="head-sub">Additional Note</div>
      <textarea className="additional-box" />

      <div className="footer">
        <div className="button-container">
          <button className="confirm-button" onClick={handleConfirmClick}>
            Confirm
          </button>
        </div>
        <div className="back-link">
          <Link to="/description">Cancel Order</Link>
        </div>
      </div>
    </div>
  );
};

export default Summary;

import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./Summary.css";

const Summary = () => {

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(45);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [discountapplied, setDiscountapplied] = useState(false)
  const sid = "6438888821";
  // const id = "46ca6f33-cd6d-44a7-8078-0bd4e33e420d";

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id")
  const count = parseInt(params.get("count") || "0", 10); // Parse the count from URL or default to 0.

  //link to confirmation page and update bulbb ------------------------------------------
  const navigate = useNavigate();
  const handleConfirmClick = async () => {
    try {
      const response = await fetch("http://localhost:4000/info/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ total, sid }),
      });

      const data = await response.json()

      if (data.status) {
        const response2 = await fetch("http://localhost:4000/products/update_quantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count, id }),
      })
        const data2 = await response2.json();
        if (data2.status) {
          navigate(`/confirm?id=${id}&count=${count}&total=${total}`);
        } else {
          console.log('Error occur')
        }
      } else {
        // console.log("Not enough bulb");
        return alert('Not enough bulb')
      }
    } catch (error) {
      console.error("Error sending text data:", error);
    }
  };

  //deal with discount ------------------------------------------
  const handleSubmit = async () => {
    if (discountapplied) {
      alert("You can use discount only once!")
      return;
    }
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
        setDiscountapplied(true)
      } else {
        console.error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Error sending text data:", error);
    }
  };

  //get product data ------------------------------------------
  // const productId = { param: id };
  // const queryParam = new URLSearchParams(productId).toString();
  const queryParam = `param=${id}`;
  const searchParams = new URLSearchParams(queryParam);

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

    fetch(`http://localhost:4000/products/get?${searchParams}`, {
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

  //get user data ------------------------------------------
  const userSid = { param: sid };
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

  //set total cost ------------------------------------------
  useEffect(() => {
    const calSub: number = parseFloat(product.bulb_price) * count;
    const calculate: number = parseFloat(calSub) + shipping - discount;
    setSubtotal(calSub);

    if (calculate > 0) {
      setTotal(calculate);
    } else {
      setTotal(0)
    }
  }, [discount, product.bulb_price, shipping]);

  return (
    <div>
      <Link to={`/description?id=${id}`} className="back-link">
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

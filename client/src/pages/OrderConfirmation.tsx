import "./OrderConfirmation.css";

interface Products {
  image: string;
  name: string;
  price: string;
  item: string;
}

function OrderConfirmation({image, name, price, item}: Products) {
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
            <img src={image} />
          </div>
          <p className="product-name">{name}</p>
          <div className="product-detail">
            <p>{item}</p>
            <p><u>View Details</u></p>
          </div>
          <div className="product-price">
            <p>{price}</p>
            <img src="./light-bulb.png" className="bulb"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;

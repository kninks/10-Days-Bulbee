import "./OrderConfirmation.css";

function OrderConfirmation() {
  return (
    <div className="order-confirmed-section">
      <div className="confirm-pic">
        <img src="./green-check.svg" />
      </div>
      <div className="confirm-message-1">
        <h1>Your order<br/>has been placed</h1>
      </div>
    </div>
  );
}

export default OrderConfirmation;

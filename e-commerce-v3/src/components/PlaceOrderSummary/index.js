import { useDispatch } from "react-redux";
import { createdOrder } from "../../actions/orderActions";
import "./PlaceOrderSummary.css";
import Loading from "../Loading";
import Message from "../Message";

const PlaceOrderSummary = ({ cart, loading, error }) => {
  const dispacth = useDispatch();
  const handlePlaceOrder = () => {
    dispacth(createdOrder({ ...cart, orderItems: cart.cartItems }));
  };
  console.log("asdad", cart);
  return (
    <ul className="placeOrderSummary">
      <li>
        <h2>Order Summary</h2>
      </li>
      <li>
        <div className="placeOrderSummary__item">
          <div>Items</div>
          <div>${cart.itemsPrice.toFixed(2)}</div>
        </div>
      </li>
      <li>
        <div className="placeOrderSummary__item">
          <div>Shipping</div>
          <div>${cart.shippingPrice.toFixed(2)}</div>
        </div>
      </li>
      <li>
        <div className="placeOrderSummary__item">
          <div>Tax</div>
          <div>${cart.taxPrice.toFixed(2)}</div>
        </div>
      </li>
      <li>
        <div className="placeOrderSummary__item">
          <div>
            <strong>Order Total</strong>
          </div>
          <div>
            <strong>${cart.totalPrice.toFixed(2)}</strong>
          </div>
        </div>
      </li>
      <li>
        <div>
          <button
            className="placeOrderSummary__btn"
            type="submit"
            onClick={handlePlaceOrder}
            disabled={cart.cartItems.length === 0}
          >
            Place Order
          </button>
        </div>
        {loading && <Loading />}
        {error && <Message condition="danger">{error}</Message>}
      </li>
    </ul>
  );
};

export default PlaceOrderSummary;

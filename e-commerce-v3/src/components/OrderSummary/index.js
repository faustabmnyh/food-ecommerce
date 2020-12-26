import Loading from "../Loading";
import { PayPalButton } from "react-paypal-button-v2";
import "./OrderSummary.css";
import { useSelector } from "react-redux";
import Message from "../Message";

const OrderSummary = ({ order, sdkReady, handleSuccessPayment }) => {
  const orderPayment = useSelector((state) => state.orderPayment);
  const { error: errorPayment, loading: loadingPayment } = orderPayment;
  return (
    <ul className="orderSummary">
      <li>
        <h2>Order Summary</h2>
      </li>
      <li>
        <div className="orderSummary__item">
          <div>Items</div>
          <div>${order?.itemsPrice.toFixed(2)}</div>
        </div>
      </li>
      <li>
        <div className="orderSummary__item">
          <div>Shipping</div>
          <div>${order?.shippingPrice.toFixed(2)}</div>
        </div>
      </li>
      <li>
        <div className="orderSummary__item">
          <div>Tax</div>
          <div>${order?.taxPrice.toFixed(2)}</div>
        </div>
      </li>
      <li>
        <div className="orderSummary__item total-price">
          <div>
            <strong>Order Total</strong>
          </div>
          <div>
            <strong>${order?.totalPrice.toFixed(2)}</strong>
          </div>
        </div>
      </li>
      {!order.isPaid && (
        <li>
          {!sdkReady ? (
            <Loading />
          ) : (
            <>
              {loadingPayment && <Loading />}
              {errorPayment && (
                <Message condition="danger">{errorPayment}</Message>
              )}
              <PayPalButton
                amount={order.totalPrice}
                onSuccess={handleSuccessPayment}
              />
            </>
          )}
        </li>
      )}
    </ul>
  );
};

export default OrderSummary;

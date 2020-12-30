import Loading from "../Loading";
import { PayPalButton } from "react-paypal-button-v2";
import "./OrderSummary.css";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import {  paymentOrder } from "../../actions/orderActions";
import { useState } from "react";

const OrderSummary = ({
  order,
  sdkReady,
  handleSuccessPayment,
  handleDeliver,
  orderPayment,
  orderDeliver,
}) => {
  const { error: errorPayment, loading: loadingPayment } = orderPayment;
  const { loading: loadingDeliver, error: errorDeliver } = orderDeliver;
  const [errorStripe, setErrorStripe] = useState("");
  const [loadingStripe, setLoadingStripe] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { aboutUser } = userSignin;
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmitStripe = async (e) => {
    e.preventDefault();
    setLoadingStripe(true);
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: order.shippingAddress.fullName,
        phone: `+${order.shippingAddress.phoneNumber}`,
        email: aboutUser.email,
        address: {
          city: order.shippingAddress.city,
        },
      },
    });
    if (error) {
      setErrorStripe(error);
    } else {
      try {
        const { id } = paymentMethod;
        const { data } = await axios.post("/v1/config/stripe", {
          id,
          order,
        });
        dispatch(paymentOrder(order, data.payment));
        setLoadingStripe(false);
      } catch (err) {
        setErrorStripe(err.response.data.message);
        setLoadingStripe(false);
      }
    }
  };
  const handleChange = (e) => {
    setDisabled(e.empty);
    setErrorStripe(e.error ? e.error.message : "");
  };

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
      {order.paymentMethod === "Paypal" ? (
        !order.isPaid && (
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
        )
      ) : (
        <>
          {loadingStripe && <Loading />}
          {errorStripe && <Message condition="danger">{errorStripe}</Message>}
          {order?.paymentResult?.status !== "succeeded" && !order.isPaid ? (
            <form
              onSubmit={handleSubmitStripe}
              className="orderSummary__formStripe"
            >
              <CardElement
                onChange={handleChange}
                options={{
                  style: {
                    base: {
                      fontSize: "14px",
                      color: "#012a4a",
                      "::placeholder": {
                        color: "#012a4a",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
              <button
                className="orderSummary__btnStripe"
                disabled={disabled || loadingStripe}
              >
                Pay Now
              </button>
            </form>
          ) : null}
        </>
      )}
      {aboutUser.isAdmin && order.isPaid && !order.isDelivered && (
        <li>
          {loadingDeliver && <Loading />}
          {errorDeliver && <Message condition="danger">{errorDeliver}</Message>}
          <button
            type="button"
            className="orderSummary__btnStripe"
            onClick={handleDeliver}
          >
            Deliver Order
          </button>
        </li>
      )}
    </ul>
  );
};

export default OrderSummary;

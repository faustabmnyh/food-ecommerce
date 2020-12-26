import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import PlaceOrderSummary from "../../components/PlaceOrderSummary";
import Stepper from "../../components/Stepper";
import { CREATE_ORDER_RESET } from "../../constants/orderConstants";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, order, error } = orderCreate;
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    history.push("/paymentmethods");
  }
  const toPrice = (total) => Number(total.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(1) : toPrice(5);
  cart.taxPrice = toPrice(cart.itemsPrice * 0.2);
  cart.totalPrice = toPrice(
    cart.itemsPrice + cart.taxPrice + cart.shippingPrice
  );
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: CREATE_ORDER_RESET });
    }
  }, [success, history, order, dispatch]);
  return (
    <div>
      <Stepper stepOne stepTwo stepThree stepFour />
      <div className="placeOrder">
        <div className="placeOrder__left">
          <ul>
            <div className="placeOrder__container">
              <li>
                <div>
                  <h3>Shipping</h3>
                  <p>
                    <strong>Name : </strong> {cart.shippingAddress.fullName}{" "}
                    <br />
                    <strong>Phone Number : </strong>{" "}
                    {cart.shippingAddress.phoneNumber} <br />
                    <strong>Adddress : </strong> {cart.shippingAddress.address}{" "}
                    <br />
                    {cart.shippingAddress.city},{" "}
                    {cart.shippingAddress.postalCode},{" "}
                    {cart.shippingAddress.country}
                  </p>
                </div>
              </li>
            </div>
            <div className="placeOrder__container">
              <li>
                <div>
                  <h3>Payment Method</h3>
                  <p>
                    <strong>Method : </strong>
                    {cart.paymentMethod}
                  </p>
                </div>
              </li>
            </div>
            <li>
              <div className="placeOrder__container">
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((cartItem) => (
                    <li key={cartItem._id}>
                      <div className="placeOrder__card">
                        <div className="placeOrder__cardBook">
                          <img
                            src={cartItem.image}
                            alt={cartItem.name}
                            className="placeOrder__cardImg"
                          />
                          <div className="placeOrder__cardTitle">
                            <Link
                              className="placeOrder__titleText"
                              to={`/product/${cartItem._id}`}
                            >
                              {cartItem.name}
                            </Link>
                          </div>
                        </div>
                        <div>
                          ${cartItem.price} x {cartItem.qty} = $
                          {cartItem.qty * cartItem.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="placeOrder__right">
          <div className="placeOrder__container">
            <PlaceOrderSummary cart={cart} loading={loading} error={error}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

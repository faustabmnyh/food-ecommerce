import React, { useState } from "react";
import Stepper from "../../components/Stepper";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../actions/cartActions";
import "./Payment.css";
import { useHistory } from "react-router-dom";

const Payment = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;
  if (!shippingAddress) {
    history.push("/shipping");
  }
  console.log(shippingAddress);
  const handlePaymentMethod = (e) => {
    dispatch(savePaymentMethod(e.target.name));
    history.push("/placeorder");
  };
  return (
    <div className="payment">
      <Stepper stepOne stepTwo stepThree />
      <div>
        <h1 className="payment__header">Payment Methods</h1>
        <ul className="payment__container">
          <li>
            <div className="payment__card">
              <div className="payment__cardHeader">
                <div>
                  <h2>Paypal</h2>
                  <p>Use paypal payment</p>
                </div>
                <img src="/images/icons/card-paypal.svg" alt="" />
              </div>
              <div className="payment__cardFooter">
                <div>
                  <strong>
                    $
                    {cartItems
                      .reduce((a, c) => a + c.price * c.qty, 0)
                      .toFixed(2)}
                  </strong>
                </div>
                <div>
                  <button
                    name="Paypal"
                    className="payment__btn"
                    onClick={handlePaymentMethod}
                  >
                    Choose
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="payment__card">
              <div className="payment__cardHeader">
                <div>
                  <h2>Stripe</h2>
                  <p>Use Stripe payment</p>
                </div>
                <img src="/images/icons/card-stripe.svg" alt="" />
              </div>
              <div className="payment__cardFooter">
                <div>
                  <strong>
                    $
                    {cartItems
                      .reduce((a, c) => a + c.price * c.qty, 0)
                      .toFixed(2)}
                  </strong>
                </div>
                <div>
                  <button
                    name="Stripe"
                    className="payment__btn"
                    onClick={handlePaymentMethod}
                  >
                    Choose
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Payment;

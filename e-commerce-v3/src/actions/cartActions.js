import Axios from "axios";
import {
  ADD_PAYMENT_METHOD,
  ADD_SHIPPING_ADDRESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/v1/products/${productId}`);
  console.log("ad", productId);
  dispatch({ type: ADD_TO_CART, payload: { ...data, qty } });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (values) => (dispatch) => {
  dispatch({ type: ADD_SHIPPING_ADDRESS, payload: values });
  localStorage.setItem("shippingAddress", JSON.stringify(values));
};

export const savePaymentMethod = (payment) => (dispatch) => {
  dispatch({ type: ADD_PAYMENT_METHOD, payload: payment });
  localStorage.setItem("payment", payment);
};

import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DETAILS_ORDER_FAIL,
  DETAILS_ORDER_REQUEST,
  DETAILS_ORDER_SUCCESS,
  ORDER_HISTORY_FAIL,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";

export const createdOrder = (order) => async (dispatch, getState) => {
  console.log(order);
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const {
      userSignin: { aboutUser },
    } = getState();
    const { data } = await Axios.post("/v1/orders", order, {
      headers: { Authorization: `Bearer ${aboutUser.token}` },
    });
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
  } catch (err) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const detailOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: DETAILS_ORDER_REQUEST });
  try {
    const {
      userSignin: { aboutUser },
    } = getState();
    const { data } = await Axios.get(`/v1/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${aboutUser.token}` },
    });
    dispatch({ type: DETAILS_ORDER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: DETAILS_ORDER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const orderHistory = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_HISTORY_REQUEST });
  try {
    const {
      userSignin: { aboutUser },
    } = getState();
    const { data } = await Axios.get("/v1/orders/orderhistory", {
      headers: { Authorization: `Bearer ${aboutUser.token}` },
    });
    dispatch({ type: ORDER_HISTORY_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_HISTORY_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const paymentOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ORDER_PAY_REQUEST });
  try {
    const {
      userSignin: { aboutUser },
    } = getState();
    const { data } = await Axios.put(
      `/v1/orders/${order._id}/payment`,
      paymentResult,
      { headers: { Authorization: `Bearer ${aboutUser.token}` } }
    );
    console.log("this is data", data);
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

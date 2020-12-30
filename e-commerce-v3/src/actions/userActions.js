import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
} from "../constants/userConstants";
import Axios from "axios";

export const register = (values) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const { data } = await Axios.post("/v1/users/register", values);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("aboutUser", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const signin = (values) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await Axios.post("/v1/users/signin", values);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("aboutUser", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("aboutUser");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("payment");
  dispatch({
    type: USER_SIGNOUT,
  });
  document.location.href = "/signin";
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST });
  try {
    const {
      userSignin: { aboutUser },
    } = getState();
    const { data } = await Axios.get(`/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${aboutUser.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const {
      userSignin: { aboutUser },
    } = getState();
    const { data } = await Axios.put("/v1/users/profile", user, {
      headers: { Authorization: `Bearer ${aboutUser.token}` },
    });
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("aboutUser", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  try {
    const {
      userSignin: { aboutUser },
    } = getState();
    const { data } = await Axios.get("/v1/users", {
      headers: { Authorization: `Bearer ${aboutUser.token}` },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

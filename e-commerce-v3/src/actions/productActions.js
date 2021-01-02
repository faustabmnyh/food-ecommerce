import Axios from "axios";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_SHOP_REQUEST,
  PRODUCT_LIST_SHOP_SUCCESS,
  PRODUCT_LIST_SHOP_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
} from "../constants/productConstants";

export const listProducts = ({ seller = "" }) => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const { data } = await Axios.get(`/v1/products?seller=${seller}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listAllProducts = ({
  seller = "",
  name = "",
  category = "",
  order = "",
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_SHOP_REQUEST });
  try {
    const { data } = await Axios.get(
      `/v1/products/shop?seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
    );
    dispatch({ type: PRODUCT_LIST_SHOP_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_SHOP_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listProductCategories = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CATEGORY_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/v1/products/categories");
    console.log("ads", data);
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_CATEGORY_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST });
  try {
    const { data } = await Axios.get(`/v1/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  try {
    const {
      userSignin: { aboutUser },
    } = getState();
    const { data } = await Axios.post("/v1/products", product, {
      headers: { Authorization: `Bearer ${aboutUser.token}` },
    });
    console.log(data);
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product });
  } catch (err) {
    console.log("this is response", err.response);
    console.log("this is message", err.message);
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST });
  try {
    const {
      userSignin: { aboutUser },
    } = getState();
    const { data } = await Axios.put(`/v1/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${aboutUser.token}` },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deletedProduct = (productId) => (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST });
  try {
    const {
      userSignin: { aboutUser },
    } = getState();
    const { data } = Axios.delete(`/v1/products/${productId}`, {
      headers: { Authorization: `Bearer ${aboutUser.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createReview = (productId, review) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
  try {
    const {
      userSignin: { aboutUser },
    } = getState();
    const { data } = await Axios.post(
      `/v1/products/${productId}/reviews`,
      review,
      { headers: { Authorization: `Bearer ${aboutUser.token}` } }
    );
    dispatch({ type: PRODUCT_REVIEW_CREATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_REVIEW_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

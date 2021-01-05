import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_RESET,
  CREATE_ORDER_SUCCESS,
  DETAILS_ORDER_FAIL,
  DETAILS_ORDER_REQUEST,
  DETAILS_ORDER_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_RESET,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS,
  ORDER_HISTORY_FAIL,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";

export const orderCreatedReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case DETAILS_ORDER_REQUEST:
      return { loading: true };
    case DETAILS_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case DETAILS_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderHistoryReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_HISTORY_REQUEST:
      return { loading: true };
    case ORDER_HISTORY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_HISTORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true };
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderCreatedReducer,
  orderDetailReducer,
  orderHistoryReducer,
  orderPaymentReducer,
} from "./reducers/orderReducers";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import {
  userRegisterReducer,
  userSigininReducer,
} from "./reducers/userReducers";
const initialState = {
  userSignin: {
    aboutUser: localStorage.getItem("aboutUser")
      ? JSON.parse(localStorage.getItem("aboutUser"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: localStorage.getItem("payment")
      ? localStorage.getItem("payment")
      : "",
  },
};

const reducer = combineReducers({
  productLists: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigininReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreatedReducer,
  orderDetails: orderDetailReducer,
  orderHistoryList: orderHistoryReducer,
  orderPayment: orderPaymentReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

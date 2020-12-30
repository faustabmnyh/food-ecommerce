import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderCreatedReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailReducer,
  orderHistoryReducer,
  orderListReducer,
  orderPaymentReducer,
} from "./reducers/orderReducers";
import {
  productAllListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import {
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  updateUserProfileReducer,
  userListReducer,
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
  productAllLists: productAllListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreatedReducer,
  orderDetails: orderDetailReducer,
  orderHistoryList: orderHistoryReducer,
  orderPayment: orderPaymentReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: updateUserProfileReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

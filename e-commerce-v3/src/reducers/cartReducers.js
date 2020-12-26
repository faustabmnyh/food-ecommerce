import {
  ADD_PAYMENT_METHOD,
  ADD_SHIPPING_ADDRESS,
  ADD_TO_CART,
  CART_EMPTY,
  REMOVE_FROM_CART,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const existItems = state.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existItems) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem._id === existItems._id ? item : cartItem
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload
        ),
      };
    case ADD_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case ADD_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_EMPTY:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

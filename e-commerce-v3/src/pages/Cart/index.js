import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import Message from "../../components/Message";
import "./Cart.css";

const Cart = ({ location }) => {
  let { productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [productId, dispatch, qty]);
  const handleDelete = (id) => {
    console.log("asd", id);
    dispatch(removeFromCart(id));
    history.push("/cart");
  };
  const handleCheckout = () => {
    history.push("/signin?redirect=shipping");
  };
  return (
    <div className="cart">
      <div className="cart__content">
        <div className="cart__header">
          <h1>Shopping Cart</h1>
          <div>Price</div>
        </div>
        {cartItems.length === 0 ? (
          <Message>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </Message>
        ) : (
          cartItems.map((cartItem) => (
            <div key={cartItem._id} className="cart__container">
              <div>
                <img src={cartItem.image} alt={cartItem.name} />
              </div>
              <div className="cart__body">
                <div className="cart__headerBody">
                  <h3>
                    <Link to={`/product/${cartItem._id}`}>{cartItem.name}</Link>
                  </h3>
                  <strong>${cartItem.price}</strong>
                </div>
                <div>
                  {cartItem.stock_products > 0 ? (
                    <span className="success">In Stock</span>
                  ) : (
                    <span className="danger">Unavailable</span>
                  )}
                </div>
                <div className="cart__actions">
                  <select
                    value={cartItem.qty}
                    onChange={(e) =>
                      dispatch(addToCart(cartItem._id, Number(e.target.value)))
                    }
                  >
                    {[...Array(cartItem.stock_products).keys()].map(
                      (product) => (
                        <option key={product + 1} value={product + 1}>
                          {product + 1}
                        </option>
                      )
                    )}
                  </select>
                  <button onClick={() => handleDelete(cartItem._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart__subtotal">
        <h2>
          Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}) items : $
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h2>
        <div>
          <button disabled={cartItems.length === 0} onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

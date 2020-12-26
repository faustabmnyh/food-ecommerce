import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { orderHistory } from "../../actions/orderActions";
import { addToCart } from "../../actions/cartActions";
import "./OrderHistory.css";
import Loading from "../../components/Loading";
import Message from "../../components/Message";

const OrderHistory = () => {
  const orderHistoryList = useSelector((state) => state.orderHistoryList);
  const { loading, orders, error } = orderHistoryList;
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(orders);
  useEffect(() => {
    dispatch(orderHistory());
  }, [dispatch]);
  const handleBuyAgain = (products) => {
    console.log(products);
    products.map((product) => dispatch(addToCart(product._id, product.qty)));
  };
  return loading ? (
    <Loading />
  ) : error ? (
    <Message condition="danger">{error}</Message>
  ) : (
    <div className="orderHistory">
      <h1>Order History</h1>
      <div className="orderHistory__allContent">
        {orders.length === 0 ? (
          <Message>
            You haven't done place an order, <Link to="/">Go To Shop</Link>
          </Message>
        ) : (
          orders.map((order) => (
            <div className="orderHistory__content" key={order._id}>
              <div className="orderHistory__container">
                <div>
                  <ul className="orderHistory__header">
                    <li>
                      <p className="orderHistory__orderAt">
                        {order.createdAt.substring(0, 10)}
                      </p>
                    </li>
                    <li>
                      <Link to={`/order/${order._id}`}>
                        <h2>{order._id}</h2>
                      </Link>
                    </li>
                  </ul>
                </div>
                {order.orderItems.map((orderItem) => (
                  <div className="orderHistory__body" key={orderItem._id}>
                    <div>
                      <img src={orderItem.image} alt={orderItem.name} />
                    </div>
                    <div className="orderHistory__bodyContent">
                      <div>
                        <Link to={`/product/${orderItem._id}`}>
                          <h2>{orderItem.name}</h2>
                        </Link>
                        <div className="orderHistory__item">
                          {orderItem.qty} item
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="orderHistory__bodyBot">
                  <div className="orderHistory__price">
                    <div>
                      <h2>Details Order : </h2>
                      {/* <div className="orderHistory__paymentDetails"> */}
                      <div>
                        <p>Paid :</p>
                        {order.isPaid ? (
                          <Message condition="success">{order.paidAt}</Message>
                        ) : (
                          <Message condition="dangerHistory">
                            Waiting For Payment
                          </Message>
                        )}
                      </div>
                      <p>Delivered :</p>
                      <div>
                        {order.isDelivered ? (
                          <Message condition="success">{order.deliveredAt}</Message>
                        ) : (
                          <Message condition="dangerHistory">
                            Waiting For Delivered
                          </Message>
                        )}
                      </div>
                      {/* </div> */}
                    </div>
                    <div>
                      <p>Total Price :</p>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </div>
                  </div>
                  <div className="orderHistory__bodyBotBtn">
                    <div>
                      <button
                        onClick={() => history.push(`/order/${order._id}`)}
                      >
                        Go To Details Order
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleBuyAgain(order.orderItems)}
                        className="orderHistory__btnBuy"
                      >
                        Buy Again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

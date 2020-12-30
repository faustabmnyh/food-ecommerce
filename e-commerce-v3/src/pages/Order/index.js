import Axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  deliveredOrder,
  detailOrder,
  paymentOrder,
} from "../../actions/orderActions";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import OrderSummary from "../../components/OrderSummary";
import Stepper from "../../components/Stepper";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../../constants/orderConstants";
import "./Order.css";

const Order = () => {
  let { orderId } = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  const orderPayment = useSelector((state) => state.orderPayment);
  const { success: successPayment } = orderPayment;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver } = orderDeliver;

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data } = await Axios.get("/v1/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPayment ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPaypalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, successDeliver, successPayment, orderId]);
  const handleSuccessPayment = (paymentResult) => {
    dispatch(paymentOrder(order, paymentResult));
  };
  const handleDeliver = () => {
    dispatch(deliveredOrder(order._id));
  };
  return loading ? (
    <Loading />
  ) : error ? (
    <Message condition="danger">{error}</Message>
  ) : (
    <div>
      <Stepper stepOne stepTwo stepThree stepFour stepFive />
      <div className="order">
        <div className="order__left">
          <ul>
            <div className="order__container">
              <li>
                <div>
                  <h3>Shipping</h3>
                  <p>
                    <strong>Name : </strong> {order.shippingAddress.fullName}{" "}
                    <br />
                    <strong>Phone Number : </strong>{" "}
                    {order.shippingAddress.phoneNumber} <br />
                    <strong>Adddress : </strong> {order.shippingAddress.address}{" "}
                    <br />
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message condition="success">
                      Delivered at {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message condition="danger">Not Delivered</Message>
                  )}
                </div>
              </li>
            </div>
            <div className="order__container">
              <li>
                <div>
                  <h3>Payment Method</h3>
                  <p>
                    <strong>Method : </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message condition="success">
                      Paid at {order.paidAt}
                    </Message>
                  ) : (
                    <Message condition="danger">Waiting For Payment</Message>
                  )}
                </div>
              </li>
            </div>
            <li>
              <div className="order__container">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((orderItem) => (
                    <li key={orderItem._id}>
                      <div className="order__card">
                        <div className="order__cardBook">
                          <img
                            src={orderItem.image}
                            alt={orderItem.name}
                            className="order__cardImg"
                          />
                          <div className="order__cardTitle">
                            <Link
                              className="order__titleText"
                              to={`/product/${orderItem._id}`}
                            >
                              {orderItem.name}
                            </Link>
                          </div>
                        </div>
                        <div>
                          ${orderItem.price} x {orderItem.qty} = $
                          {orderItem.qty * orderItem.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="order__right">
          <div className="order__container">
            <OrderSummary
              order={order}
              sdkReady={sdkReady}
              handleSuccessPayment={handleSuccessPayment}
              handleDeliver={handleDeliver}
              orderDeliver={orderDeliver}
              orderPayment={orderPayment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;

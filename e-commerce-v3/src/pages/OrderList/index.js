import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, listOrders } from "../../actions/orderActions";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import "./OrderList.css";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ORDER_DELETE_RESET } from "../../constants/orderConstants";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    margin: "0px 10px ",
  },
}));

const OrderList = (props) => {
  const classes = useStyles();
  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { aboutUser } = userSignin;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: ORDER_DELETE_RESET });
    }
    dispatch(listOrders({ seller: sellerMode ? aboutUser._id : "" }));
  }, [dispatch, successDelete, sellerMode, aboutUser]);
  const handleClickOpen = (order) => {
    setOpen(true);
    setOrderId(order._id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    dispatch(deleteOrder(orderId));
    setOpen(false);
  };
  return (
    <div className="orderList">
      <h1>Orders</h1>
      {loadingDelete && <Loading />}
      {errorDelete && <Message condition="danger">{errorDelete}</Message>}
      {loading ? (
        <Loading />
      ) : error ? (
        <Message condition="danger">{error}</Message>
      ) : (
        <table className="orderList__table">
          <thead>
            <tr>
              <th>USER</th>
              <th>ORDER ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>DELIVERED</th>
              <th>PAID</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="orderList__tableUser">
                  <Avatar
                    className={classes.small}
                    src={order?.user?.photo_profile}
                  />
                  {order?.user?.username}
                </td>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isDelivered ? (
                    <p className="success-table">
                      {order.deliveredAt.substring(0, 10)}
                    </p>
                  ) : (
                    <p className="danger-table">No Delivered</p>
                  )}
                </td>
                <td>
                  {order.isPaid ? (
                    <p className="success-table">
                      {order.paidAt.substring(0, 10)}
                    </p>
                  ) : (
                    <p className="danger-table">Waiting For Payment</p>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => history.push(`/order/${order._id}`)}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => handleClickOpen(order)}
                  >
                    Delete
                  </button>
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Are you sure to delete this order ?
                    </DialogTitle>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        No
                      </Button>
                      <Button color="primary" onClick={handleDelete}>
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;

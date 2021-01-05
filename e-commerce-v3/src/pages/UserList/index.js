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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteUser, listUsers } from "../../actions/userActions";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import {
  USER_DELETE_RESET,
  USER_DETAILS_RESET,
} from "../../constants/userConstants";
import "./UserList.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    margin: "0px 10px ",
  },
}));

const UserList = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const userList = useSelector((state) => state.userList);
  const { loading, error, users, page, pages } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: USER_DELETE_RESET });
    }
    dispatch({ type: USER_DETAILS_RESET });
    dispatch(listUsers());
  }, [dispatch, successDelete]);
  const handleClickOpen = (user) => {
    setOpen(true);
    setUserId(user._id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    dispatch(deleteUser(userId));
    setOpen(false);
  };
  return (
    <div className="userList">
      <h1>Users</h1>
      {loadingDelete && <Loading />}
      {errorDelete && <Message condition="danger">{errorDelete}</Message>}
      {successDelete && (
        <Message condition="success">User Deleted Successfully</Message>
      )}
      {loading ? (
        <Loading />
      ) : error ? (
        <Message condition="danger">{error}</Message>
      ) : (
        <table className="userList__table">
          <thead>
            <tr>
              <th>USER</th>
              <th>ID</th>
              <th>EMAIL</th>
              <th>IS ADMIN</th>
              <th>IS SELLER</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="userList__user">
                    <Avatar
                      className={classes.small}
                      src={user.photo_profile}
                    />
                    {user.username}
                  </div>
                </td>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <p className="success-table">YES</p>
                  ) : (
                    <p className="danger-table">NO</p>
                  )}
                </td>
                <td>
                  {user.isSeller ? (
                    <p className="success-table">YES</p>
                  ) : (
                    <p className="danger-table">NO</p>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className="userList__btn"
                    onClick={() => history.push(`/user/${user._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="userList__btn"
                    onClick={() => handleClickOpen(user)}
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
                      Are you sure to delete this user ?
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
      {pages > 1 && (
        <div className="pagination">
          {page > 1 && (
            <button
              onClick={() => history.push(`/userslist/pageNumber/${page - 1}`)}
            >
              <ArrowBackIosIcon
                style={{ fontSize: "16px", marginRight: "5px" }}
              />
              PREV
            </button>
          )}
          {[...Array(pages).keys()].map((p) => (
            <Link
              className={p + 1 === page ? "active" : ""}
              key={p + 1}
              to={`/userslist/pageNumber/${p + 1}`}
            >
              {p + 1}
            </Link>
          ))}
          {pages > page && (
            <button
              onClick={() => history.push(`/userslist/pageNumber/${page + 1}`)}
            >
              NEXT
              <ArrowForwardIosIcon
                style={{ fontSize: "16px", marginLeft: "5px" }}
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;

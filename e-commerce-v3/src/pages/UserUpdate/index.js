import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { detailsUser, updateUser } from "../../actions/userActions";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { UPDATE_USER_ADMIN_RESET } from "../../constants/userConstants";
import "./UserUpdate.css";
import ErrorIcon from "@material-ui/icons/Error";

const UserUpdate = () => {
  let { userId } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdate;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_USER_ADMIN_RESET });
      history.push("/userslist");
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setUsername(user.username);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, userId, user, successUpdate, history]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, username, email, isAdmin, isSeller }));
  };
  return (
    <div className="userUpdate">
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Edit User {username}</h2>
          {loadingUpdate && <Loading />}
        </div>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message condition="danger">{error}</Message>
        ) : (
          <div className="userUpdate__container">
            <div>
              <label
                htmlFor="name"
                className={errorUpdate?.username && "auth__errorHead"}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name..."
                value={username}
                className={errorUpdate?.username && "auth__error"}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errorUpdate?.username && (
                <h5 className="dangerInput">
                  <ErrorIcon fontSize="small" style={{ marginRight: "5px" }} />
                  {errorUpdate?.username}
                </h5>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className={errorUpdate?.email && "auth__errorHead"}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email..."
                value={email}
                className={errorUpdate?.email && "auth__error"}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorUpdate?.email && (
                <h5 className="dangerInput">
                  <ErrorIcon fontSize="small" style={{ marginRight: "5px" }} />
                  {errorUpdate?.email}
                </h5>
              )}
            </div>
            <div className="userUpdate__checked">
              <label htmlFor="isSeller">Is Seller</label>
              <input
                type="checkbox"
                id="isSeller"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
              />
            </div>
            <div className="userUpdate__checked">
              <label htmlFor="isAdmin">Is Admin</label>
              <input
                type="checkbox"
                id="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>
            <div>
              <button className="userUpdate__btn" type="submit">
                Update
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserUpdate;

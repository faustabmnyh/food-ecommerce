import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import ErrorIcon from "@material-ui/icons/Error";
import "./Profile.css";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { aboutUser } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: UPDATE_USER_RESET });
      dispatch(detailsUser(aboutUser._id));
    } else {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user, dispatch, aboutUser._id]);
  console.log(user);
  const handleSumbit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        userId: user._id,
        username,
        password,
        email,
        confirmPassword,
      })
    );
  };
  console.log(errorUpdate);
  return (
    <div className="profile">
      <div>
        <img src="/images/pictures/avatar.png" alt="avatar" />
        <form className="profile__img">
          <input type="file" className="custom-file-input" />
        </form>
      </div>
      <div className="profile__right">
        <form onSubmit={handleSumbit}>
          <div>
            <h1>Update User Profile</h1>
          </div>
          {loading ? (
            <Loading />
          ) : error ? (
            <Message condition="danger">{error}</Message>
          ) : (
            <>
              {loadingUpdate && <Loading />}
              {successUpdate && (
                <Message condition="success">
                  Profile Updated Successfuly
                </Message>
              )}
              <div>
                <label
                  htmlFor="username"
                  className={errorUpdate?.username && "auth__errorHead"}
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  className={errorUpdate?.username && "auth__error"}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errorUpdate?.username && (
                  <h5 className="dangerInput">
                    <ErrorIcon
                      fontSize="small"
                      style={{ marginRight: "5px" }}
                    />
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
                  placeholder="Email"
                  value={email}
                  className={errorUpdate?.email && "auth__error"}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errorUpdate?.email && (
                  <h5 className="dangerInput">
                    <ErrorIcon
                      fontSize="small"
                      style={{ marginRight: "5px" }}
                    />
                    {errorUpdate?.email}
                  </h5>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={errorUpdate?.password && "auth__errorHead"}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className={errorUpdate?.password && "auth__error"}
                />
                {errorUpdate?.password && (
                  <h5 className="dangerInput">
                    <ErrorIcon
                      fontSize="small"
                      style={{ marginRight: "5px" }}
                    />{" "}
                    {errorUpdate?.password}
                  </h5>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className={errorUpdate?.confirmPassword && "auth__errorHead"}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={errorUpdate?.confirmPassword && "auth__error"}
                />
                {errorUpdate?.confirmPassword && (
                  <h5 className="dangerInput">
                    <ErrorIcon
                      fontSize="small"
                      style={{ marginRight: "5px" }}
                    />
                    {errorUpdate?.confirmPassword}
                  </h5>
                )}
              </div>
              <div>
                <button className="profile__btn">Update</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import ErrorIcon from "@material-ui/icons/Error";
import "./Profile.css";
import Axios from "axios";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("/images/pictures/avatar.png");
  const [sellerName, setSellerName] = useState("");
  const [sellerLogo, setSellerLogo] = useState("/images/pictures/avatar.png");
  const [sellerDescription, setSellerDescription] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
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
      if (user.photo_profile) {
        setImage(user.photo_profile);
      }
      if (user.seller) {
        setSellerName(user.seller.name);
        if (user.seller.logo) {
          setSellerLogo(user.seller.logo);
        }
        setSellerDescription(user.seller.description);
      }
    }
  }, [user, dispatch, aboutUser._id]);
  const handleSumbit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        userId: user._id,
        username,
        password,
        email,
        confirmPassword,
        image,
        sellerName,
        sellerLogo,
        sellerDescription,
      })
    );
  };
  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    console.log(bodyFormData);
    try {
      const { data } = await Axios.post("/v1/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${aboutUser.token}`,
        },
      });
      setLoadingUpload(true);
      setImage(data);
      setLoadingUpload(false);
    } catch (err) {
      setLoadingUpload(true);
      setErrorUpload(err.message);
      setLoadingUpload(false);
    }
  };
  const handleChangeLogo = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    console.log(bodyFormData);
    try {
      const { data } = await Axios.post("/v1/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${aboutUser.token}`,
        },
      });
      setLoadingUpload(true);
      setSellerLogo(data);
      setLoadingUpload(false);
    } catch (err) {
      setLoadingUpload(true);
      setErrorUpload(err.message);
      setLoadingUpload(false);
    }
  };
  return (
    <div className="profile">
      {loadingUpdate && <Loading />}
      {successUpdate && (
        <Message condition="success">Profile Updated Successfuly</Message>
      )}
      <div>
        <h1>Update User Profile</h1>
      </div>
      <form onSubmit={handleSumbit} className="profile__container">
        <div className="profile__user">
          <div>
            <img src={image} alt="avatar" />
            <div className="profile__img">
              <input
                type="file"
                className="custom-file-input"
                accept="image/*"
                onChange={handleChangeImage}
              />
              {loadingUpload && <Loading />}
              {errorUpload && (
                <Message condition="danger">{errorUpload}</Message>
              )}
            </div>
          </div>
          <div className="profile__right">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message condition="danger">{error}</Message>
            ) : (
              <>
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
                    className={
                      errorUpdate?.confirmPassword && "auth__errorHead"
                    }
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
              </>
            )}
          </div>
        </div>
        {user?.isSeller && (
          <div>
            <h1>Seller Profile</h1>
            <div className="profile__sellerProfile">
              <div>
                <img
                  src={sellerLogo}
                  alt="name"
                  className="productCreate__inputImg"
                />
                <div className="profile__img">
                  <input
                    id="sellerLogo"
                    type="file"
                    className="custom-file-input"
                    accept="image/*"
                    onChange={handleChangeLogo}
                  />
                  {loadingUpload && <Loading />}
                  {errorUpload && (
                    <Message condition="danger">{errorUpload}</Message>
                  )}
                </div>
              </div>
              <div className="profile__sellerRight">
                <div>
                  <label htmlFor="sellerName">Seller Name</label>
                  <input
                    id="sellerName"
                    type="text"
                    placeholder="Enter Seller Name"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="sellerDescription">Seller Description</label>
                  <input
                    id="sellerDescription"
                    type="text"
                    placeholder="Enter Seller Description"
                    value={sellerDescription}
                    onChange={(e) => setSellerDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div>
          <button className="profile__btn">Update</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

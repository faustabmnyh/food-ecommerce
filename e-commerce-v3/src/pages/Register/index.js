import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorIcon from "@material-ui/icons/Error";

const Register = ({ location }) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;
  const userSignin = useSelector((state) => state.userSignin);
  const { aboutUser: aboutUserSignin } = userSignin;
  console.log(userRegister);
  const handleChange = (props) => (e) => {
    setValues({ ...values, [props]: e.target.value });
  };
  console.log(redirect);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(values));
  };
  useEffect(() => {
    if (aboutUserSignin) {
      history.push(redirect);
    }
  }, [history, redirect, aboutUserSignin]);
  return (
    <div className="register">
      <img
        src="/images/products/signin-background.png"
        alt="foods"
        className="register__image"
      />
      <div className="register__right">
        <Link to="/">
          <img
            src="/images/logo/mgFOOD.svg"
            alt="logo"
            className="register__logo"
          />
        </Link>
        <div className="register__container">
          <h1 className="regsiter__header">Create New Account</h1>
          <form onSubmit={handleSubmit}>
            {loading && <Loading />}
            <h5 className={error?.username && "auth__errorHead"}>Username</h5>
            <input
              type="text"
              placeholder="Username"
              onChange={handleChange("username")}
              className={error?.username && "auth__error"}
            />
            {error?.username && (
              <h5 className="dangerInput">
                <ErrorIcon fontSize="small" style={{ marginRight: "5px" }} />{" "}
                {error?.username}
              </h5>
            )}
            <h5 className={error?.email && "auth__errorHead"}>Email</h5>
            <input
              type="email"
              placeholder="Email"
              onChange={handleChange("email")}
              className={error?.email && "auth__error"}
            />
            {error?.email && (
              <h5 className="dangerInput">
                <ErrorIcon fontSize="small" style={{ marginRight: "5px" }} />{" "}
                {error?.email}
              </h5>
            )}
            <h5 className={error?.password && "auth__errorHead"}>Password</h5>
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange("password")}
              className={error?.password && "auth__error"}
            />
            {error?.password && (
              <h5 className="dangerInput">
                <ErrorIcon fontSize="small" style={{ marginRight: "5px" }} />{" "}
                {error?.password}
              </h5>
            )}
            <h5 className={error?.confirmPassword && "auth__errorHead"}>
              Confirm Password
            </h5>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange("confirmPassword")}
              className={error?.confirmPassword && "auth__error"}
            />
            {error?.confirmPassword && (
              <h5 className="dangerInput">
                <ErrorIcon fontSize="small" style={{ marginRight: "5px" }} />{" "}
                {error?.confirmPassword}
              </h5>
            )}
            <button type="submit">Sign Up</button>
          </form>

          <p className="register__btnSignin">
            Already have an account ?{" "}
            <Link
              className="register__signinLink"
              to={`/signin?redirect=${redirect}`}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

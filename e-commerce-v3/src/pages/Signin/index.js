import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Signin.css";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorIcon from "@material-ui/icons/Error";

const Signin = ({ location }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, error, aboutUser } = userSignin;
  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(values));
  };
  console.log(error);
  useEffect(() => {
    if (aboutUser) {
      history.push(redirect);
    }
  }, [history, aboutUser, redirect]);
  return (
    <div className="signin">
      <div className="siginin__left">
        <Link to="/">
          <img
            src="/images/logo/mgFOOD.svg"
            alt="logo"
            className="signin__logo"
          />
        </Link>
        <div className="siginin__container">
          <h1 className="signin__header">Sign In</h1>
          <form onSubmit={handleSubmit}>
            {loading && <Loading />}
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

            <button type="submit" className="singin__btnLogin">
              Sign In
            </button>

            <p className="signin__btnRegister">
              Don't have an account ?{" "}
              <Link
                className="signin__signinLink"
                to={`/register?redirect=${redirect}`}
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
      <img
        src="/images/products/signin-background.png"
        alt="foods"
        className="siginin__image"
      />
    </div>
  );
};

export default Signin;

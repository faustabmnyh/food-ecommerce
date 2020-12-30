import "./Header.css";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import { signout } from "../../actions/userActions";
import { Avatar, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const Header = () => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { aboutUser } = userSignin;
  const handleSignout = () => {
    dispatch(signout());
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setShow(true);
      } else {
        setShow(false);
      }
      return () => {
        window.removeEventListener("scroll");
      };
    });
  }, []);
  return (
    <header className={show && "show"}>
      <div className="header">
        <div className="header__left">
          <ul className="header__items">
            <li>
              <Link to="/">
                <img src="/images/logo/mgFOOD.svg" alt="" />
              </Link>
            </li>
            <li className="header__links">
              <Link>Healthy Food</Link>
            </li>
            <li className="header__links">
              <Link>Dessert</Link>
            </li>
            <li className="header__links">
              <Link>Pizza</Link>
            </li>
            <li className="header__links">
              <Link>Salad</Link>
            </li>
            <li className="header__links">
              <Link>Shop</Link>
            </li>
          </ul>
        </div>
        <div className="header__right">
          <ul className="header__items">
            <li className="header__cart">
              <form className="header__cartInput">
                <label htmlFor="search" className="header__searchBtn">
                  <SearchIcon />
                </label>
                <input id="search" type="text" placeholder="Search..." />
              </form>
              <div className="header__cartBtnContainer">
                <div
                  className={
                    cartItems.length === 0 ? "hide" : "header__cartNumber"
                  }
                >
                  {cartItems.length}
                </div>
                <div className="header__cartBtn">
                  <Link to="/cart">
                    <LocalGroceryStoreIcon fontSize="small" />
                  </Link>
                </div>
              </div>
            </li>
            <li>
              {!aboutUser ? (
                <Link to="/signin">
                  <button className="header__btn">Sign In</button>
                </Link>
              ) : (
                <div className="header__userProfileDropdown">
                  <div className="header__userProfile">
                    <Avatar className={classes.small} />
                    <p>{aboutUser.username}</p>
                  </div>
                  <ul
                    className={
                      aboutUser && aboutUser.isAdmin
                        ? "header__dropdownContent admin"
                        : "header__dropdownContent"
                    }
                  >
                    <div>
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                        <Link to="/orderhistory">Order History</Link>
                      </li>
                      <li>
                        <Link to="/signin" onClick={handleSignout}>
                          Sign Out
                        </Link>
                      </li>
                    </div>
                    {aboutUser && aboutUser.isAdmin && (
                      <div>
                        <li>
                          <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                          <Link to="/productlists">Products</Link>
                        </li>
                        <li>
                          <Link to="/orderlist">Orders</Link>
                        </li>
                        <li>
                          <Link to="/userslist">Users</Link>
                        </li>
                      </div>
                    )}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

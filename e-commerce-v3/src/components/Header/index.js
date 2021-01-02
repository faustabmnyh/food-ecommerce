import "./Header.css";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import { Link, useHistory } from "react-router-dom";
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
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
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
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/name/${name}`);
  };

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
              <Link>Best Sellers</Link>
            </li>
            <li className="header__links">
              <Link>Hot Offers</Link>
            </li>
            <li className="header__links">
              <Link to="/shop">Shop</Link>
            </li>
          </ul>
        </div>
        <div className="header__right">
          <ul className="header__items">
            <li className="header__cart">
              <form className="header__cartInput" onSubmit={handleSubmit}>
                <label htmlFor="search" className="header__searchBtn">
                  <SearchIcon />
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                    <Avatar
                      className={classes.small}
                      src={aboutUser.photo_profile}
                    />
                    <p>{aboutUser.username}</p>
                  </div>
                  <ul
                    className={
                      aboutUser && aboutUser.isAdmin && aboutUser.isSeller
                        ? "header__dropdownContent admin-seller"
                        : aboutUser && (aboutUser.isAdmin || aboutUser.isSeller)
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
                          <Link to="/dashboard">
                            Dashboard <small>(admin)</small>
                          </Link>
                        </li>
                        <li>
                          <Link to="/productlists">
                            Products <small>(admin)</small>
                          </Link>
                        </li>
                        <li>
                          <Link to="/orderlist">
                            Orders <small>(admin)</small>
                          </Link>
                        </li>
                        <li>
                          <Link to="/userslist">
                            Users <small>(admin)</small>
                          </Link>
                        </li>
                      </div>
                    )}
                    {aboutUser && aboutUser.isSeller && (
                      <div>
                        <li>
                          <Link to="/productlists/seller">
                            Products <small>(seller)</small>
                          </Link>
                        </li>
                        <li>
                          <Link to="/orderlist/seller">
                            Orders <small>(seller)</small>
                          </Link>
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

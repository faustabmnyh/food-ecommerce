import "./Header.css";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import { signout } from "../../actions/userActions";
import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";

const Header = () => {
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
  }, []);
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
                <div className="header__profileDetails">
                  <div className="header__cartBtnContainer responsive">
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
                  <div className="header__userProfileDropdown">
                    <div className="header__userProfileMobile">
                      <Avatar
                        className="header__photo"
                        src={aboutUser.photo_profile}
                      />
                    </div>
                    <div className="header__userProfile">
                      <Avatar
                        className="header__photo"
                        src={aboutUser.photo_profile}
                      />
                      <p>{aboutUser.username}</p>
                    </div>
                    <ul
                      className={
                        aboutUser && aboutUser.isAdmin && aboutUser.isSeller
                          ? "header__dropdownContent admin-seller"
                          : aboutUser &&
                            (aboutUser.isAdmin || aboutUser.isSeller)
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
                        {aboutUser && aboutUser.isSeller && (
                          <>
                            <li className="header__responsive">
                              <Link to="/productlists/seller">
                                Products <small>(seller)</small>
                              </Link>
                            </li>
                            <li className="header__responsive">
                              <Link to="/orderlist/seller">
                                Orders <small>(seller)</small>
                              </Link>
                            </li>
                          </>
                        )}
                        <li className="header__linksShop">
                          <Link to="/shop">Shop</Link>
                        </li>
                        <li>
                          <Link to="/signin" onClick={handleSignout}>
                            Sign Out
                          </Link>
                        </li>
                        <form
                          className="header__cartInput responsive"
                          onSubmit={handleSubmit}
                        >
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
                          <li className="header__navSeller">
                            <Link to="/productlists/seller">
                              Products <small>(seller)</small>
                            </Link>
                          </li>
                          <li className="header__navSeller">
                            <Link to="/orderlist/seller">
                              Orders <small>(seller)</small>
                            </Link>
                          </li>
                        </div>
                      )}
                    </ul>
                  </div>
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

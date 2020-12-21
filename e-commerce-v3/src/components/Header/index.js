import "./Header.css";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

const Header = () => {
  return (
    <header>
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
                <div className="header__searchBtn">
                  <SearchIcon />
                </div>
                <input type="text" placeholder="Search..." />
              </form>
              <div className="header__cartBtn">
                <LocalGroceryStoreIcon fontSize="small" />
              </div>
            </li>
            <li>
              <button className="header__btn">Sign In</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

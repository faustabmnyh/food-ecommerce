import "./Jumbotron.css";
import StorefrontIcon from "@material-ui/icons/Storefront";
import { useHistory } from "react-router-dom";

const Jumbotron = () => {
  const history = useHistory();
  return (
    <div className="jumbotron">
      <div>
        <div>
          <h1>
            Let's Pamper Your <br />
            Stomach
          </h1>
        </div>
        <div className="jumbotron__body">
          <p className="jumbotron__bodySubTitle">Tasty, fast, and affordable</p>
          <p className="jumbotron__bodyText">
            You can buy all the food you want in here, if you buy it here we
            will serve this food with great pleasure and make you satisfied, we
            provided healthy food, fast food, etc
          </p>
        </div>
        <div className="jumbotron__btnContainer">
          <a href="#buynow">
            <button className="jumbotron__btn">Buy Now</button>
          </a>
          <button
            className="jumbotron__btn last"
            onClick={() => history.push("/shop")}
          >
            Go To Shop <StorefrontIcon style={{ marginLeft: "0.5rem" }} />
          </button>
        </div>
      </div>
      <img src="/images/products/main-picture.png" alt="food" className="jumbotron__imageMain"/>
      <img src="/images/products/main-picture-2.png" alt="food" className="jumbotron__image"/>
    </div>
  );
};

export default Jumbotron;

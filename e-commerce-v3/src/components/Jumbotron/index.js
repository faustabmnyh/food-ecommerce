import "./Jumbotron.css";
import StorefrontIcon from "@material-ui/icons/Storefront";

const Jumbotron = () => {
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
          <button className="jumbotron__btn">Buy Now</button>
          <button className="jumbotron__btn last">
            Go To Shop <StorefrontIcon style={{ marginLeft: "0.5rem" }} />
          </button>
        </div>
      </div>
      <img src="/images/products/main-picture.png" alt="food" />
    </div>
  );
};

export default Jumbotron;

import { Link } from "react-router-dom";
import "./Stepper.css";

const Stepper = ({ stepOne, stepTwo, stepThree, stepFour, stepFive }) => {
  return (
    <div className="stepper">
      <div>
        <div className="stepper__content">
          <div
            className={stepOne ? "stepper__rounded active" : "stepper__rounded"}
          >
            1
          </div>
          <div
            className={stepTwo ? "stepper__line active" : "stepper__line"}
          ></div>
        </div>
        <div className="stepper__textOne">Sign In</div>
      </div>
      <Link to="/shipping">
        <div>
          <div className="stepper__content">
            <div
              className={
                stepTwo ? "stepper__rounded active" : "stepper__rounded"
              }
            >
              2
            </div>
            <div
              className={stepThree ? "stepper__line active" : "stepper__line"}
            ></div>
          </div>
          <div className="stepper__textTwo">Shipping</div>
        </div>
      </Link>
      <Link to="/paymentmethods">
        <div>
          <div className="stepper__content">
            <div
              className={
                stepThree ? "stepper__rounded active" : "stepper__rounded"
              }
            >
              3
            </div>
            <div
              className={stepFour ? "stepper__line active" : "stepper__line"}
            ></div>
          </div>
          <div className="stepper__textThree">Payment</div>
        </div>
      </Link>
      <Link to="/placeorder">
        <div>
          <div className="stepper__content">
            <div
              className={
                stepFour ? "stepper__rounded active" : "stepper__rounded"
              }
            >
              4
            </div>
            <div
              className={stepFive ? "stepper__line active" : "stepper__line"}
            ></div>
          </div>
          <div className="stepper__textFour">Place Order</div>
        </div>
      </Link>
      <div>
        <div
          className={stepFive ? "stepper__rounded active" : "stepper__rounded"}
        >
          5
        </div>
        <div className="stepper__textFive">Success Order</div>
      </div>
    </div>
  );
};

export default Stepper;

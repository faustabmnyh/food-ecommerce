import { useState } from "react";
import Stepper from "../../components/Stepper";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Shipping.css";
import { saveShippingAddress } from "../../actions/cartActions";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [values, setValues] = useState({
    fullName: shippingAddress.fullName,
    phoneNumber: shippingAddress.phoneNumber,
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  });
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);
  const dispatch = useDispatch();
  const history = useHistory();
  const userSignin = useSelector((state) => state.userSignin);
  const { aboutUser } = userSignin;
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;
  if (!aboutUser) {
    history.push("/signin");
  }
  const handleChange = (props) => (e) => {
    setValues({ ...values, [props]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (!newLat || !newLng) {
      moveOn = window.confirm(
        "You did not set your location on map. Continue?"
      );
    }
    if (moveOn) {
      dispatch(saveShippingAddress(values));
    }
    history.push("/paymentmethods");
  };

  const chooseOnMap = () => {
    dispatch(saveShippingAddress({ ...values, lat, lng }));
    history.push("/map");
  };
  return (
    <div className="shipping">
      <Stepper stepOne stepTwo />
      <div className="shipping__container">
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Shipping Address</h1>
          </div>
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              value={values.fullName}
              onChange={handleChange("fullName")}
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="number"
              id="phoneNumber"
              className="no-arrow"
              placeholder="Phone Number"
              value={values.phoneNumber}
              onChange={handleChange("phoneNumber")}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              value={values.address}
              onChange={handleChange("address")}
              required
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              placeholder="City"
              value={values.city}
              onChange={handleChange("city")}
              required
            />
          </div>
          <div>
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              placeholder="Postal Code"
              value={values.postalCode}
              onChange={handleChange("postalCode")}
              required
            />
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              placeholder="Country"
              value={values.country}
              onChange={handleChange("country")}
              required
            />
          </div>
          <div>
            <label htmlFor="chooseOnMap">Location</label>
            <button
              type="button"
              onClick={chooseOnMap}
              className="shipping_btnMap"
            >
              Choose On Map
            </button>
          </div>
          <div>
            <button className="shipping__btn">Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;

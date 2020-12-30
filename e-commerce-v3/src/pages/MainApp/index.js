import React from "react";
import { Route } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Home from "../Home";
import Cart from "../Cart";
import ProductDetails from "../ProductDetails";
import Shipping from "../Shipping";
import Payment from "../Payment";
import PlaceOrder from "../PlaceOrder";
import Order from "../Order";
import OrderHistory from "../OrderHistory";
import UserRoute from "../UserRoute";
import Profile from "../Profile";
import AdminRoute from "../AdminRoute";
import ProductList from "../ProductList";
import ProductCreate from "../ProductCreate";
import ProductEdit from "../ProductEdit";
import OrderList from "../OrderList";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51HQog0E0XWms1zj7wB84LUGtu3SgDcN24mcCVEYNDnYrI0cgk6UEhzhAllq9FzQp8vyhafXIHjzYqVE17KcKUtBD00TvnOJfxm"
);

const MainApp = () => {
  return (
    <div className="grid__container">
      <Header />
      <Elements stripe={stripePromise}>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:productId" component={ProductDetails} />
          <Route exact path="/cart/:productId?" component={Cart} />
          <Route exact path="/shipping" component={Shipping} />
          <Route exact path="/paymentmethods" component={Payment} />
          <Route exact path="/placeorder" component={PlaceOrder} />
          <Route exact path="/order/:orderId" component={Order} />
          <UserRoute exact path="/orderhistory" component={OrderHistory} />
          <UserRoute exact path="/profile" component={Profile} />
          <AdminRoute exact path="/productlists" component={ProductList} />
          <AdminRoute exact path="/productcreate" component={ProductCreate} />
          <AdminRoute
            exact
            path="/product/:productId/edit"
            component={ProductEdit}
          />
          <AdminRoute exact path="/orderlist" component={OrderList} />
        </main>
      </Elements>
      <Footer />
    </div>
  );
};

export default MainApp;

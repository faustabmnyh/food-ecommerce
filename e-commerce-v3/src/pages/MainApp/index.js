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

const MainApp = () => {
  return (
    <div className="grid__container">
      <Header />
      <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:productId" component={ProductDetails} />
        <Route exact path="/cart/:productId?" component={Cart} />
        <Route exact path="/shipping" component={Shipping} />
        <Route exact path="/paymentmethods" component={Payment} />
        <Route exact path="/placeorder" component={PlaceOrder} />
        <Route exact path="/order/:orderId" component={Order} />
        <UserRoute exact path="/orderhistory" component={OrderHistory} />
        <UserRoute exact path="/profile" component={OrderHistory} />
      </main>
      <Footer />
    </div>
  );
};

export default MainApp;

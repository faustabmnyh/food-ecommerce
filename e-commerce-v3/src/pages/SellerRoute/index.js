import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const SellerRoute = ({ component: Component, ...restProps }) => {
  const { aboutUser } = useSelector((state) => state.userSignin);
  return (
    <Route
      {...restProps}
      render={(props) =>
        aboutUser && aboutUser.isSeller ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="signin" />
        )
      }
    ></Route>
  );
};

export default SellerRoute;

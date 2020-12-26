import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const UserRoute = ({ component: Component, ...restProps }) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { aboutUser } = userSignin;
  return (
    <Route
      {...restProps}
      render={(props) =>
        aboutUser ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default UserRoute;

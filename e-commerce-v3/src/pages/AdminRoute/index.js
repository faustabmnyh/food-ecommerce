import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AdminRoute = ({ component: Component, ...restProps }) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { aboutUser } = userSignin;
  return (
    <Route
      {...restProps}
      render={(props) =>
        aboutUser && aboutUser.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default AdminRoute;

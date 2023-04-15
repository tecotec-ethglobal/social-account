import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRouteWrapper() {
  const { isLoggedIn } = useContext(AppContext);

  console.log(isLoggedIn());

  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRouteWrapper;

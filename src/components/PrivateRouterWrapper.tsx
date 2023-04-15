import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRouteWrapper() {
  const { isLoggedIn } = useContext(AppContext);

  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRouteWrapper;

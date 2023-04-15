import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { AppContext } from "./AppContext";
import Header from "./Header";

const styles = {
  loggedInLayout: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    minHeight: "100svh",
  },

  mainSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

function LoggedInLayout() {
  const { isLoggedIn } = useContext(AppContext);

  return isLoggedIn() ? (
    <div style={styles.loggedInLayout}>
      <Header />
      <section style={styles.mainSection}>
        <Outlet />
      </section>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default LoggedInLayout;

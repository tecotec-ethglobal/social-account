import { Outlet } from "react-router-dom";
import Header from "./Header";

const styles = {
  loggedOutLayout: {
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

function LoggedOutLayout() {
  return (
    <div style={styles.loggedOutLayout}>
      <Header />
      <section style={styles.mainSection}>
        <Outlet />
      </section>
    </div>
  );
}

export default LoggedOutLayout;

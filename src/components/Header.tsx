import {
  AddIcon,
  LogOutIcon,
  Menu,
  MenuIcon,
  Popover,
  Position,
  SwapHorizontalIcon,
} from "evergreen-ui";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";

const styles = {
  header: {
    display: "flex",
    justifyContent: "center",
    padding: "2em",
    position: "relative" as "relative",
  },
  headerIcon: {
    width: "140px",
  },
  headerText: {
    fontSize: "1.8rem",
    fontWeight: "500",
  },
  menuIcon: {
    position: "absolute" as "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    right: "2em",
  },
};

function Header() {
  const navigate = useNavigate();
  const { safeAuthKit, setSigner, setEthAdapter, setContractAddress, setSafeAuthKit, isLoggedIn } =
    useContext(AppContext);

  const changeAccount = () => {
    navigate("/action");
  };
  const addAccount = () => {
    navigate("/create");
  };
  const signout = async () => {
    await safeAuthKit.signOut();

    // clear state
    setSigner(undefined);
    setEthAdapter(undefined);
    setContractAddress(undefined);
    setSafeAuthKit(undefined);

    navigate("/");
  };

  // TODO: create form
  return (
    <header style={styles.header}>
      <span style={styles.headerText}>Smart Account</span>
      {isLoggedIn() ? (
        <Popover
          position={Position.TOP_RIGHT}
          content={
            <Menu>
              <Menu.Item icon={SwapHorizontalIcon} onClick={changeAccount}>
                Change Account
              </Menu.Item>
              <Menu.Item icon={AddIcon} onClick={addAccount}>
                Add Account
              </Menu.Item>
              <Menu.Item icon={LogOutIcon} onClick={signout}>
                Signout
              </Menu.Item>
            </Menu>
          }
        >
          <MenuIcon style={styles.menuIcon}></MenuIcon>
        </Popover>
      ) : null}
    </header>
  );
}

export default Header;

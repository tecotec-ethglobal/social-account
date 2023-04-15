import {
  AddIcon,
  LogOutIcon,
  Menu,
  MenuIcon,
  Popover,
  Position,
  SwapHorizontalIcon,
} from "evergreen-ui";
import React from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  header: {
    height: "80px",
    display: "flex",
  },
  headerIcon: {
    width: "140px",
  },
  headerText: {
    fontSize: "1.8rem",
    fontWeight: "500",
    height: "80px",
    lineHeight: "80px",
    width: "100%",
  },
  menuIcon: {
    width: "100px",
    margin: "auto 0 auto auto",
  },
};

function Header() {
  // TODO: create form
  return (
    <header style={styles.header}>
      <span style={styles.headerText}>Smart Account</span>
      <Popover
        position={Position.TOP_RIGHT}
        content={
          <Menu>
            <Menu.Item icon={SwapHorizontalIcon}>Change Account</Menu.Item>
            <Menu.Item icon={AddIcon}>Add Account</Menu.Item>
            <Menu.Item icon={LogOutIcon}>Signout</Menu.Item>
          </Menu>
        }
      >
        <MenuIcon style={styles.menuIcon}></MenuIcon>
      </Popover>
    </header>
  );
}

export default Header;

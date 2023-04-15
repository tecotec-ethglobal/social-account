import React, { useContext } from "react";
import { Dialog, IconButton, SelectIcon, Pane } from "evergreen-ui";
import { useNavigate } from "react-router-dom";

import { AppContext } from "./AppContext";
import Address from "./Address";

const styles = {
  pane: {
    color: "black",
  },
};

type AccountSelectionDialogProp = {
  isOpen: boolean;
  closeDialog: () => void;
};

function AccountSelectionDialog({ isOpen = false, closeDialog }: AccountSelectionDialogProp) {
  const { safeAuthKit } = useContext(AppContext);

  if (!isOpen) return null;

  return (
    <Dialog
      isShown={isOpen}
      title="Select your account"
      onCloseComplete={closeDialog}
      hasClose={true}
      hasCancel={false}
      confirmLabel="Cancel"
    >
      <Pane style={styles.pane}>
        {safeAuthKit.safeAuthData.safes.map((address: string) => (
          <Account address={address} key={address} closeDialog={closeDialog} />
        ))}
      </Pane>
    </Dialog>
  );
}

type AccountProp = {
  address: string;
  closeDialog: () => void;
};

const style = {
  display: "flex",
  justifyContent: "space-between",
};

function Account({ address, closeDialog }: AccountProp) {
  const navigate = useNavigate();
  const { setContractAddress } = useContext(AppContext);

  const selectAccount = () => {
    setContractAddress(address);
    closeDialog();
    navigate(`/safe-account/${address}`);
  };

  return (
    <div className="account" style={style}>
      <Address address={address} />
      <IconButton icon={SelectIcon} onClick={selectAccount} />
    </div>
  );
}

export default AccountSelectionDialog;

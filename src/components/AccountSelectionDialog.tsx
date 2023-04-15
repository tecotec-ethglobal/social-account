import React, { useContext } from "react";
import { Dialog, Pane } from "evergreen-ui";
import { useNavigate } from "react-router-dom";

import { AppContext } from "./AppContext";

const styles = {
  color: "black",
};

type AccountSelectionDialogProp = {
  isOpen: boolean;
  closeDialog: () => void;
};

function AccountSelectionDialog({ isOpen = false, closeDialog }: AccountSelectionDialogProp) {
  const { safeAuthKit } = useContext(AppContext);

  if (!isOpen) return null;

  // TODO: make it a real dialog
  return (
    <Dialog
      isShown={isOpen}
      title="Select your account"
      onCloseComplete={closeDialog}
      hasClose={true}
      hasCancel={false}
    >
      <Pane style={styles}>
        {safeAuthKit.safeAuthData.safes.map((address: string) => (
          <Account address={address} key={address} />
        ))}
      </Pane>
    </Dialog>
  );
}

type AccountProp = {
  address: string;
};

function Account({ address }: AccountProp) {
  const navigate = useNavigate();
  const { setContractAddress } = useContext(AppContext);

  const selectAccount = () => {
    setContractAddress(address);
    navigate(`/safe-account/${address}`);
  };

  return (
    <div className="account" onClick={selectAccount}>
      {address}
    </div>
  );
}

export default AccountSelectionDialog;

import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import Safe from "@safe-global/protocol-kit";

type AccountSelectionDialogProp = {
  isOpen: boolean;
  closeDialog: () => void;
};

function AccountSelectionDialog({ isOpen = false, closeDialog }: AccountSelectionDialogProp) {
  const { safeAuthKit } = useContext(AppContext);

  if (!isOpen) return null;

  // TODO: make it a real dialog
  return (
    <div className="dialog">
      <h4>select your account:</h4>

      {safeAuthKit.safeAuthData.safes.map((address: string) => (
        <Account address={address} key={address} />
      ))}

      <button onClick={closeDialog}>Close</button>
    </div>
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

import React from "react";

type AccountSelectionDialogProp = {
  isOpen: boolean;
};

function AccountSelectionDialog({ isOpen = false }: AccountSelectionDialogProp) {
  if (!isOpen) return null;

  // TODO: show list of accounts from safeAuthData
  // TODO: make it a real dialog
  return <div className="dialog">Select!</div>;
}

export default AccountSelectionDialog;

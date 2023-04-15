import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AccountSelectionDialog from "./AccountSelectionDialog";

function AccountAction() {
  const navigate = useNavigate();
  const [eoaAddress, setEoaAddress] = useState("0x123123123"); // TODO: change this to use safeAuthData
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleSelectAccountDialog = () => {
    setIsDialogOpen((old) => !old);
  };
  const createAccount = () => {
    navigate("/create");
  };

  return (
    <main>
      <h1>Your Address: {eoaAddress}</h1>

      <button onClick={toggleSelectAccountDialog}>Select Account</button>
      <button onClick={createAccount}>Create Account</button>

      <AccountSelectionDialog isOpen={isDialogOpen} />
    </main>
  );
}

export default AccountAction;

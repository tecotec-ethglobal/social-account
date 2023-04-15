import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import AccountSelectionDialog from "./AccountSelectionDialog";
import { AppContext } from "./AppContext";
import Address from "./Address";

function AccountAction() {
  const navigate = useNavigate();
  const { safeAuthKit } = useContext(AppContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleSelectAccountDialog = () => {
    setIsDialogOpen((old) => !old);
  };
  const createAccount = () => {
    navigate("/create");
  };

  return (
    <main>
      <h1>
        Your Address: <Address address={safeAuthKit.safeAuthData.eoa} />
      </h1>

      <button onClick={toggleSelectAccountDialog}>Select Account</button>
      <button onClick={createAccount}>Create Account</button>

      <AccountSelectionDialog isOpen={isDialogOpen} closeDialog={toggleSelectAccountDialog} />
    </main>
  );
}

export default AccountAction;

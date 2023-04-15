import React, { useContext, useState } from "react";
import Safe, { SafeFactory } from "@safe-global/protocol-kit";
import { useNavigate } from "react-router-dom";

import { AppContext } from "./AppContext";
import OwnerList from "./OwnerList";

function AccountCreation() {
  const navigate = useNavigate();
  const { ethAdapter, safeAuthKit, setContractAddress } = useContext(AppContext);
  const [owners, setOwners] = useState([safeAuthKit.safeAuthData?.eoa]);

  const deployContract = async () => {
    const safeFactory = await SafeFactory.create({ ethAdapter });
    const safeSdk: Safe = await safeFactory.deploySafe({
      safeAccountConfig: {
        threshold: 1,
        owners,
      },
    }); //5
    const address = safeSdk.getAddress();
    setContractAddress(address);
    navigate(`/safe-account/${address}`);
  };

  return (
    <main>
      <h1>Create your account</h1>

      <OwnerList owners={owners} updateOwners={setOwners} />

      <button onClick={deployContract}>Deploy Contract</button>
    </main>
  );
}

export default AccountCreation;

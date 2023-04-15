import React, { useContext, useState } from "react";
import Safe, { SafeFactory } from "@safe-global/protocol-kit";
import { useNavigate } from "react-router-dom";

import { AppContext } from "./AppContext";
import OwnerList from "./OwnerList";
import { Button, Dialog, Overlay, Spinner } from "evergreen-ui";

const styles = {
  display: "flex",
  flexDirection: "column" as "column",
  gap: "2em",
  alignItems: "center",
};

function AccountCreation() {
  const navigate = useNavigate();
  const { ethAdapter, safeAuthKit, setContractAddress } = useContext(AppContext);
  const [owners, setOwners] = useState([safeAuthKit.safeAuthData?.eoa]);
  const [isShown, setIsShown] = React.useState(false);
  const [showSpinner, setShowSpinner] = React.useState(false);

  const deployContract = async () => {
    setShowSpinner(true);

    const safeFactory = await SafeFactory.create({ ethAdapter });
    const safeSdk: Safe = await safeFactory.deploySafe({
      safeAccountConfig: {
        threshold: 1,
        owners,
      },
    }); //5
    const address = safeSdk.getAddress();
    setContractAddress(address);

    setShowSpinner(false);
    setIsShown(false);

    navigate(`/safe-account/${address}`);
  };

  return (
    <main style={styles}>
      <h1>Create your account</h1>

      <OwnerList
        owners={owners}
        selfAddress={safeAuthKit.safeAuthData?.eoa}
        setOwners={setOwners}
      />

      <Button onClick={() => setIsShown(true)}>Deploy Contract</Button>
      <Dialog
        width={"380px"}
        isShown={isShown}
        title="Confirmation"
        onConfirm={deployContract}
        onCloseComplete={() => setIsShown(false)}
        confirmLabel="Execute"
      >
        <p>Deploy contract.</p>
        {showSpinner && (
          <Overlay isShown={showSpinner}>
            <Spinner marginX="auto" marginY={150} />
          </Overlay>
        )}
      </Dialog>
    </main>
  );
}

export default AccountCreation;

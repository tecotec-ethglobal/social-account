import React, { useContext, useEffect, useState } from "react";
import Safe, { SafeFactory } from "@safe-global/protocol-kit";
import { useNavigate, useParams } from "react-router-dom";

import { AppContext } from "./AppContext";
import OwnerList from "./OwnerList";
import { Button, Dialog, Overlay, Spinner } from "evergreen-ui";

const styles = {
  display: "flex",
  flexDirection: "column" as "column",
  gap: "2em",
  alignItems: "center",
};

function OwnersEdit() {
  const navigate = useNavigate();
  const { safeAddress } = useParams();
  const { ethAdapter, safeAuthKit, setContractAddress } = useContext(AppContext);
  const [initialOwners, setInitialOwners] = useState<string[]>([]);
  const [owners, setOwners] = useState<string[]>([]);
  const [safeSdk, setSafeSdk] = useState<Safe>();
  const [isShown, setIsShown] = React.useState(false);
  const [showSpinner, setShowSpinner] = React.useState(false);

  useEffect(() => {
    (async () => {
      const safeSdk = await Safe.create({ ethAdapter, safeAddress: safeAddress! });
      setSafeSdk(safeSdk);
      const _owners = await safeSdk.getOwners();

      setInitialOwners(_owners);
      setOwners(_owners);
    })();
  }, []);

  const updateOwners = async () => {
    setShowSpinner(true);

    const deletedOwners = initialOwners.filter((o) => !owners.includes(o));
    for (let owner of deletedOwners) {
      const safeTransaction = await safeSdk!.createRemoveOwnerTx({
        ownerAddress: owner,
        threshold: 1,
      });
      await safeSdk!.executeTransaction(safeTransaction);
    }

    const addedOwners = owners.filter((o) => !initialOwners.includes(o));

    for (let owner of addedOwners) {
      const safeTransaction = await safeSdk!.createAddOwnerTx({
        ownerAddress: owner,
        threshold: 1,
      });
      await safeSdk!.executeTransaction(safeTransaction);
    }

    setShowSpinner(false);
    setIsShown(false);
  };

  return (
    <main style={styles}>
      <h1>Owner Update</h1>

      <OwnerList
        owners={owners}
        selfAddress={safeAuthKit.safeAuthData?.eoa}
        setOwners={setOwners}
      />

      <Button onClick={() => setIsShown(true)}>Update</Button>
      <Dialog
        width={"380px"}
        isShown={isShown}
        title="Confirmation"
        onConfirm={updateOwners}
        onCloseComplete={() => setIsShown(false)}
        confirmLabel="Execute"
      >
        <p>Update the owners.</p>
        {showSpinner && (
          <Overlay isShown={showSpinner}>
            <Spinner marginX="auto" marginY={150} />
          </Overlay>
        )}
      </Dialog>
    </main>
  );
}

export default OwnersEdit;

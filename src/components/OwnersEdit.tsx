import React, { useContext, useEffect, useState } from "react";
import Safe, { SafeFactory } from "@safe-global/protocol-kit";
import { useNavigate, useParams } from "react-router-dom";

import { AppContext } from "./AppContext";
import OwnerList from "./OwnerList";

function OwnersEdit() {
  const navigate = useNavigate();
  const { safeAddress } = useParams();
  const { ethAdapter, safeAuthKit, setContractAddress } = useContext(AppContext);
  const [initialOwners, setInitialOwners] = useState<string[]>([]);
  const [owners, setOwners] = useState<string[]>([]);
  const [safeSdk, setSafeSdk] = useState<Safe>();

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

    navigate(`/safe-account/${safeAddress}`);
  };

  return (
    <main>
      <h1>Owners</h1>

      <OwnerList
        owners={owners}
        selfAddress={safeAuthKit.safeAuthData?.eoa}
        setOwners={setOwners}
      />

      <button onClick={updateOwners}>Update Owners</button>
    </main>
  );
}

export default OwnersEdit;

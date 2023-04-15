import React, { useContext, useEffect, useState } from "react";

import Safe from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import { SafeTransactionDataPartial, TransactionResult } from "@safe-global/safe-core-sdk-types";
import { useParams } from "react-router-dom";
import { AppContext } from "./AppContext";
import { Button, Dialog, Overlay, Pane, Spinner, TextInputField } from "evergreen-ui";

const styles = {
  outer: {
    minWidth: "380px",
  },
  form: {
    padding: "30px 10px",
    textAlign: "left",
  },
};

function Transfer() {
  const { safeAddress } = useParams();
  const [balance, setBalance] = useState("0");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const { ethAdapter } = useContext(AppContext);
  const [safeSdk, setSafeSdk] = useState<Safe>();
  const [isShown, setIsShown] = React.useState(false);
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [safeTransactionData, setSafeTransactionData] =
    React.useState<SafeTransactionDataPartial>();

  useEffect(() => {
    (async () => {
      const safeSdk = await Safe.create({
        ethAdapter,
        safeAddress: safeAddress!,
      });
      setSafeSdk(safeSdk);
      setBalance(ethers.utils.formatEther(await safeSdk.getBalance()));
    })();
  }, []);

  function confirm() {
    const _safeTransactionData: SafeTransactionDataPartial = {
      to: to,
      data: "0x",
      value: ethers.utils.parseUnits(amount, "ether").toString(),
    };
    setSafeTransactionData(_safeTransactionData);
    setIsShown(true);
  }

  async function submit() {
    setShowSpinner(true);
    const safeTransaction = await safeSdk!.createTransaction({
      safeTransactionData: safeTransactionData!,
    });
    const result: TransactionResult = await safeSdk!.executeTransaction(safeTransaction);
    setShowSpinner(false);
    setIsShown(false);
  }

  return (
    <main style={styles.outer}>
      <h1>Transfer</h1>
      <span>Balance: {balance} GoerliETH</span>

      <div style={styles.form}>
        <TextInputField
          label="To:"
          description="recipient address"
          placeholder="0x0xC3db37e621...4e66BF24b4d75"
          onChange={(e) => setTo(e.target.value)}
        />

        <TextInputField
          label="Amount:"
          description="Unit: ether"
          placeholder="0.05"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <Button onClick={confirm} size="large">
        Confirm
      </Button>
      <Dialog
        width={"380px"}
        isShown={isShown}
        title="Confirmation"
        onConfirm={submit}
        onCloseComplete={() => setIsShown(false)}
        confirmLabel="Execute"
      >
        <p>
          To:
          <br />
          {safeTransactionData?.to}
        </p>
        <p>
          Amount: <br />
          {safeTransactionData?.value && ethers.utils.formatEther(safeTransactionData?.value!)}{" "}
          GoerliETH
        </p>
        {showSpinner && (
          <Overlay isShown={showSpinner}>
            <Spinner marginX="auto" marginY={220} />
          </Overlay>
        )}
      </Dialog>
    </main>
  );
}

export default Transfer;

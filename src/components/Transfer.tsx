import React, { Component, useContext, useEffect, useState } from "react";

import { SafeAuthKit, SafeAuthSignInData, Web3AuthAdapter } from "@safe-global/auth-kit";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import Safe, { AddOwnerTxParams, EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import { SafeTransactionDataPartial, TransactionResult } from "@safe-global/safe-core-sdk-types";
import SafeApiKit, {
  EthereumTxWithTransfersResponse,
  SafeModuleTransactionWithTransfersResponse,
  SafeMultisigTransactionWithTransfersResponse,
} from "@safe-global/api-kit";
import { useLocation, useParams } from "react-router-dom";
import { AppContext } from "./AppContext";

function Transfer() {
  const { safeAddress } = useParams();
  const [balance, setBalance] = useState("0");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const { ethAdapter } = useContext(AppContext);
  const [safeSdk, setSafeSdk] = useState<Safe>();

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

  async function submit() {
    const safeTransactionData: SafeTransactionDataPartial = {
      to: to,
      data: "0x",
      value: ethers.utils.parseUnits(amount, "ether").toString(),
    };
    console.log(safeTransactionData);
    const safeTransaction = await safeSdk!.createTransaction({ safeTransactionData });
    const result: TransactionResult = await safeSdk!.executeTransaction(safeTransaction);
    console.log(result);
  }

  return (
    <div className="safeAccount">
      <div>Transfer</div>
      <div>{balance} GoerliETH</div>

      <label htmlFor="">To:</label>
      <input type="text" onChange={(e) => setTo(e.target.value)} />

      <label htmlFor="">Amount:</label>
      <input type="text" onChange={(e) => setAmount(e.target.value)} />

      <button onClick={submit}>Confirm</button>
    </div>
  );
}

export default Transfer;

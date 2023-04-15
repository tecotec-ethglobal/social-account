import React, { Component, useContext, useEffect, useState } from "react";

import { SafeAuthKit, SafeAuthSignInData, Web3AuthAdapter } from "@safe-global/auth-kit";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import Safe, { AddOwnerTxParams, EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import SafeApiKit, {
  EthereumTxWithTransfersResponse,
  SafeModuleTransactionWithTransfersResponse,
  SafeMultisigTransactionWithTransfersResponse,
} from "@safe-global/api-kit";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "./AppContext";
import Address from "./Address";

function SafeAccount() {
  const { safeAddress } = useParams();
  const [balance, setBalance] = useState("0");
  const [transactions, setTransactions] = useState<
    (
      | SafeModuleTransactionWithTransfersResponse
      | SafeMultisigTransactionWithTransfersResponse
      | EthereumTxWithTransfersResponse
    )[]
  >([]);

  const { ethAdapter } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const safeSdk = await Safe.create({
        ethAdapter,
        safeAddress: safeAddress!,
      });

      const safeService = new SafeApiKit({
        txServiceUrl: "https://safe-transaction-goerli.safe.global/",
        ethAdapter: ethAdapter,
      });

      setBalance(ethers.utils.formatEther(await safeSdk.getBalance()));

      const transactions = await safeService.getAllTransactions(safeAddress!, { executed: true });
      setTransactions(transactions.results);

      console.log(transactions);
    })();
  }, []);

  return (
    <div className="safeAccount">
      <div>
        <Address address={safeAddress!} />
      </div>
      <div>{balance} GoerliETH</div>
      <button onClick={() => navigate(`/transfer/${safeAddress}`)}>Transfer</button>
      <button>Owners</button>
      <ul>
        {transactions.map((t) => {
          if (t.txType === "ETHEREUM_TRANSACTION") {
            if (t.to === safeAddress) {
              return (
                <li key={t.txHash}>
                  Receive {t.executionDate} from: <Address address={t.from} /> +{" "}
                  {ethers.utils.formatEther(t.transfers[0].value)}
                </li>
              );
            } else {
              return (
                <li key={t.txHash}>
                  Send {t.executionDate} to: <Address address={t.to} /> -{" "}
                  {ethers.utils.formatEther(t.transfers[0].value)}
                </li>
              );
            }
          } else if (t.txType === "MULTISIG_TRANSACTION") {
            if (t.to === safeAddress) {
              return (
                <li key={t.safeTxHash}>
                  Receive {t.executionDate} from: <Address address={t.executor} /> +{" "}
                  {ethers.utils.formatEther(t.value)}
                </li>
              );
            } else {
              return (
                <li key={t.safeTxHash}>
                  Send {t.executionDate} to: <Address address={t.to} /> -{" "}
                  {ethers.utils.formatEther(t.value)}
                </li>
              );
            }
          }
        })}
      </ul>
    </div>
  );
}

export default SafeAccount;

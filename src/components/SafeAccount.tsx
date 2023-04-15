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
import { ArrowRightIcon, Table, UserIcon } from "evergreen-ui";

const styles = {
  address: {
    fontSize: "1.2rem",
  },
  balance: {
    padding: "20px 0",
  },
  buttonGroup: {
    padding: "10px 0 30px",
    display: "flex",
    justifyContent: "center",
  },
  buttonIcon: {
    padding: "0 18px",
    cursor: "pointer",
  },
};

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
    <main>
      <h1>Account</h1>
      <div style={styles.address}>
        <Address address={safeAddress!} />
      </div>
      <div style={styles.balance}>Balance: {balance} GoerliETH</div>
      <div style={styles.buttonGroup}>
        <div style={styles.buttonIcon} onClick={() => navigate(`/transfer/${safeAddress}`)}>
          <ArrowRightIcon size={40} />
          <div>Transfer</div>
        </div>
        <div style={styles.buttonIcon} onClick={() => navigate(`/owners/${safeAddress}`)}>
          <UserIcon size={40} />
          <div>Owners</div>
        </div>
      </div>
      <Table minWidth={"350px"}>
        <Table.VirtualBody minHeight={400}>
          {transactions.map((t) => {
            let txHash;
            let kind;
            let direction;
            let address;
            let amount;
            let date = t.executionDate;
            if (t.txType === "ETHEREUM_TRANSACTION") {
              txHash = t.txHash;
              let _amount = ethers.utils.formatEther(t.transfers[0].value);
              if (t.to === safeAddress) {
                kind = "Receive";
                direction = "from";
                address = t.from;
                amount = `+ ${_amount}`;
              } else {
                kind = "Send";
                direction = "to";
                address = t.to;
                amount = `- ${_amount}`;
              }
            } else if (t.txType === "MULTISIG_TRANSACTION") {
              txHash = t.safeTxHash;
              let _amount = ethers.utils.formatEther(t.value);
              if (t.data != null) {
                kind = "Contract method";
                amount = 0;
                if (t.to === safeAddress) {
                  direction = "from";
                  address = t.executor;
                } else {
                  direction = "to";
                  address = t.to;
                }
              } else if (t.to === safeAddress) {
                kind = "Receive";
                direction = "from";
                address = t.executor;
                amount = `+ ${_amount}`;
              } else {
                kind = "Send";
                direction = "to";
                address = t.to;
                amount = `- ${_amount}`;
              }
            }
            return (
              <Table.Row key={txHash}>
                <Table.TextCell maxWidth={130}>
                  <b>{kind}</b>
                  <br />
                  {new Date(date).toDateString()}
                </Table.TextCell>
                <Table.TextCell>
                  {direction}: <Address address={address} />
                </Table.TextCell>
                <Table.TextCell maxWidth={100}>{amount}</Table.TextCell>
              </Table.Row>
            );
          })}
        </Table.VirtualBody>
      </Table>
      {/* <ul>
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
      </ul> */}
    </main>
  );
}

export default SafeAccount;

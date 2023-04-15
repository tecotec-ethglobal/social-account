import React, { Component, useEffect, useState } from "react";

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
import { useLocation, useParams } from "react-router-dom";

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
  const [safeAuthData, setSafeAuthData] = useState<SafeAuthSignInData | null>(null);

  useEffect(() => {
    (async () => {
      const options: Web3AuthOptions = {
        clientId:
          "BM0Bh_56N1efD3O7Mqw0fg2hOSI3zhS-nv_5xsILiJP7BvoiJ7Rs96JOCc1paXlYd_1AIhFviTduLs4edDGKS0E",
        web3AuthNetwork: "testnet",
        chainConfig: {
          chainNamespace: "eip155",
          chainId: "0x5",
        },
      };

      // https://web3auth.io/docs/sdk/web/modal/initialize#configuring-adapters
      const modalConfig = {};
      // https://web3auth.io/docs/sdk/web/modal/whitelabel#whitelabeling-while-modal-initialization
      const openloginAdapter = new OpenloginAdapter({
        adapterSettings: {
          uxMode: "popup",
          whiteLabel: {
            name: "Your app Name",
            logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
            logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
            defaultLanguage: "en",
            dark: true, // whether to enable dark mode. defaultValue: false
          },
        },
      });

      // Create an instance of the Web3AuthAdapter
      const web3AuthAdapter = new Web3AuthAdapter(options, [openloginAdapter], modalConfig);

      const safeAuthKit = await SafeAuthKit.init(web3AuthAdapter, {
        txServiceUrl: "https://safe-transaction-goerli.safe.global/",
      });

      await safeAuthKit.signIn();

      setSafeAuthData(safeAuthKit.safeAuthData ?? null);

      const provider = new ethers.providers.Web3Provider(safeAuthKit.getProvider()!);
      const signer = provider.getSigner(0);

      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
      }); //3

      const safeSdk = await Safe.create({
        ethAdapter,
        safeAddress: "0x41BbB5D7C8DA27d9e6D6Bde542b91c81E7169610",
      });

      const safeService = new SafeApiKit({
        txServiceUrl: "https://safe-transaction-goerli.safe.global/",
        ethAdapter: ethAdapter,
      });

      setBalance(ethers.utils.formatEther(await safeSdk.getBalance()));

      const transactions = await safeService.getAllTransactions(safeAddress!, { executed: true });
      transactions.results;
      console.log(transactions.results);
      setTransactions(transactions.results);
    })();
  }, []);

  return (
    <div className="safeAccount">
      <div>{safeAddress}</div>
      <div>{balance} GoerliETH</div>
      <button>Transfer</button>
      <button>Owners</button>
      <ul>
        {transactions.map((t) => {
          if (t.txType === "ETHEREUM_TRANSACTION") {
            if (t.to === safeAddress) {
              return (
                <li>
                  Receive {t.executionDate} from: {t.from} +{" "}
                  {ethers.utils.formatEther(t.transfers[0].value)}
                </li>
              );
            } else {
              return (
                <li>
                  Send {t.executionDate} to: {t.to} -{" "}
                  {ethers.utils.formatEther(t.transfers[0].value)}
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

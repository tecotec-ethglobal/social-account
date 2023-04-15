import React, { Component } from "react";

import { SafeAuthKit, Web3AuthAdapter } from "@safe-global/auth-kit";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import Safe, { AddOwnerTxParams, EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import SafeApiKit from "@safe-global/api-kit";

class Home extends Component {
  async componentDidMount(): Promise<void> {
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

    // Create an instance of the SafeAuthKit using the adapter and the SafeAuthConfig allowed options
    const safeAuthKit = await SafeAuthKit.init(web3AuthAdapter, {
      txServiceUrl: "https://safe-transaction-goerli.safe.global/",
    });

    console.log(safeAuthKit);

    await safeAuthKit.signIn();

    console.log(safeAuthKit);

    const provider = new ethers.providers.Web3Provider(safeAuthKit.getProvider()!);
    const signer = provider.getSigner(0);

    console.log(safeAuthKit.safeAuthData);

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    }); //3

    const safeFactory = await SafeFactory.create({ ethAdapter }); //4

    // Comment out when you want to deploy safe account
    // const safeSdk: Safe = await safeFactory.deploySafe({
    //   safeAccountConfig: {
    //     threshold: 1,
    //     owners: [safeAuthKit.safeAuthData?.eoa!, "0xf5937Cba8b51Fae14771308BAd6cFD664fF3F1C4"],
    //   },
    // }); //5
    // console.log(safeSdk.getAddress());

    const safeSdk2 = await Safe.create({
      ethAdapter,
      safeAddress: "0x41BbB5D7C8DA27d9e6D6Bde542b91c81E7169610",
    });

    console.log(safeSdk2.getAddress());
    console.log(await safeSdk2.getOwners());

    const params: AddOwnerTxParams = {
      ownerAddress: "0x2c359FEdFEBb6327Ea995B4672dA539Ed809BC2d",
    };
    const safeTransaction = await safeSdk2.createAddOwnerTx(params);

    console.log(await safeSdk2.isValidTransaction(safeTransaction));
    // const txResponse = await safeSdk2.executeTransaction(safeTransaction);
    // const wa = await txResponse.transactionResponse?.wait();
    // console.log(wa);

    const safeService = new SafeApiKit({
      txServiceUrl: "https://safe-transaction-goerli.safe.global/",
      ethAdapter: ethAdapter,
    });
    const safeTxHash = await safeSdk2.getTransactionHash(safeTransaction);

    const senderSignature = await safeSdk2.signTransactionHash(safeTxHash);

    const c = await safeService.proposeTransaction({
      safeAddress: "0x41BbB5D7C8DA27d9e6D6Bde542b91c81E7169610",
      safeTransactionData: safeTransaction.data,
      safeTxHash: await safeSdk2.getTransactionHash(safeTransaction),
      senderAddress: await signer.getAddress(),
      senderSignature: senderSignature.data,
    });

    console.log(c);
    console.log(
      (await safeService.getPendingTransactions("0x41BbB5D7C8DA27d9e6D6Bde542b91c81E7169610"))
        .results
    );

    // const amount = ethers.utils.parseUnits("0.0001", "ether").toString();

    // const safeTransactionData: SafeTransactionDataPartial = {
    //   to: "0xAFDFa8182191BeEE24Ee3B54Cd7c6C04DA5E1055",
    //   data: "0x",
    //   value: amount,
    // };

    // console.log(await safeSdk2.getBalance());

    // const safeTransaction = await safeSdk2.createTransaction({ safeTransactionData });

    // console.log(safeTransaction);
  }

  render() {
    return (
      <div className="Home">
        <div>Home</div>
      </div>
    );
  }
}

export default Home;

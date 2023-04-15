import React, { Component } from "react";

import { SafeAuthKit, Web3AuthAdapter } from "@safe-global/auth-kit";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";
import { ethers } from "ethers";

class Home extends Component {
  async componentDidMount(): Promise<void> {
    const options: Web3AuthOptions = {
      clientId:
        "BM0Bh_56N1efD3O7Mqw0fg2hOSI3zhS-nv_5xsILiJP7BvoiJ7Rs96JOCc1paXlYd_1AIhFviTduLs4edDGKS0E",
      web3AuthNetwork: "testnet",
      chainConfig: {
        chainNamespace: "eip155",
        chainId: "0x13881",
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
    const safeAuthKit = await SafeAuthKit.init(web3AuthAdapter);

    await safeAuthKit.signIn();

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
    //     owners: [safeAuthKit.safeAuthData?.eoa!],
    //   },
    // }); //5
    // console.log(safeSdk.getAddress());
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

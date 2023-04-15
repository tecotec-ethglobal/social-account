import React, { Component } from "react";
import "./App.css";

import { SafeAuthKit, Web3AuthAdapter } from "@safe-global/auth-kit";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";

class App extends Component {
  async componentDidMount(): Promise<void> {
    const options: Web3AuthOptions = {
      clientId:
        "BM0Bh_56N1efD3O7Mqw0fg2hOSI3zhS-nv_5xsILiJP7BvoiJ7Rs96JOCc1paXlYd_1AIhFviTduLs4edDGKS0E",
      web3AuthNetwork: "testnet",
      chainConfig: {
        chainNamespace: "eip155",
        chainId: "0xAA36A7",
      },
    };

    // https://web3auth.io/docs/sdk/web/modal/initialize#configuring-adapters
    const modalConfig = {};
    // https://web3auth.io/docs/sdk/web/modal/whitelabel#whitelabeling-while-modal-initialization
    const openloginAdapter = new OpenloginAdapter({
      adapterSettings: {
        clientId:
          "BM0Bh_56N1efD3O7Mqw0fg2hOSI3zhS-nv_5xsILiJP7BvoiJ7Rs96JOCc1paXlYd_1AIhFviTduLs4edDGKS0E",
        network: "testnet", // Optional - Provide only if you haven't provided it in the Web3Auth Instantiation Code
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

    safeAuthKit.getProvider();

    console.log(safeAuthKit.getProvider());
  }

  render() {
    return (
      <div className="App">
        <div>ssss</div>
      </div>
    );
  }
}

export default App;

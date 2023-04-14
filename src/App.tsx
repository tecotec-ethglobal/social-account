import React, { Component } from "react";
import "./App.css";

import { SafeAuthKit, Web3AuthAdapter } from "@safe-global/auth-kit";
import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

class App extends Component {
    async componentDidMount(): Promise<void> {
        const options: Web3AuthOptions = {
            clientId:
                "BM0Bh_56N1efD3O7Mqw0fg2hOSI3zhS-nv_5xsILiJP7BvoiJ7Rs96JOCc1paXlYd_1AIhFviTduLs4edDGKS0E",
            web3AuthNetwork: "testnet",
            chainConfig: {
                chainNamespace: "eip155",
                chainId: "11155111",
            },
        };

        // https://web3auth.io/docs/sdk/web/modal/initialize#configuring-adapters
        const modalConfig = {};
        // https://web3auth.io/docs/sdk/web/modal/whitelabel#whitelabeling-while-modal-initialization
        const openloginAdapter = new OpenloginAdapter({
            adapterSettings: {
                uxMode: "popup",
            },
        });

        // Create an instance of the Web3AuthAdapter
        const web3AuthAdapter = new Web3AuthAdapter(
            options,
            [openloginAdapter],
            modalConfig
        );

        console.log(web3AuthAdapter);
        console.log(web3AuthAdapter);

        // Create an instance of the SafeAuthKit using the adapter and the SafeAuthConfig allowed options
        const safeAuthKit = await SafeAuthKit.init(web3AuthAdapter, {});

        await safeAuthKit.signIn();
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

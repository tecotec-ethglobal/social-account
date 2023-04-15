import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter, OpenloginAdapterOptions } from "@web3auth/openlogin-adapter";

const web3AuthOptions: Web3AuthOptions = {
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
const openLoginAdapterOptions: OpenloginAdapterOptions = {
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
};

export { web3AuthOptions, modalConfig, openLoginAdapterOptions };

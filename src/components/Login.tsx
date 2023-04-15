import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { SafeAuthKit, Web3AuthAdapter } from "@safe-global/auth-kit";
import { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";

import { web3AuthOptions, modalConfig, openLoginAdapterOptions } from "../config/web3auth";
import { AppContext } from "./AppContext";
import { Button, Pane } from "evergreen-ui";

const styles = {
  outer: {
    display: "flex",
    flexFlow: "column",
    gap: ".5em",
  },
};

function Login() {
  const navigate = useNavigate();
  const { setSafeAuthKit, setEthAdapter } = useContext(AppContext);

  const login = async () => {
    // Create an instance of the Web3AuthAdapter
    const web3AuthAdapter = new Web3AuthAdapter(
      web3AuthOptions,
      [new OpenloginAdapter(openLoginAdapterOptions)],
      modalConfig
    );

    // Create an instance of the SafeAuthKit using the adapter and the SafeAuthConfig allowed options
    const safeAuthKit = await SafeAuthKit.init(web3AuthAdapter, {
      txServiceUrl: "https://safe-transaction-goerli.safe.global/",
    });

    await safeAuthKit.signIn();

    const provider = new ethers.providers.Web3Provider(safeAuthKit.getProvider()!);
    const signer = provider.getSigner(0);
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    }); //3

    // save to context
    setEthAdapter(ethAdapter);
    setSafeAuthKit(safeAuthKit);

    console.log(safeAuthKit.safeAuthData);

    if (safeAuthKit.safeAuthData?.safes?.length === 0) {
      navigate("/create");
    } else {
      const safeAddress = safeAuthKit.safeAuthData?.safes![0]!;
      navigate(`/safe-account/${safeAddress}`);
    }
  };

  return (
    <main style={styles.outer}>
      <span>Let's create Smart Account without wallet app!</span>

      <Button size="large" onClick={login}>
        Login
      </Button>
    </main>
  );
}

export default Login;

import { SafeAuthKit } from "@safe-global/auth-kit";
import { createContext, useState } from "react";

type AppContextType = {
  signer?: any;
  setSigner: (signer: any) => void;
  contractAddress?: any;
  setContractAddress: (contractAddress: any) => void;
  isLoggedIn: () => boolean;
  safeAuthKit?: any;
  setSafeAuthKit: (safeAuthKit: any) => void;
  ethAdapter?: any;
  setEthAdapter: (ethAdapter: any) => void;
  isSelectAccountOpen?: boolean;
  setIsSelectAccountOpen: (isSelectAccountOpen: boolean) => void;
};
type AppContextProviderProp = {
  children: JSX.Element;
};

const AppContext = createContext<AppContextType>({
  setSigner: () => {},
  setContractAddress: () => {},
  isLoggedIn: () => false,
  setSafeAuthKit: () => {},
  setEthAdapter: () => {},
  setIsSelectAccountOpen: () => {},
});

function AppContextProvider({ children }: AppContextProviderProp) {
  const [signer, setSigner] = useState(undefined);
  const [contractAddress, setContractAddress] = useState(undefined);
  const [safeAuthKit, setSafeAuthKit] = useState(undefined);
  const [ethAdapter, setEthAdapter] = useState(undefined);
  const isLoggedIn = () => {
    if (!safeAuthKit) return false;

    return !!(safeAuthKit as any).safeAuthData;
  };
  const [isSelectAccountOpen, setIsSelectAccountOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        signer,
        setSigner,
        contractAddress,
        setContractAddress,
        isLoggedIn,
        safeAuthKit,
        setSafeAuthKit,
        ethAdapter,
        setEthAdapter,
        isSelectAccountOpen,
        setIsSelectAccountOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };

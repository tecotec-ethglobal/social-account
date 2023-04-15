import { createContext, useState } from "react";

type AppContextType = {
  signer?: any;
  setSigner: (signer: any) => void;
  contractAddress?: any;
  setContractAddress: (contractAddress: any) => void;
};
type AppContextProviderProp = {
  children: JSX.Element;
};

const AppContext = createContext<AppContextType>({
  setSigner: () => {},
  setContractAddress: () => {},
});

function AppContextProvider({ children }: AppContextProviderProp) {
  const [signer, setSigner] = useState(undefined);
  const [contractAddress, setContractAddress] = useState(undefined);

  return (
    <AppContext.Provider value={{ signer, setSigner, contractAddress, setContractAddress }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };

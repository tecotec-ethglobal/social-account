import React, { useContext, useState } from "react";
import { AppContext } from "./AppContext";

export default function ContextDemo() {
  const [formInput, setFormInput] = useState("");
  const { contractAddress, setContractAddress } = useContext(AppContext);

  return (
    <main>
      <h1>Context Demo</h1>
      <div>context contract address: {contractAddress}</div>

      <label>new Contract address:</label>
      <input type="text" value={formInput} onChange={(e) => setFormInput(e.target.value)} />
      <button onClick={() => setContractAddress(formInput)}>set contract address</button>
    </main>
  );
}

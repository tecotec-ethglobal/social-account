import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AccountAction() {
  const [eoaAddress, setEoaAddress] = useState("0x123123123");

  return (
    <main>
      <h1>Your Address: {eoaAddress}</h1>

      <button>Select Account</button>
      <button>Create Account</button>
    </main>
  );
}

export default AccountAction;

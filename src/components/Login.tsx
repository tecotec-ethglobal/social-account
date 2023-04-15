import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const login = () => {
    // TODO: use Authkit to get signer, authData etc. from user social
    navigate("/action");
  };

  return (
    <main>
      <h1>Wallet-app</h1>
      <p>○○Contract?</p>

      <button onClick={login}>Login</button>
    </main>
  );
}

export default Login;

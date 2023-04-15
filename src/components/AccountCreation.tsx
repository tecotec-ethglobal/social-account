import React from "react";
import { useNavigate } from "react-router-dom";

function AccountCreation() {
  const navigate = useNavigate();
  const deployContract = () => {
    // TODO: deploy Safe account from form data
    // navigate('/contract')
  };

  // TODO: create form
  return (
    <main>
      <h1>Create your account</h1>

      <div>
        <h3>Owners</h3>
      </div>
      <div>
        <h3>Threshold</h3>
      </div>
    </main>
  );
}

export default AccountCreation;

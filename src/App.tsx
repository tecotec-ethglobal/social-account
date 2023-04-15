import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppContextProvider } from "./components/AppContext";
import Home from "./components/Home";
import ContextDemo from "./components/ContextDemo";
import Demo2 from "./components/Demo2";
import Login from "./components/Login";
import AccountAction from "./components/AccountAction";
import AccountCreation from "./components/AccountCreation";

import "./App.css";
import SafeAccount from "./components/SafeAccount";

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/context-demo" element={<ContextDemo />} />
          <Route path="/demo2" element={<Demo2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/action" element={<AccountAction />} />
          <Route path="/create" element={<AccountCreation />} />
          <Route path="/safe-account/:safeAddress" element={<SafeAccount />} />
          {/* <Route path="/transfer" element={} /> */}
          {/* <Route path="/change-owner" element={} /> */}
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;

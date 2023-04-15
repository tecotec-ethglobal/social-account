import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppContextProvider } from "./components/AppContext";
import Home from "./components/Home";
import ContextDemo from "./components/ContextDemo";
import Demo2 from "./components/Demo2";
import Login from "./components/Login";
import AccountAction from "./components/AccountAction";
import AccountCreation from "./components/AccountCreation";
import SafeAccount from "./components/SafeAccount";
import LoggedInLayout from "./components/LoggedInLayout";
import Transfer from "./components/Transfer";
import LoggedOutLayout from "./components/LoggedOutLayout";
import OwnersEdit from "./components/OwnersEdit";

import "./App.css";

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<LoggedInLayout />}>
            <Route path="/action" element={<AccountAction />} />
            <Route path="/create" element={<AccountCreation />} />
            <Route path="/safe-account/:safeAddress" element={<SafeAccount />} />
            <Route path="/transfer/:safeAddress" element={<Transfer />} />
            <Route path="/owners/:safeAddress" element={<OwnersEdit />} />
          </Route>

          <Route element={<LoggedOutLayout />}>
            <Route path="/context-demo" element={<ContextDemo />} />
            <Route path="/demo2" element={<Demo2 />} />
            <Route path="/" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;

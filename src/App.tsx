import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import ContextDemo from "./components/ContextDemo";
import Demo2 from "./components/Demo2";
import { AppContextProvider } from "./components/AppContext";

import "./App.css";

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/context-demo" element={<ContextDemo />} />
          <Route path="/demo2" element={<Demo2 />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;

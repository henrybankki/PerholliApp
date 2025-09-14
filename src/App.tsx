// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Balance from "./components/Balance";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Newspapers from "./pages/Newspapers";
import Articles from "./pages/Articles";
import Polls from "./pages/Polls";
import HenryyLotto from "./pages/HenryyLotto";
import HenryyOriginal from "./pages/HenryyOriginal";

function App() {
  return (
    <BrowserRouter>
      <NavBar /> {/* navigointipalkki kaikilla sivuilla */}
      <Routes>
        <h2>Oma saldo</h2>
        <Balance />
        <Route path="/" element={<Newspapers />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/lotto" element={<HenryyLotto />} />
        <Route path="/original" element={<HenryyOriginal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

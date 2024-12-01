import React, { useState } from "react";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";

//Auth
import LoginAuth from "./Auth/LoginAuth";
import RegisterAuth from "./Auth/RegisterAuth";

//Dashboard
import Dashboard from "./Dashboard/Dashboard";
import AddContacts from "./Dashboard/AddContacts";
import EditForm from "./Dashboard/EditForm";

import { useSelector } from "react-redux";

function App() {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <BrowserRouter>
      {!auth && (
        <Routes>
          <Route element={<LoginAuth />} path="/" />
          <Route element={<RegisterAuth />} path="/register" />
        </Routes>
      )}
      {auth && (
        <Routes>
          <Route element={<Dashboard />} path="/" />
          <Route element={<AddContacts />} path="/add" />
          <Route element={<EditForm />} path="/edit" />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;

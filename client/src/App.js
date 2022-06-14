//react imports
import React from "react";

//router imports
import { Routes, Route, Navigate } from "react-router-dom";

//component imports
import Layout from "./components/Layout";
import Missing from "./components/pages/Missing";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/404" element={<Missing />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

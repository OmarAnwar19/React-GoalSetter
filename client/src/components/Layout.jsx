//react imports
import React from "react";

//node imports
import { ToastContainer } from "react-toastify";

//react router imports
//outlet allows us to outlet to other routes
import { Outlet } from "react-router";

//component imports
import Header from "./Header";

//css imports
import "react-toastify/dist/ReactToastify.css";

//the layout component is where we insert headers, footers, etc..
//--> anything that is on the layout of all pages
const Layout = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Layout;

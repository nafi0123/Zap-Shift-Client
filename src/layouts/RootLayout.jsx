import React from "react";
import NavBar from "../pages/Shared/NavBar/NavBar";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto">
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
    </div>

  );
};

export default RootLayout;

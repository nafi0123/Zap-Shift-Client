import React from "react";
import NavBar from "../pages/Shared/NavBar/NavBar";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="bg-gray-100">
      {/* Full width navbar */}
      <NavBar />

      {/* Centered main content */}
      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>

      {/* Full width footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;

import React from "react";
import { CiDeliveryTruck, CiSettings } from "react-icons/ci";
import { Link, NavLink, Outlet } from "react-router";
import Logo from "../components/Logo/Logo";


const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Drawer Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-100 shadow-sm">
          {/* Mobile drawer toggle */}
          <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>

          {/* Logo */}
          <div className="px-4 flex items-center gap-2">
            <Logo />
            {/* <span className="font-semibold text-lg">Dashboard</span> */}
          </div>
        </nav>

        {/* Page content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Drawer Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="flex flex-col min-h-full w-64 bg-base-100 shadow-inner p-4">
          <ul className="menu w-full flex flex-col gap-2">
            {/* Homepage */}
            <li>
              <Link className="btn btn-ghost w-full flex items-center gap-2" to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-6H9v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V10z" />
                </svg>
                <span>Homepage</span>
              </Link>
            </li>

            {/* My Parcels */}
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className="btn btn-ghost w-full flex items-center gap-2"
              >
                <CiDeliveryTruck className="text-xl" />
                <span>Payment History</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-parcels"
                className="btn btn-ghost w-full flex items-center gap-2"
              >
                <CiDeliveryTruck className="text-xl" />
                <span>My Parcels</span>
              </NavLink>
            </li>

            {/* Settings */}
            <li>
              <button className="btn btn-ghost w-full flex items-center gap-2">
                <CiSettings className="text-xl" />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;

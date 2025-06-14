import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar with fixed width, full height of parent flex container */}
      <div className="w-64 bg-slate-800 text-white flex-shrink-0">
        <SideBar />
      </div>

      {/* Main content grows and pushes page height */}
      <main className="flex-1 p-10 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

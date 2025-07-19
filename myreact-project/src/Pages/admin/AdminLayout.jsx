import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-screen bg-slate-800 text-white">
        <SideBar />
      </div>

      {/* Main content with left margin equal to sidebar width, scrollable */}
      <main className="ml-64 flex-1 p-10 bg-white overflow-y-auto max-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

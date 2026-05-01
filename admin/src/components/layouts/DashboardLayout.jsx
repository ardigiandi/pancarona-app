import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#0f0f13] text-white">
      <Sidebar sidebarOpen={sidebarOpen} />

      <div className="flex flex-col flex-1">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
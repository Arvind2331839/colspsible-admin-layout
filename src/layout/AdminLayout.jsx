import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/AdminHeader";

export default function AdminLayout({ title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className={`admin-app ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} />

      <div className="content">
        {/* header */}
        <Header
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          title={title}
        />

        {/* ROUTER CONTENT */}
        <main className="container-fluid">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

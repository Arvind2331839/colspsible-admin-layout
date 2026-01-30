import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
        {children}
      </div>
    </div>
  );
}

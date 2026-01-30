import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({sidebarOpen}) => {
  


  return (
  <div className={`admin-app ${sidebarOpen ? "sidebar-open" : ""}`}>
   <aside className="sidebar">
      <div className="p-3 sidebar-header d-flex align-items-center gap-2">
        <img src="/assets/images/logo.png" className="logo" alt="logo" />
        <div className="fw-bold ms-2">MathAdventure</div>
      </div>

      <nav className="p-3">
        <NavLink to="/admin/dashboard" className="nav-link d-flex align-items-center">
          <i className="bi bi-speedometer2"></i>
          <span className="nav-text">Dashboard</span>
        </NavLink>

        <NavLink to="/admin/students" className="nav-link d-flex align-items-center">
          <i className="bi bi-people"></i>
          <span className="nav-text">Students</span>
        </NavLink>

        <NavLink to="/admin/teachers" className="nav-link d-flex align-items-center">
          <i className="bi bi-person-badge"></i>
          <span className="nav-text">Teachers</span>
        </NavLink>

        <NavLink to="/admin/lessons" className="nav-link d-flex align-items-center">
          <i className="bi bi-journal-text"></i>
          <span className="nav-text">Lessons</span>
        </NavLink>

        <NavLink to="/admin/quests" className="nav-link d-flex align-items-center">
          <i className="bi bi-flag"></i>
          <span className="nav-text">Quests</span>
        </NavLink>

        <NavLink to="/admin/problems" className="nav-link d-flex align-items-center">
          <i className="bi bi-puzzle"></i>
          <span className="nav-text">Problems</span>
        </NavLink>

        <NavLink to="/admin/leaderboard" className="nav-link d-flex align-items-center">
          <i className="bi bi-trophy"></i>
          <span className="nav-text">Leaderboard</span>
        </NavLink>

        <NavLink to="/admin/rewards" className="nav-link d-flex align-items-center">
          <i className="bi bi-gift"></i>
          <span className="nav-text">Rewards</span>
        </NavLink>
      </nav>
    </aside>
  <div className="content">...</div>
</div>
  );
};

export default Sidebar;




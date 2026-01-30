import React, { useState } from "react";

const Sidebar = ({sidebarOpen}) => {
  


  return (
  <div className={`admin-app ${sidebarOpen ? "sidebar-open" : ""}`}>
    <aside id="sidebar" class="sidebar">
      <div class="p-3 sidebar-header d-flex align-items-center gap-2">
        <img src="assets/images/logo.png" class="logo" alt="logo" />
        <div class="fw-bold ms-2">MathAdventure</div>
      </div>
      <nav class="p-3">
        <a
          href="admin-dashboard.html"
          class="nav-link d-flex align-items-center"
        >
          <i class="bi bi-speedometer2"></i>
          <span class="nav-text">Dashboard</span>
        </a>
        <a
          href="admin-students.html"
          class="nav-link d-flex align-items-center"
        >
          <i class="bi bi-people"></i>
          <span class="nav-text">Students</span>
        </a>
        <a
          href="admin-teachers.html"
          class="nav-link d-flex align-items-center"
        >
          <i class="bi bi-person-badge"></i>
          <span class="nav-text">Teachers</span>
        </a>
        <a href="admin-lessons.html" class="nav-link d-flex align-items-center">
          <i class="bi bi-journal-text"></i>
          <span class="nav-text">Lessons</span>
        </a>
        <a href="admin-quests.html" class="nav-link d-flex align-items-center">
          <i class="bi bi-flag"></i>
          <span class="nav-text">Quests</span>
        </a>
        <a
          href="admin-problems.html"
          class="nav-link d-flex align-items-center"
        >
          <i class="bi bi-puzzle"></i>
          <span class="nav-text">Problems</span>
        </a>
        <a
          href="admin-leaderboard.html"
          class="nav-link d-flex align-items-center"
        >
          <i class="bi bi-trophy"></i>
          <span class="nav-text">Leaderboard</span>
        </a>
        <a href="admin-rewards.html" class="nav-link d-flex align-items-center">
          <i class="bi bi-gift"></i>
          <span class="nav-text">Rewards</span>
        </a>
      </nav>
    </aside>
  <div className="content">...</div>
</div>
  );
};

export default Sidebar;




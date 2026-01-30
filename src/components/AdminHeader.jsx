import React from "react";

const AdminHeader = ({ toggleSidebar, title = "Dashboard" }) => {
  return (
    <header>
      <div className="header-inner">
        <div className="page-title d-flex align-items-center">
          {/* hamburger toggle */}
          <button
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <i className="bi bi-list"></i>
          </button>

          <span>{title}</span>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="dropdown">
            <a
              className="d-flex align-items-center text-decoration-none dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              <div className="avatar">A</div>
            </a>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="admin-login.html">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

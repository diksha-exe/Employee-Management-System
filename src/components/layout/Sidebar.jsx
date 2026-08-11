import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  BriefcaseBusiness,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* Logo */}

      <div className="sidebar-logo">

        <div className="logo-icon">
          <BriefcaseBusiness size={22} />
        </div>

        <div>
          <h2>HR-One</h2>
          <span>HR Management</span>
        </div>

      </div>


      {/* Navigation */}

      <nav className="sidebar-nav">

        <p className="nav-label">
          MAIN MENU
        </p>


        {/* Dashboard */}

        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>


        {/* Employees */}

        <NavLink
          to="/employee"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <Users size={18} />
          Employees
        </NavLink>


        <p className="nav-label settings-label">
          SYSTEM
        </p>


        {/* Settings */}

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>

      </nav>


      {/* Bottom profile */}

      <div className="sidebar-bottom">

        <div className="profile-mini">

          <div className="profile-avatar">
            HR
          </div>

          <div>
            <strong>HR Admin</strong>
            <span>Administrator</span>
          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;
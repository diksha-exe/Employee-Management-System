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

      <div className="sidebar-logo">

        <div className="logo-icon">
          <BriefcaseBusiness size={22} />
        </div>

        <div>
          <h2>HR-One</h2>
          <span>HR Management</span>
        </div>

      </div>

      <nav className="sidebar-nav">

        <p className="nav-label">MAIN MENU</p>

        <button className="nav-item active">
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button className="nav-item">
          <Users size={18} />
          Employees
        </button>

        <button className="nav-item">
          <Building2 size={18} />
          Departments
        </button>

        <p className="nav-label settings-label">
          SYSTEM
        </p>

        <button className="nav-item">
          <Settings size={18} />
          Settings
        </button>

      </nav>

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
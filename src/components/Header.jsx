import {
  Bell,
  Search,
} from "lucide-react";

function Header() {
  return (
    <header className="header">

      <div className="header-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search anything..."
        />

      </div>

      <div className="header-right">

        <button className="notification-btn">
          <Bell size={19} />
          <span className="notification-dot"></span>
        </button>

        <div className="header-user">

          <div className="avatar">
            HR
          </div>

          <div>
            <strong>HR Admin</strong>
            <span>Human Resources</span>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;
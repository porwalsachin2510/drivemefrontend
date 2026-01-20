"use client"
import "./AdminNavigation.css"

function AdminNavigation({ dashboardactiveTab, setDashboardActiveTab }) {
  const navItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "b2c", label: "B2C Management", icon: "🚌" },
    { id: "ride-pooling", label: "Ride Pooling", icon: "🚗" },
    { id: "b2b", label: "B2B Listings", icon: "📋" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "reports", label: "Reports", icon: "📈" },
    { id: "finance", label: "Finance", icon: "💰" },
    { id: "comm", label: "Comm.", icon: "💬" },
    { id: "ads", label: "Ads", icon: "📢" },
  ];

  return (
    <nav className="ad-dash-navigation">
      <div className="ad-dash-nav-content">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`ad-dash-nav-item ${
              dashboardactiveTab === item.id ? "ad-dash-nav-item-active" : ""
            }`}
            onClick={() => setDashboardActiveTab(item.id)}
          >
            <span className="ad-dash-nav-icon">{item.icon}</span>
            <span className="ad-dash-nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default AdminNavigation

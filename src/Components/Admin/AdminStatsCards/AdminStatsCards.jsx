import "./AdminStatsCards.css"

function AdminStatsCards() {
  const stats = [
    {
      title: "Total Revenue",
      value: "49,625 KWD",
      change: "+15% from last month",
      positive: true,
      icon: "💵",
      color: "#10b981",
    },
    {
      title: "Active Routes",
      value: "60",
      change: "50 Active Providers",
      positive: true,
      icon: "📍",
      color: "#3b82f6",
    },
    {
      title: "Total Bookings",
      value: "6,125",
      change: "+8.5% conversion rate",
      positive: true,
      icon: "🎫",
      color: "#8b5cf6",
    },
    {
      title: "Total Users",
      value: "150+",
      change: "Across 3 Segments",
      positive: true,
      icon: "👥",
      color: "#f59e0b",
    },
  ]

  return (
    <div className="ad-dash-stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="ad-dash-stat-card">
          <div className="ad-dash-stat-content">
            <div className="ad-dash-stat-header">
              <span className="ad-dash-stat-title">{stat.title}</span>
              <span className="ad-dash-stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </span>
            </div>
            <div className="ad-dash-stat-value">{stat.value}</div>
            <div className={`ad-dash-stat-change ${stat.positive ? "ad-dash-stat-positive" : ""}`}>
              {stat.positive && "↗ "}
              {stat.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminStatsCards

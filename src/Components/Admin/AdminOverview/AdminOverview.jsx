import "./AdminOverview.css"
import AdminStatsCards from "../AdminStatsCards/AdminStatsCards"
import AdminRevenueChart from "../AdminRevenueChart/AdminRevenueChart"
import AdminUserDistribution from "../AdminUserDistribution/AdminUserDistribution"
import AdminBookingTrends from "../AdminBookingTrends/AdminBookingTrends"

function AdminOverview() {
  return (
    <div className="ad-dash-overview">
      <div className="ad-dash-overview-header">
        <div>
          <h2 className="ad-dash-overview-title">Comprehensive Analytics</h2>
          <p className="ad-dash-overview-subtitle">Real-time platform performance & growth metrics</p>
        </div>
        <div className="ad-dash-export-buttons">
          <button className="ad-dash-export-btn">
            <span>📥</span> Export Data (CSV)
          </button>
          <button className="ad-dash-export-btn">
            <span>📄</span> Export Report (PDF)
          </button>
        </div>
      </div>

      <AdminStatsCards />

      <div className="ad-dash-charts-row">
        <div className="ad-dash-chart-large">
          <AdminRevenueChart />
        </div>
        <div className="ad-dash-chart-small">
          <AdminUserDistribution />
        </div>
      </div>

      <div className="ad-dash-chart-full">
        <AdminBookingTrends />
      </div>
    </div>
  )
}

export default AdminOverview

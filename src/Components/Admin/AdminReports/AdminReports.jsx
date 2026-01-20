"use client"

import { useState } from "react"
import "./AdminReports.css"

function AdminReports() {
  const [activeTab, setActiveTab] = useState("fraud-detection")

  const fraudAlerts = [
    {
      id: "FR-001",
      type: "Multiple Accounts",
      description: "Same IP used for 5 different accounts",
      user: "User-1023",
      severity: "HIGH",
      color: "high",
    },
    {
      id: "FR-002",
      type: "Payment Suspicion",
      description: "3 failed attempts with different cards",
      user: "User-1055",
      severity: "MEDIUM",
      color: "medium",
    },
    {
      id: "FR-003",
      type: "Route Manipulation",
      description: "Route timing changed 5 times in 1 hour",
      user: "Prov-8821",
      severity: "LOW",
      color: "low",
    },
  ]

  const userActivity = [
    {
      user: "Noura Al-Mutairi",
      id: "COM-1000",
      riskScore: 93,
      complaints: 1,
      rating: 3.8,
      status: "Flagged",
    },
    {
      user: "Fahad Al-Rashid",
      id: "COM-1001",
      riskScore: 32,
      complaints: 1,
      rating: 4.1,
      status: "Safe",
    },
    {
      user: "Mohammed Al-Enezi",
      id: "COM-1002",
      riskScore: 30,
      complaints: 0,
      rating: 3.8,
      status: "Safe",
    },
    {
      user: "Fatima Al-Rashid",
      id: "COM-1003",
      riskScore: 8,
      complaints: 3,
      rating: 4.0,
      status: "Safe",
    },
    {
      user: "Mohammed Smith",
      id: "COM-1004",
      riskScore: 89,
      complaints: 1,
      rating: 3.9,
      status: "Flagged",
    },
  ]

  const complaints = [
    {
      id: "CP-001",
      category: "Late Arrival",
      description: "The driver was 20 minutes late and refused to answer calls.",
      against: "Prov-8821",
      time: "2 hours ago",
    },
    {
      id: "CP-002",
      category: "Late Arrival",
      description: "The driver was 20 minutes late and refused to answer calls.",
      against: "Prov-8821",
      time: "2 hours ago",
    },
    {
      id: "CP-003",
      category: "Late Arrival",
      description: "The driver was 20 minutes late and refused to answer calls.",
      against: "Prov-8821",
      time: "2 hours ago",
    },
    {
      id: "CP-004",
      category: "Late Arrival",
      description: "The driver was 20 minutes late and refused to answer calls.",
      against: "Prov-8821",
      time: "2 hours ago",
    },
  ]

  const handleResolveComplaint = (complaintId) => {
    console.log("[v0] Resolving complaint:", complaintId)
    // Handle complaint resolution logic
  }

  return (
    <div className="admin-reports">
      <div className="admin-reports-header">
        <div>
          <h2 className="admin-reports-title">User Reports & Safety</h2>
          <p className="admin-reports-subtitle">
            Monitor user activity, handle complaints, and review system fraud alerts.
          </p>
        </div>
      </div>

      <div className="admin-reports-tabs">
        <button
          className={`admin-reports-tab ${activeTab === "fraud-detection" ? "active" : ""}`}
          onClick={() => setActiveTab("fraud-detection")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Fraud Detection
        </button>
        <button
          className={`admin-reports-tab ${activeTab === "user-activity" ? "active" : ""}`}
          onClick={() => setActiveTab("user-activity")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <polyline points="17 11 19 13 23 9" />
          </svg>
          User Activity
        </button>
        <button
          className={`admin-reports-tab ${activeTab === "complaints" ? "active" : ""}`}
          onClick={() => setActiveTab("complaints")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Complaints
        </button>
      </div>

      <div className="admin-reports-content">
        {activeTab === "fraud-detection" && (
          <div className="admin-reports-fraud">
            {fraudAlerts.map((alert) => (
              <div key={alert.id} className={`admin-reports-fraud-card admin-reports-fraud-${alert.color}`}>
                <div className="admin-reports-fraud-header">
                  <div className="admin-reports-fraud-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <div className="admin-reports-fraud-info">
                    <h3 className="admin-reports-fraud-title">{alert.type}</h3>
                    <p className="admin-reports-fraud-desc">{alert.description}</p>
                    <p className="admin-reports-fraud-meta">
                      <span className="admin-reports-fraud-id">ID: {alert.id}</span>
                      <span className="admin-reports-fraud-user">User: {alert.user}</span>
                      <span className={`admin-reports-fraud-severity admin-reports-fraud-severity-${alert.color}`}>
                        SEVERITY: {alert.severity}
                      </span>
                    </p>
                  </div>
                  <div className="admin-reports-fraud-actions">
                    <button className="admin-reports-fraud-btn admin-reports-fraud-btn-ban">Ban User</button>
                    <button className="admin-reports-fraud-btn admin-reports-fraud-btn-investigate">Investigate</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "user-activity" && (
          <div className="admin-reports-activity">
            <div className="admin-reports-activity-header">
              <h3 className="admin-reports-activity-title">Top Active Users (High Risk Watchlist)</h3>
            </div>
            <div className="admin-reports-activity-table-container">
              <table className="admin-reports-activity-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Risk Score</th>
                    <th>Complaints</th>
                    <th>Rating</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userActivity.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="admin-reports-activity-user">
                          <div>{user.user}</div>
                          <div className="admin-reports-activity-user-id">{user.id}</div>
                        </div>
                      </td>
                      <td>
                        <div className="admin-reports-activity-risk">
                          <div className="admin-reports-activity-risk-bar">
                            <div
                              className={`admin-reports-activity-risk-fill ${user.riskScore > 70 ? "high" : user.riskScore > 30 ? "medium" : "low"}`}
                              style={{ width: `${user.riskScore}%` }}
                            ></div>
                          </div>
                          <span
                            className={`admin-reports-activity-risk-value ${user.riskScore > 70 ? "high" : user.riskScore > 30 ? "medium" : "low"}`}
                          >
                            {user.riskScore}
                          </span>
                        </div>
                      </td>
                      <td>{user.complaints}</td>
                      <td>
                        <div className="admin-reports-activity-rating">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          {user.rating}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`admin-reports-activity-status admin-reports-activity-status-${user.status.toLowerCase()}`}
                        >
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "complaints" && (
          <div className="admin-reports-complaints">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="admin-reports-complaint-card">
                <div className="admin-reports-complaint-header">
                  <span className="admin-reports-complaint-category">{complaint.category}</span>
                  <span className="admin-reports-complaint-time">{complaint.time}</span>
                </div>
                <p className="admin-reports-complaint-description">{complaint.description}</p>
                <div className="admin-reports-complaint-footer">
                  <span className="admin-reports-complaint-against">Against: {complaint.against}</span>
                  <button
                    className="admin-reports-complaint-resolve"
                    onClick={() => handleResolveComplaint(complaint.id)}
                  >
                    Resolve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminReports

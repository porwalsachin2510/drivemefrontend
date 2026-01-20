"use client"

import { useState } from "react"
import "./AdminRidePooling.css"
import AdminPassengerInterests from "./AdminPassengerInterests/AdminPassengerInterests";
import AdminUserSuggestedRoutes from "./AdminUserSuggestedRoutes/AdminUserSuggestedRoutes"

function AdminRidePooling() {
  const [activeSubTab, setActiveSubTab] = useState("passenger-interests")

  const subTabs = [
    { id: "passenger-interests", label: "Passenger Interests" },
    { id: "user-suggested-routes", label: "User Suggested Routes" },
  ]

  const renderSubContent = () => {
    switch (activeSubTab) {
      case "passenger-interests":
        return <AdminPassengerInterests />
      case "user-suggested-routes":
        return <AdminUserSuggestedRoutes />
      default:
        return <AdminPassengerInterests />
    }
  }

  return (
    <div className="ad-dash-ride-pooling">
      <div className="ad-dash-ride-pooling-header">
        <h2 className="ad-dash-ride-pooling-title">Ride Pooling Management</h2>
        <button className="ad-dash-ride-pooling-refresh-btn">Refresh Data</button>
      </div>

      <div className="ad-dash-ride-pooling-sub-nav">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            className={`ad-dash-ride-pooling-sub-tab ${
              activeSubTab === tab.id ? "ad-dash-ride-pooling-sub-tab-active" : ""
            }`}
            onClick={() => setActiveSubTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="ad-dash-ride-pooling-content">{renderSubContent()}</div>
    </div>
  )
}

export default AdminRidePooling

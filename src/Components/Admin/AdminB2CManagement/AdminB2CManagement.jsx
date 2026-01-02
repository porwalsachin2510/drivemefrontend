"use client"

import { useState } from "react"
import "./AdminB2CManagement.css"
import AdminServiceProviders from "./AdminServiceProviders/AdminServiceProviders"
import AdminRouteManagement from "./AdminRouteManagement/AdminRouteManagement"
import AdminTagsBadges from "./AdminTagsBadges/AdminTagsBadges"
import AdminPassengersReassignments from "./AdminPassengersReassignments/AdminPassengersReassignments"
import AdminEarningsPayments from "./AdminEarningsPayments/AdminEarningsPayments"

function AdminB2CManagement() {
  const [activeSubTab, setActiveSubTab] = useState("service-providers")

  const subTabs = [
    { id: "service-providers", label: "Service Providers" },
    { id: "route-management", label: "Route Management" },
    { id: "tags-badges", label: "Tags & Badges" },
    { id: "passengers", label: "Passengers & Reassignments" },
    { id: "earnings", label: "Earnings & Payments" },
  ]

  const renderSubContent = () => {
    switch (activeSubTab) {
      case "service-providers":
        return <AdminServiceProviders />
      case "route-management":
        return <AdminRouteManagement />
      case "tags-badges":
        return <AdminTagsBadges />
      case "passengers":
        return <AdminPassengersReassignments />
      case "earnings":
        return <AdminEarningsPayments />
      default:
        return <AdminServiceProviders />
    }
  }

  return (
    <div className="ad-dash-b2c-management">
      <div className="ad-dash-b2c-header">
        <div className="ad-dash-b2c-title-section">
          <h2 className="ad-dash-b2c-title">
            <span className="ad-dash-b2c-icon">🚌</span>
            B2C Management Console
          </h2>
          <p className="ad-dash-b2c-description">
            Comprehensive control over providers, routes, passengers, and B2C financials.
          </p>
        </div>
      </div>

      <div className="ad-dash-b2c-sub-nav">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            className={`ad-dash-b2c-sub-tab ${activeSubTab === tab.id ? "ad-dash-b2c-sub-tab-active" : ""}`}
            onClick={() => setActiveSubTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="ad-dash-b2c-content">{renderSubContent()}</div>
    </div>
  )
}

export default AdminB2CManagement

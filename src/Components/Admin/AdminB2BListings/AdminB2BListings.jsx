"use client"

import { useState } from "react"
import "./AdminB2BListings.css"
import AdminB2CProviders from "./AdminB2CProviders/AdminB2CProviders"
import AdminB2BProviders from "./AdminB2BProviders/AdminB2BProviders"

function AdminB2BListings() {
  const [activeSubTab, setActiveSubTab] = useState("b2c-providers")

  const subTabs = [
    { id: "b2c-providers", label: "B2C Providers" },
    { id: "b2b-providers", label: "B2B Providers" },
  ]

  const renderSubContent = () => {
    switch (activeSubTab) {
      case "b2c-providers":
        return <AdminB2CProviders />
      case "b2b-providers":
        return <AdminB2BProviders />
      default:
        return <AdminB2CProviders />
    }
  }

  return (
    <div className="ad-dash-b2b-listings">
      <div className="ad-dash-b2b-listings-header">
        <div>
          <h2 className="ad-dash-b2b-listings-title">Provider Listings</h2>
          <p className="ad-dash-b2b-listings-description">Manage B2C and B2B provider applications</p>
        </div>
        <div className="ad-dash-b2b-listings-search-wrapper">
          <svg className="ad-dash-b2b-listings-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input type="text" placeholder="Search providers..." className="ad-dash-b2b-listings-search-input" />
        </div>
      </div>

      <div className="ad-dash-b2b-listings-sub-nav">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            className={`ad-dash-b2b-listings-sub-tab ${
              activeSubTab === tab.id ? "ad-dash-b2b-listings-sub-tab-active" : ""
            }`}
            onClick={() => setActiveSubTab(tab.id)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {tab.id === "b2c-providers" ? (
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M12.5 7.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
              ) : (
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              )}
            </svg>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="ad-dash-b2b-listings-content">{renderSubContent()}</div>
    </div>
  )
}

export default AdminB2BListings

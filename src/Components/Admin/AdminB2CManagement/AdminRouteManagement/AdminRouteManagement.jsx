"use client"

import { useState } from "react"
import "./AdminRouteManagement.css"
import AdminCreateRouteModal from "./AdminCreateRouteModal/AdminCreateRouteModal"
import AdminEditRouteModal from "./AdminEditRouteModal/AdminEditRouteModal"

function AdminRouteManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState(null)

  const routes = [
    {
      id: 1,
      name: "Route 5001: Hawally Loop",
      from: "Jahra",
      to: "Jahra",
      provider: "KGL Transport",
      time: "08:00 AM",
      capacity: "3/44",
      status: "active",
      featured: true,
    },
    {
      id: 2,
      name: "Route 5002: Salwa Loop",
      from: "Salwa",
      to: "Hawally",
      provider: "KGL Transport",
      time: "08:00 AM",
      capacity: "0/48",
      status: "active",
      featured: false,
    },
    {
      id: 3,
      name: "Route 5003: Kuwait City Loop",
      from: "Mahboula",
      to: "Mahboula",
      provider: "Gulf Transport",
      time: "07:00 AM",
      capacity: "0/40",
      status: "active",
      featured: false,
    },
  ]

  const handleEditClick = (route) => {
    setSelectedRoute(route)
    setShowEditModal(true)
  }

  return (
    <div className="ad-dash-route-management">
      <div className="ad-dash-rm-header">
        <input type="text" placeholder="Search route, origin, or destination..." className="ad-dash-rm-search" />
        <button className="ad-dash-rm-create-btn" onClick={() => setShowCreateModal(true)}>
          <span>➕</span> Create New Route
        </button>
      </div>

      <div className="ad-dash-rm-table-container">
        <table className="ad-dash-rm-table">
          <thead>
            <tr>
              <th>Route Info</th>
              <th>Tags</th>
              <th>Schedule & Price</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id}>
                <td>
                  <div className="ad-dash-rm-route-info">
                    <div className="ad-dash-rm-route-name">
                      {route.name}
                      {route.featured && <span className="ad-dash-rm-featured">⭐</span>}
                    </div>
                    <div className="ad-dash-rm-route-path">
                      📍 {route.from} → {route.to}
                    </div>
                    <div className="ad-dash-rm-provider">{route.provider}</div>
                  </div>
                </td>
                <td>
                  <div className="ad-dash-rm-tags">
                    <span className="ad-dash-rm-tag">Budget Friendly</span>
                    <span className="ad-dash-rm-tag">Premium</span>
                  </div>
                </td>
                <td>
                  <div className="ad-dash-rm-schedule">
                    <div>🕐 {route.time}</div>
                    <div className="ad-dash-rm-price">0.823 KWD</div>
                  </div>
                </td>
                <td>
                  <div className="ad-dash-rm-capacity">{route.capacity}</div>
                </td>
                <td>
                  <span className={`ad-dash-rm-status ad-dash-rm-status-${route.status}`}>
                    {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="ad-dash-rm-actions">
                    <button className="ad-dash-rm-action-icon" onClick={() => handleEditClick(route)}>
                      ✏️
                    </button>
                    <button className="ad-dash-rm-action-icon">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreateModal && <AdminCreateRouteModal onClose={() => setShowCreateModal(false)} />}

      {showEditModal && <AdminEditRouteModal route={selectedRoute} onClose={() => setShowEditModal(false)} />}
    </div>
  )
}

export default AdminRouteManagement

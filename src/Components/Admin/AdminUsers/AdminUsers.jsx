"use client"

import { useState } from "react"
import "./AdminUsers.css"
import AdminUserDetailsModal from "./AdminUserDetailsModal/AdminUserDetailsModal"

function AdminUsers() {
  const [activeTab, setActiveTab] = useState("all-requests")
  const [selectedUser, setSelectedUser] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const allRequests = [
    {
      id: "COM-1000",
      name: "Abdullah Al-Rashid",
      initial: "A",
      type: "Commuter",
      status: "Active",
      from: "Salmiya",
      to: "Kuwait City",
      time: "06:30 AM",
    },
    {
      id: "COM-1001",
      name: "Layla Al-Sabah",
      initial: "L",
      type: "Commuter",
      status: "Active",
      from: "Hawally",
      to: "Shuwaikh",
      time: "07:00 AM",
    },
    {
      id: "COM-1002",
      name: "Ahmed Kumar",
      initial: "A",
      type: "Commuter",
      status: "Pending",
      from: "Farwaniya",
      to: "Sharq",
      time: "08:00 AM",
    },
    {
      id: "COM-1003",
      name: "Mohammed Al-Ali",
      initial: "M",
      type: "Commuter",
      status: "Active",
      from: "Jabriya",
      to: "Dasman",
      time: "06:45 AM",
    },
    {
      id: "COM-1004",
      name: "Noura Khan",
      initial: "N",
      type: "Commuter",
      status: "Pending",
      from: "Mangaf",
      to: "Salwa",
      time: "07:30 AM",
    },
    {
      id: "COM-1005",
      name: "Sarah Al-Ali",
      initial: "S",
      type: "Commuter",
      status: "Active",
      from: "Fintas",
      to: "Mishref",
      time: "06:15 AM",
    },
    {
      id: "COM-1006",
      name: "Omar Kumar",
      initial: "O",
      type: "Commuter",
      status: "Active",
      from: "Ahmadi",
      to: "Fahaheel",
      time: "07:15 AM",
    },
    {
      id: "COM-1007",
      name: "Ali Al-Rashid",
      initial: "A",
      type: "Commuter",
      status: "Active",
      from: "Sabah Al-Salem",
      to: "Bayan",
      time: "06:00 AM",
    },
    {
      id: "COM-1008",
      name: "Fatima Al-Sabah",
      initial: "F",
      type: "Commuter",
      status: "Active",
      from: "Rumaithiya",
      to: "Salwa",
      time: "07:45 AM",
    },
    {
      id: "COM-1009",
      name: "Zainab Kumar",
      initial: "Z",
      type: "Commuter",
      status: "Pending",
      from: "Jleeb",
      to: "Ardiya",
      time: "08:30 AM",
    },
    {
      id: "COM-1010",
      name: "Sarah Al-Enezi",
      initial: "S",
      type: "Commuter",
      status: "Active",
      from: "Khaitan",
      to: "Farwaniya",
      time: "06:20 AM",
    },
    {
      id: "COM-1011",
      name: "Sarah Al-Mutairi",
      initial: "S",
      type: "Commuter",
      status: "Pending",
      from: "Fahaheel",
      to: "Fintas",
      time: "07:00 AM",
    },
  ]

  const commuters = allRequests.filter((req) => req.type === "Commuter")

  const corporates = [
    {
      id: "COR-1000",
      name: "Agility",
      initial: "A",
      type: "Corporate",
      status: "Active",
      from: "Salmiya",
      to: "Kuwait City",
      time: "06:30 AM",
    },
    {
      id: "COR-1001",
      name: "Equate",
      initial: "E",
      type: "Corporate",
      status: "Active",
      from: "Hawally",
      to: "Shuwaikh",
      time: "07:00 AM",
    },
    {
      id: "COR-1002",
      name: "NBK",
      initial: "N",
      type: "Corporate",
      status: "Active",
      from: "Farwaniya",
      to: "Sharq",
      time: "08:00 AM",
    },
    {
      id: "COR-1003",
      name: "Zain",
      initial: "Z",
      type: "Corporate",
      status: "Pending",
      from: "Jabriya",
      to: "Dasman",
      time: "06:45 AM",
    },
    {
      id: "COR-1004",
      name: "Ooredoo",
      initial: "O",
      type: "Corporate",
      status: "Active",
      from: "Mangaf",
      to: "Salwa",
      time: "07:30 AM",
    },
    {
      id: "COR-1005",
      name: "KOC",
      initial: "K",
      type: "Corporate",
      status: "Active",
      from: "Fintas",
      to: "Mishref",
      time: "06:15 AM",
    },
    {
      id: "COR-1006",
      name: "KOC",
      initial: "K",
      type: "Corporate",
      status: "Pending",
      from: "Ahmadi",
      to: "Fahaheel",
      time: "07:15 AM",
    },
    {
      id: "COR-1007",
      name: "KGL",
      initial: "K",
      type: "Corporate",
      status: "Active",
      from: "Sabah Al-Salem",
      to: "Bayan",
      time: "06:00 AM",
    },
    {
      id: "COR-1008",
      name: "Equate",
      initial: "E",
      type: "Corporate",
      status: "Active",
      from: "Rumaithiya",
      to: "Salwa",
      time: "07:45 AM",
    },
    {
      id: "COR-1009",
      name: "Equate",
      initial: "E",
      type: "Corporate",
      status: "Active",
      from: "Jleeb",
      to: "Ardiya",
      time: "08:30 AM",
    },
    {
      id: "COR-1010",
      name: "KNPC",
      initial: "K",
      type: "Corporate",
      status: "Active",
      from: "Khaitan",
      to: "Farwaniya",
      time: "06:20 AM",
    },
    {
      id: "COR-1011",
      name: "KGL",
      initial: "K",
      type: "Corporate",
      status: "Active",
      from: "Fahaheel",
      to: "Fintas",
      time: "07:00 AM",
    },
  ]

  const getCurrentData = () => {
    switch (activeTab) {
      case "all-requests":
        return allRequests
      case "commuters":
        return commuters
      case "corporates":
        return corporates
      default:
        return allRequests
    }
  }

  const handleViewDetails = (user) => {
    setSelectedUser(user)
    setShowDetailsModal(true)
  }

  const filteredData = getCurrentData().filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.to.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="admin-users">
      <div className="admin-users-header">
        <div>
          <h2 className="admin-users-title">Route Requests Management</h2>
          <p className="admin-users-subtitle">Manage commute requests from individuals and corporates</p>
        </div>
        <div className="admin-users-header-actions">
          <div className="admin-users-search-wrapper">
            <svg className="admin-users-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search by name or location..."
              className="admin-users-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="admin-users-export-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export All
          </button>
        </div>
      </div>

      <div className="admin-users-tabs">
        <button
          className={`admin-users-tab ${activeTab === "all-requests" ? "active" : ""}`}
          onClick={() => setActiveTab("all-requests")}
        >
          All Requests
        </button>
        <button
          className={`admin-users-tab ${activeTab === "commuters" ? "active" : ""}`}
          onClick={() => setActiveTab("commuters")}
        >
          Commuters
        </button>
        <button
          className={`admin-users-tab ${activeTab === "corporates" ? "active" : ""}`}
          onClick={() => setActiveTab("corporates")}
        >
          Corporates
        </button>
      </div>

      <div className="admin-users-grid">
        {filteredData.map((user) => (
          <div key={user.id} className="admin-user-card">
            <div className="admin-user-card-header">
              <div className={`admin-user-avatar admin-user-avatar-${user.initial.toLowerCase()}`}>{user.initial}</div>
              <div className="admin-user-info">
                <h3 className="admin-user-name">{user.name}</h3>
                <p className="admin-user-type">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {user.type}
                </p>
              </div>
              <span className={`admin-user-status admin-user-status-${user.status.toLowerCase()}`}>{user.status}</span>
            </div>
            <div className="admin-user-card-body">
              <div className="admin-user-route">
                <div className="admin-user-route-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <span className="admin-user-route-label">From:</span>
                    <span className="admin-user-route-value">{user.from}</span>
                  </div>
                </div>
                <div className="admin-user-route-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <span className="admin-user-route-label">To:</span>
                    <span className="admin-user-route-value">{user.to}</span>
                  </div>
                </div>
                <div className="admin-user-route-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="admin-user-route-value">{user.time}</span>
                </div>
              </div>
            </div>
            <div className="admin-user-card-footer">
              <span className="admin-user-req-id">Req ID: {user.id}</span>
              <button className="admin-user-view-btn" onClick={() => handleViewDetails(user)}>
                View Full Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {showDetailsModal && <AdminUserDetailsModal user={selectedUser} onClose={() => setShowDetailsModal(false)} />}
    </div>
  )
}

export default AdminUsers

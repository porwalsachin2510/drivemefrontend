"use client"

import { useState } from "react"
import "./AdminServiceProviders.css"

function AdminServiceProviders() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const providers = [
    {
      id: 1,
      name: "Mariam Kumar",
      providerId: "PRO-1001",
      email: "provider3@example.com",
      phone: "+965 95473133",
      rating: 4.1,
      status: "active",
    },
    {
      id: 2,
      name: "Omar Smith",
      providerId: "PRO-1002",
      email: "provider5@example.com",
      phone: "+965 85123281",
      rating: 3.9,
      status: "active",
    },
    {
      id: 3,
      name: "Yousef Kumar",
      providerId: "PRO-1003",
      email: "provider3@example.com",
      phone: "+965 95406053",
      rating: 4.9,
      status: "active",
    },
    {
      id: 4,
      name: "Yousef Al-Ali",
      providerId: "PRO-1004",
      email: "provider4@example.com",
      phone: "+965 94488776",
      rating: 3.6,
      status: "active",
    },
    {
      id: 5,
      name: "Zainab Al-Otaibi",
      providerId: "PRO-1005",
      email: "provider5@example.com",
      phone: "+965 85269078",
      rating: 5.0,
      status: "active",
    },
    {
      id: 6,
      name: "Mariam Al-Rashid",
      providerId: "PRO-1006",
      email: "provider6@example.com",
      phone: "+965 84133939",
      rating: 3.7,
      status: "pending",
    },
    {
      id: 7,
      name: "Mohammed Smith",
      providerId: "PRO-1007",
      email: "provider7@example.com",
      phone: "+965 91145335",
      rating: 4.0,
      status: "suspended",
    },
  ]

  const filteredProviders = providers.filter((provider) => {
    const matchesStatus = statusFilter === "all" || provider.status === statusFilter
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="ad-dash-service-providers">
      <div className="ad-dash-sp-controls">
        <div className="ad-dash-sp-search">
          <input
            type="text"
            placeholder="Search provider name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ad-dash-sp-search-input"
          />
        </div>
        <div className="ad-dash-sp-filters">
          <button
            className={`ad-dash-sp-filter ${statusFilter === "all" ? "ad-dash-sp-filter-active" : ""}`}
            onClick={() => setStatusFilter("all")}
          >
            All
          </button>
          <button
            className={`ad-dash-sp-filter ad-dash-sp-filter-green ${statusFilter === "active" ? "ad-dash-sp-filter-active" : ""}`}
            onClick={() => setStatusFilter("active")}
          >
            Active
          </button>
          <button
            className={`ad-dash-sp-filter ${statusFilter === "pending" ? "ad-dash-sp-filter-active" : ""}`}
            onClick={() => setStatusFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`ad-dash-sp-filter ${statusFilter === "suspended" ? "ad-dash-sp-filter-active" : ""}`}
            onClick={() => setStatusFilter("suspended")}
          >
            Suspended
          </button>
        </div>
      </div>

      <div className="ad-dash-sp-table-container">
        <table className="ad-dash-sp-table">
          <thead>
            <tr>
              <th>Provider Details</th>
              <th>Contact</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProviders.map((provider) => (
              <tr key={provider.id}>
                <td>
                  <div className="ad-dash-sp-provider-info">
                    <div className="ad-dash-sp-provider-name">{provider.name}</div>
                    <div className="ad-dash-sp-provider-id">ID: {provider.providerId}</div>
                  </div>
                </td>
                <td>
                  <div className="ad-dash-sp-contact">
                    <div>{provider.email}</div>
                    <div className="ad-dash-sp-phone">{provider.phone}</div>
                  </div>
                </td>
                <td>
                  <div className="ad-dash-sp-rating">
                    <span className="ad-dash-sp-star">⭐</span>
                    <span>{provider.rating}</span>
                  </div>
                </td>
                <td>
                  <span className={`ad-dash-sp-status ad-dash-sp-status-${provider.status}`}>
                    {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                  </span>
                </td>
                <td>
                  <button className="ad-dash-sp-action-btn ad-dash-sp-suspend">Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminServiceProviders

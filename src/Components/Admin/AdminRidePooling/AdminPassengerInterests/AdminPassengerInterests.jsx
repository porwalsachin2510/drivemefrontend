"use client"

import { useState } from "react"
import "./AdminPassengerInterests.css"

const AdminPassengerInterests = () => {
  const [requests] = useState([
    {
      id: 1,
      commuter: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5014: Salmiya Loop",
      provider: "KGL Transport",
      requestedAt: "12/10/2025",
      status: "CONFIRMED",
    },
    {
      id: 2,
      commuter: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5016: Khaitan Loop",
      provider: "Raha Logistics",
      requestedAt: "12/10/2025",
      status: "REJECTED",
    },
    {
      id: 3,
      commuter: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5000: Jahra Loop",
      provider: "KGL Transport",
      requestedAt: "12/12/2025",
      status: "PENDING",
      showActions: true,
    },
    {
      id: 4,
      commuter: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5001: Hawally Loop",
      provider: "KGL Transport",
      requestedAt: "12/12/2025",
      status: "PENDING",
      showActions: true,
    },
    {
      id: 5,
      commuter: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5004: Farwaniya Loop",
      provider: "Careem Bus",
      requestedAt: "12/12/2025",
      status: "PENDING",
      showActions: true,
    },
    {
      id: 6,
      commuter: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5003: Kuwait City Loop",
      provider: "Gulf Transport",
      requestedAt: "12/12/2025",
      status: "PENDING",
      showActions: true,
    },
    {
      id: 7,
      commuter: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5002: Salwa Loop",
      provider: "KGL Transport",
      requestedAt: "12/12/2025",
      status: "PENDING",
      showActions: true,
    },
    {
      id: 8,
      commuter: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5018: Salmiya Loop",
      provider: "Royal Fleets",
      requestedAt: "12/12/2025",
      status: "PENDING",
      showActions: true,
    },
    {
      id: 9,
      commuter: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5017: Fahaheel Loop",
      provider: "Careem Bus",
      requestedAt: "12/12/2025",
      status: "PENDING",
      showActions: true,
    },
    {
      id: 10,
      commuter: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5019: Jahra Loop",
      provider: "Kuwait Express",
      requestedAt: "12/12/2025",
      status: "PENDING",
      showActions: true,
    },
  ])

  const handleApprove = (requestId) => {
    console.log("[v0] Approving request:", requestId)
  }

  const handleReject = (requestId) => {
    console.log("[v0] Rejecting request:", requestId)
  }

  return (
    <div className="ad-dash-passenger-interests">
      <div className="ad-dash-passenger-interests-header">
        <div className="ad-dash-passenger-interests-icon-wrapper">
          <svg className="ad-dash-passenger-interests-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span>Route Join Requests</span>
        </div>
        <span className="ad-dash-passenger-interests-count">8 Pending</span>
      </div>

      <div className="ad-dash-passenger-interests-table-container">
        <table className="ad-dash-passenger-interests-table">
          <thead>
            <tr>
              <th>Commuter</th>
              <th>Route</th>
              <th>Provider</th>
              <th>Requested At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>
                  <div className="ad-dash-passenger-interests-commuter">
                    <div className="ad-dash-passenger-interests-name">{request.commuter}</div>
                    <div className="ad-dash-passenger-interests-email">{request.email}</div>
                  </div>
                </td>
                <td>
                  <div className="ad-dash-passenger-interests-route">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="10" r="3" />
                      <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
                    </svg>
                    {request.route}
                  </div>
                </td>
                <td>{request.provider}</td>
                <td>{request.requestedAt}</td>
                <td>
                  <span
                    className={`ad-dash-passenger-interests-status ad-dash-passenger-interests-status-${request.status.toLowerCase()}`}
                  >
                    {request.status}
                  </span>
                </td>
                <td>
                  {request.showActions ? (
                    <div className="ad-dash-passenger-interests-actions">
                      <button
                        className="ad-dash-passenger-interests-approve-btn"
                        onClick={() => handleApprove(request.id)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </button>
                      <button
                        className="ad-dash-passenger-interests-reject-btn"
                        onClick={() => handleReject(request.id)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <span className="ad-dash-passenger-interests-no-action">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPassengerInterests

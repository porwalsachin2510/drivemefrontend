"use client"

import { useState } from "react"
import "./AdminPassengersReassignments.css"
import AdminReassignModal from "../AdminReassignModal/AdminReassignModal"

const AdminPassengersReassignments = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPassenger, setSelectedPassenger] = useState(null)
  const [showReassignModal, setShowReassignModal] = useState(false)

  const passengers = [
    {
      id: 1,
      name: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5014: Salmiya Loop",
      provider: "KGL Transport",
      status: "confirmed",
    },
    {
      id: 2,
      name: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5016: Khaitan Loop",
      provider: "Raha Logistics",
      status: "rejected",
    },
    {
      id: 3,
      name: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5000: Jahra Loop",
      provider: "KGL Transport",
      status: "pending",
    },
    {
      id: 4,
      name: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5001: Hawally Loop",
      provider: "KGL Transport",
      status: "pending",
    },
    {
      id: 5,
      name: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5004: Farwaniya Loop",
      provider: "Careem Bus",
      status: "pending",
    },
    {
      id: 6,
      name: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5003: Kuwait City Loop",
      provider: "Gulf Transport",
      status: "pending",
    },
    {
      id: 7,
      name: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5002: Salwa Loop",
      provider: "KGL Transport",
      status: "pending",
    },
    {
      id: 8,
      name: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5018: Salmiya Loop",
      provider: "Royal Fleets",
      status: "pending",
    },
    {
      id: 9,
      name: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5017: Fahaheel Loop",
      provider: "Careem Bus",
      status: "pending",
    },
    {
      id: 10,
      name: "Test Passenger",
      email: "passenger@driveme.com",
      route: "Route 5019: Jahra Loop",
      provider: "Kuwait Express",
      status: "pending",
    },
  ]

  const handleReassign = (passenger) => {
    setSelectedPassenger(passenger)
    setShowReassignModal(true)
  }

  const handleRefresh = () => {
    console.log("[v0] Refreshing passengers data")
  }

  return (
    <div className="ad-dash-passengers-reassignments">
      <div className="ad-dash-passengers-search-bar">
        <div className="ad-dash-passengers-search-input-wrapper">
          <svg className="ad-dash-passengers-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search passenger, email, or route..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ad-dash-passengers-search-input"
          />
        </div>
        <button className="ad-dash-passengers-refresh-btn" onClick={handleRefresh}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
          </svg>
          Refresh
        </button>
      </div>

      <div className="ad-dash-passengers-table-container">
        <table className="ad-dash-passengers-table">
          <thead>
            <tr>
              <th>Passenger</th>
              <th>Current Route</th>
              <th>Service Provider</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((passenger) => (
              <tr key={passenger.id}>
                <td>
                  <div className="ad-dash-passengers-info">
                    <div className="ad-dash-passengers-name">{passenger.name}</div>
                    <div className="ad-dash-passengers-email">{passenger.email}</div>
                  </div>
                </td>
                <td>
                  <div className="ad-dash-passengers-route">
                    <svg
                      className="ad-dash-passengers-route-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="10" r="3" />
                      <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
                    </svg>
                    {passenger.route}
                  </div>
                </td>
                <td>{passenger.provider}</td>
                <td>
                  <span className={`ad-dash-passengers-status ad-dash-passengers-status-${passenger.status}`}>
                    {passenger.status}
                  </span>
                </td>
                <td>
                  <button className="ad-dash-passengers-reassign-btn" onClick={() => handleReassign(passenger)}>
                    Reassign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showReassignModal && (
        <AdminReassignModal passenger={selectedPassenger} onClose={() => setShowReassignModal(false)} />
      )}
    </div>
  )
}

export default AdminPassengersReassignments

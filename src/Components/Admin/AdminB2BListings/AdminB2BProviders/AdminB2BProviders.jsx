"use client"

import { useState } from "react"
import "./AdminB2BProviders.css"
import AdminB2BProviderViewModal from "./AdminB2BProviderViewModal/AdminB2BProviderViewModal"
import AdminChatModal from "./AdminChatModal/AdminChatModal"

const AdminB2BProviders = () => {
  const [showViewModal, setShowViewModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [providers, setProviders] = useState([
    {
      id: 1,
      name: "Gulf Transport Fleet",
      initial: "G",
      fleetSize: "8 Vehicles",
      contact: "sales@gulftransport.com",
      phone: "+965 55112233",
      joinDate: "2023-11-02",
      status: "Pending",
      rating: 4.9,
      vehicles: [
        {
          type: "Bus",
          model: "Toyota Coaster",
          year: 2023,
          capacity: "22 Seats",
          count: 5,
        },
        {
          type: "Luxury Van",
          model: "Mercedes Sprinter",
          year: 2022,
          capacity: "12 Seats",
          count: 3,
        },
      ],
    },
    {
      id: 2,
      name: "Kuwait Logistics",
      initial: "K",
      fleetSize: "10 Vehicles",
      contact: "admin@kwlogistics.com",
      phone: "+965 99221100",
      joinDate: "2023-10-20",
      status: "More Details Requested",
      rating: 4.5,
      vehicles: [],
    },
  ])

  const handleView = (provider) => {
    setSelectedProvider(provider)
    setShowViewModal(true)
  }

  const handleChat = (provider) => {
    setSelectedProvider(provider)
    setShowChatModal(true)
  }

  const handleApprove = (providerId) => {
    setProviders((prev) => prev.map((p) => (p.id === providerId ? { ...p, status: "Approved" } : p)))
    setShowViewModal(false)
  }

  const handleReject = (providerId) => {
    setProviders((prev) => prev.map((p) => (p.id === providerId ? { ...p, status: "Rejected" } : p)))
    setShowViewModal(false)
  }

  const handleRequestMoreDetails = (providerId) => {
    setProviders((prev) => prev.map((p) => (p.id === providerId ? { ...p, status: "More Details Requested" } : p)))
    setShowViewModal(false)
  }

  return (
    <div className="ad-dash-b2b-providers">
      <div className="ad-dash-b2b-providers-table-container">
        <table className="ad-dash-b2b-providers-table">
          <thead>
            <tr>
              <th>Provider</th>
              <th>Fleet Size</th>
              <th>Contact</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider.id}>
                <td>
                  <div className="ad-dash-b2b-providers-provider-info">
                    <div className="ad-dash-b2b-providers-avatar">{provider.initial}</div>
                    <span className="ad-dash-b2b-providers-name">{provider.name}</span>
                  </div>
                </td>
                <td>
                  <div className="ad-dash-b2b-providers-fleet">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9 17H7A5 5 0 0 1 7 7h2" />
                      <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    {provider.fleetSize}
                  </div>
                </td>
                <td>
                  <div className="ad-dash-b2b-providers-contact">
                    <div>{provider.contact}</div>
                    <div className="ad-dash-b2b-providers-phone">{provider.phone}</div>
                  </div>
                </td>
                <td>{provider.joinDate}</td>
                <td>
                  <span
                    className={`ad-dash-b2b-providers-status ad-dash-b2b-providers-status-${provider.status.toLowerCase().replace(/ /g, "-")}`}
                  >
                    {provider.status}
                  </span>
                </td>
                <td>
                  <div className="ad-dash-b2b-providers-actions">
                    <button
                      className="ad-dash-b2b-providers-action-btn ad-dash-b2b-providers-view-btn"
                      onClick={() => handleView(provider)}
                      title="View"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    {provider.status === "Pending" && (
                      <>
                        <button
                          className="ad-dash-b2b-providers-action-btn ad-dash-b2b-providers-approve-btn"
                          onClick={() => handleApprove(provider.id)}
                          title="Approve"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </button>
                        <button
                          className="ad-dash-b2b-providers-action-btn ad-dash-b2b-providers-reject-btn"
                          onClick={() => handleReject(provider.id)}
                          title="Reject"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                        <button
                          className="ad-dash-b2b-providers-action-btn ad-dash-b2b-providers-chat-btn"
                          onClick={() => handleChat(provider)}
                          title="Request More Details"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showViewModal && selectedProvider && (
        <AdminB2BProviderViewModal
          provider={selectedProvider}
          onClose={() => setShowViewModal(false)}
          onApprove={handleApprove}
          onReject={handleReject}
          onRequestInfo={handleRequestMoreDetails}
        />
      )}

      {showChatModal && selectedProvider && (
        <AdminChatModal provider={selectedProvider} onClose={() => setShowChatModal(false)} />
      )}
    </div>
  )
}

export default AdminB2BProviders

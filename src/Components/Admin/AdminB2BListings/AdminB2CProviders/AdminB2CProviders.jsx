"use client"

import { useState } from "react"
import "./AdminB2CProviders.css"
import AdminProviderViewModal from "./AdminProviderViewModal/AdminProviderViewModal"
import AdminChatModal from "./AdminChatModal/AdminChatModal"

const AdminB2CProviders = () => {
  const [showViewModal, setShowViewModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [providers, setProviders] = useState([
    {
      id: 1,
      name: "Fast Commute Co.",
      initial: "F",
      routesActive: "2 Routes",
      contact: "contact@fastcommute.com",
      phone: "+965 99887766",
      joinDate: "2023-10-15",
      status: "Pending",
      routes: [
        {
          from: "Salmiya",
          to: "Kuwait City",
          inTime: "06:30",
          outTime: "17:30",
          oneWayPrice: 30,
          roundPrice: 55,
          driver: {
            name: "Ahmed Ali",
            nationality: "Egyptian",
            experience: "5 yrs exp",
            license: "LIC-99283",
          },
          seats: { total: 14, filled: 4 },
        },
        {
          from: "Hawally",
          to: "Shuwaikh",
          inTime: "07:00",
          outTime: "16:00",
          oneWayPrice: 25,
          roundPrice: 45,
          driver: {
            name: "John Doe",
            nationality: "Indian",
            experience: "3 yrs exp",
            license: "LIC-11223",
          },
          seats: { total: 14, filled: 10 },
        },
      ],
    },
    {
      id: 2,
      name: "City Link Express",
      initial: "C",
      routesActive: "1 Routes",
      contact: "info@citylink.kw",
      phone: "+965 66554433",
      joinDate: "2023-09-01",
      status: "Approved",
      routes: [],
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
    console.log("[v0] Approving provider:", providerId)
    setProviders((prev) => prev.map((p) => (p.id === providerId ? { ...p, status: "Approved" } : p)))
    setShowViewModal(false)
  }

  const handleReject = (providerId) => {
    console.log("[v0] Rejecting provider:", providerId)
    setProviders((prev) => prev.map((p) => (p.id === providerId ? { ...p, status: "Rejected" } : p)))
    setShowViewModal(false)
  }

  const handleRequestMoreDetails = (providerId) => {
    console.log("[v0] Requesting more details from provider:", providerId)
    setProviders((prev) => prev.map((p) => (p.id === providerId ? { ...p, status: "More Details Requested" } : p)))
    setShowViewModal(false)
  }

  return (
    <div className="ad-dash-b2c-providers">
      <div className="ad-dash-b2c-providers-table-container">
        <table className="ad-dash-b2c-providers-table">
          <thead>
            <tr>
              <th>Provider</th>
              <th>Routes Active</th>
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
                  <div className="ad-dash-b2c-providers-provider-info">
                    <div className="ad-dash-b2c-providers-avatar">{provider.initial}</div>
                    <span className="ad-dash-b2c-providers-name">{provider.name}</span>
                  </div>
                </td>
                <td>
                  <div className="ad-dash-b2c-providers-routes">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="10" r="3" />
                      <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
                    </svg>
                    {provider.routesActive}
                  </div>
                </td>
                <td>
                  <div className="ad-dash-b2c-providers-contact">
                    <div>{provider.contact}</div>
                    <div className="ad-dash-b2c-providers-phone">{provider.phone}</div>
                  </div>
                </td>
                <td>{provider.joinDate}</td>
                <td>
                  <span
                    className={`ad-dash-b2c-providers-status ad-dash-b2c-providers-status-${provider.status.toLowerCase().replace(/ /g, "-")}`}
                  >
                    {provider.status}
                  </span>
                </td>
                <td>
                  <div className="ad-dash-b2c-providers-actions">
                    <button
                      className="ad-dash-b2c-providers-action-btn ad-dash-b2c-providers-view-btn"
                      onClick={() => handleView(provider)}
                      title="View Details"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    {provider.status === "Pending" && (
                      <>
                        <button
                          className="ad-dash-b2c-providers-action-btn ad-dash-b2c-providers-approve-btn"
                          onClick={() => handleApprove(provider.id)}
                          title="Approve"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </button>
                        <button
                          className="ad-dash-b2c-providers-action-btn ad-dash-b2c-providers-reject-btn"
                          onClick={() => handleReject(provider.id)}
                          title="Reject"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                        <button
                          className="ad-dash-b2c-providers-action-btn ad-dash-b2c-providers-details-btn"
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

      {showViewModal && (
        <AdminProviderViewModal
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

export default AdminB2CProviders

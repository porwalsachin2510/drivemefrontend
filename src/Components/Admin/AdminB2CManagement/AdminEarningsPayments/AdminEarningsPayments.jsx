"use client"

import { useState } from "react"
import "./AdminEarningsPayments.css"
import AdminReleaseModal from "../AdminReleaseModal/AdminReleaseModal"
import AdminHoldModal from "../AdminHoldModal/AdminHoldModal"

const AdminEarningsPayments = () => {
  const [showReleaseModal, setShowReleaseModal] = useState(false)
  const [showHoldModal, setShowHoldModal] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [expandedHistory, setExpandedHistory] = useState(null)

  const providers = [
    { id: 1, name: "Raha Logistics", released: "3489.858", held: "0.000", balance: "0.000" },
    { id: 2, name: "Careem Bus", released: "1659.029", held: "0.000", balance: "1677.397" },
    { id: 3, name: "Kuwait Express", released: "1518.651", held: "0.000", balance: "562.638" },
    { id: 4, name: "KGL Transport", released: "2049.012", held: "0.000", balance: "0.000" },
    { id: 5, name: "Gulf Transport", released: "75.848", held: "0.000", balance: "1232.231" },
    { id: 6, name: "City Bus", released: "47.527", held: "0.000", balance: "29.447" },
    { id: 7, name: "Royal Fleets", released: "768.448", held: "0.000", balance: "0.000" },
  ]

  const transactionHistory = [
    {
      id: 1,
      date: "9/18/2025, 5:30:00 AM",
      action: "Earnings",
      details: "Monthly Pass: Fahaheel to Khaitan",
      amount: "20.140",
      status: "Paid",
    },
    {
      id: 2,
      date: "4/9/2024, 5:30:00 AM",
      action: "Earnings",
      details: "Monthly Pass: Khaitan to Hawally",
      amount: "20.982",
      status: "Pending",
    },
  ]

  const handleRelease = (provider) => {
    setSelectedProvider(provider)
    setShowReleaseModal(true)
  }

  const handleHold = (provider) => {
    setSelectedProvider(provider)
    setShowHoldModal(true)
  }

  const toggleHistory = (providerId) => {
    setExpandedHistory(expandedHistory === providerId ? null : providerId)
  }

  return (
    <div className="ad-dash-earnings-payments">
      <div className="ad-dash-earnings-grid">
        {providers.map((provider) => (
          <div key={provider.id} className="ad-dash-earnings-card">
            <div className="ad-dash-earnings-card-header">
              <h3>{provider.name}</h3>
              <button className="ad-dash-earnings-history-btn" onClick={() => toggleHistory(provider.id)}>
                Tap for history
              </button>
            </div>

            <div className="ad-dash-earnings-stats">
              <div className="ad-dash-earnings-stat">
                <span className="ad-dash-earnings-stat-label">RELEASED</span>
                <span className="ad-dash-earnings-stat-value ad-dash-earnings-stat-released">
                  {provider.released} KWD
                </span>
              </div>
              <div className="ad-dash-earnings-stat">
                <span className="ad-dash-earnings-stat-label">HELD</span>
                <span className="ad-dash-earnings-stat-value ad-dash-earnings-stat-held">{provider.held} KWD</span>
              </div>
              <div className="ad-dash-earnings-stat">
                <span className="ad-dash-earnings-stat-label">BALANCE</span>
                <span className="ad-dash-earnings-stat-value ad-dash-earnings-stat-balance">
                  {provider.balance} KWD
                </span>
              </div>
            </div>

            <div className="ad-dash-earnings-actions">
              <button className="ad-dash-earnings-release-btn" onClick={() => handleRelease(provider)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M7 17L17 7M17 7H8M17 7V16" />
                </svg>
                Release
              </button>
              <button className="ad-dash-earnings-hold-btn" onClick={() => handleHold(provider)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" />
                </svg>
                Hold
              </button>
            </div>

            {expandedHistory === provider.id && (
              <div className="ad-dash-earnings-history">
                <div className="ad-dash-earnings-history-header">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  Transaction History: {provider.name}
                </div>
                <table className="ad-dash-earnings-history-table">
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Action</th>
                      <th>Details</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistory.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>{transaction.date}</td>
                        <td>
                          <span className="ad-dash-earnings-action-badge">{transaction.action}</span>
                        </td>
                        <td>{transaction.details}</td>
                        <td className="ad-dash-earnings-amount">{transaction.amount} KWD</td>
                        <td>
                          <span
                            className={`ad-dash-earnings-status ad-dash-earnings-status-${transaction.status.toLowerCase()}`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {showReleaseModal && <AdminReleaseModal provider={selectedProvider} onClose={() => setShowReleaseModal(false)} />}

      {showHoldModal && <AdminHoldModal provider={selectedProvider} onClose={() => setShowHoldModal(false)} />}
    </div>
  )
}

export default AdminEarningsPayments

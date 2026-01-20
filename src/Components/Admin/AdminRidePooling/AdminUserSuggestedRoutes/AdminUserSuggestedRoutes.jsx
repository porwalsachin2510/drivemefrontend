"use client"

import { useState } from "react"
import "./AdminUserSuggestedRoutes.css"

const AdminUserSuggestedRoutes = () => {
  const [suggestions] = useState([
    {
      id: 1,
      time: "21:09",
      interested: true,
      status: "approved",
      days: ["MON"],
    },
    {
      id: 2,
      time: "15:32",
      interested: true,
      status: "rejected",
      days: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    },
    {
      id: 3,
      time: "18:38",
      interested: true,
      status: "pending",
      days: ["SUN", "MON", "TUE", "WED", "FRI", "THU", "SAT"],
    },
  ])

  const handleApprove = (suggestionId) => {
    console.log("[v0] Approving suggestion:", suggestionId)
  }

  const handleReject = (suggestionId) => {
    console.log("[v0] Rejecting suggestion:", suggestionId)
  }

  return (
    <div className="ad-dash-user-suggested-routes">
      <div className="ad-dash-user-suggested-routes-header">
        <div className="ad-dash-user-suggested-routes-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
          </svg>
          <span>New Route Suggestions</span>
        </div>
      </div>

      <div className="ad-dash-user-suggested-routes-list">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="ad-dash-user-suggested-routes-card">
            <div className="ad-dash-user-suggested-routes-card-header">
              <div className="ad-dash-user-suggested-routes-route-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <span
                className={`ad-dash-user-suggested-routes-status ad-dash-user-suggested-routes-status-${suggestion.status}`}
              >
                {suggestion.status.charAt(0).toUpperCase() + suggestion.status.slice(1)}
              </span>
            </div>

            <div className="ad-dash-user-suggested-routes-info">
              <div className="ad-dash-user-suggested-routes-info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {suggestion.time}
              </div>
              <div className="ad-dash-user-suggested-routes-info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Interested
              </div>
              <div className="ad-dash-user-suggested-routes-info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  {suggestion.status === "approved" ? (
                    <polyline points="12 6 12 12 16 14"></polyline>
                  ) : suggestion.status === "rejected" ? (
                    <>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </>
                  ) : (
                    <polyline points="12 6 12 12 16 14"></polyline>
                  )}
                </svg>
                {suggestion.status}
              </div>
            </div>

            {suggestion.days.length > 0 && (
              <div className="ad-dash-user-suggested-routes-days">
                {suggestion.days.map((day) => (
                  <span key={day} className="ad-dash-user-suggested-routes-day">
                    {day}
                  </span>
                ))}
              </div>
            )}

            {suggestion.status === "pending" && (
              <div className="ad-dash-user-suggested-routes-actions">
                <button
                  className="ad-dash-user-suggested-routes-approve-btn"
                  onClick={() => handleApprove(suggestion.id)}
                >
                  Approve & Create
                </button>
                <button
                  className="ad-dash-user-suggested-routes-reject-btn"
                  onClick={() => handleReject(suggestion.id)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminUserSuggestedRoutes

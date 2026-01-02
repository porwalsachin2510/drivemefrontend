"use client"

import { useState } from "react"
import "./AdminTagsBadges.css"
import AdminCreateTagModal from "./AdminCreateTagModal/AdminCreateTagModal"

function AdminTagsBadges() {
  const [hoveredTag, setHoveredTag] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const tags = [
    { id: 1, label: "Budget Friendly", color: "#d1fae5", textColor: "#065f46", icon: "🏷️" },
    { id: 2, label: "AC Vehicle", color: "#dbeafe", textColor: "#1e40af", icon: "🏷️" },
    { id: 3, label: "WiFi Available", color: "#e9d5ff", textColor: "#6b21a8", icon: "🏷️" },
    { id: 4, label: "Premium", color: "#fef3c7", textColor: "#92400e", icon: "🏷️" },
    { id: 5, label: "Ladies Only", color: "#fce7f3", textColor: "#9f1239", icon: "🏷️" },
    { id: 6, label: "Express", color: "#fee2e2", textColor: "#991b1b", icon: "🏷️" },
  ]

  return (
    <div className="ad-dash-tags-badges">
      <div className="ad-dash-tb-header">
        <div>
          <h3 className="ad-dash-tb-title">Global Tags</h3>
          <p className="ad-dash-tb-subtitle">Manage reusable badges for routes and services.</p>
        </div>
        <button className="ad-dash-tb-create-btn" onClick={() => setShowCreateModal(true)}>
          <span>➕</span> Create Tag
        </button>
      </div>

      <div className="ad-dash-tb-grid">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="ad-dash-tb-tag-card"
            onMouseEnter={() => setHoveredTag(tag.id)}
            onMouseLeave={() => setHoveredTag(null)}
          >
            <div className="ad-dash-tb-tag-content">
              <span className="ad-dash-tb-tag-icon">{tag.icon}</span>
              <span
                className="ad-dash-tb-tag-label"
                style={{
                  backgroundColor: tag.color,
                  color: tag.textColor,
                }}
              >
                {tag.label}
              </span>
            </div>
            {hoveredTag === tag.id && (
              <div className="ad-dash-tb-tag-actions">
                <button className="ad-dash-tb-action-btn ad-dash-tb-edit">✏️</button>
                <button className="ad-dash-tb-action-btn ad-dash-tb-delete">🗑️</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showCreateModal && <AdminCreateTagModal onClose={() => setShowCreateModal(false)} />}
    </div>
  )
}

export default AdminTagsBadges

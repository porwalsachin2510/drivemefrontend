"use client"

import { useState } from "react"
import "./AdminAds.css"

function AdminAds() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  const [formData, setFormData] = useState({
    title: "",
    provider: "",
    placement: "top",
    size: "728x90",
    imageUrl: "",
    startDate: "",
    endDate: "",
    status: "active",
  })

  const campaigns = [
    {
      id: 1,
      preview: "/placeholder.svg?height=90&width=160",
      title: "Summer Special Discount",
      provider: "Kuwait Express",
      placement: "top",
      size: "728×90",
      views: 12602,
      clicks: 450,
      status: "Active",
      startDate: "2023-11-01",
      endDate: "2023-12-31",
      imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    },
    {
      id: 2,
      preview: "/placeholder.svg?height=90&width=160",
      title: "New Route Launch: Jahra",
      provider: "City Bus",
      placement: "sidebar",
      size: "120×60",
      views: 45154,
      clicks: 1200,
      status: "Active",
      startDate: "2023-11-15",
      endDate: "2024-01-15",
      imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957",
    },
    {
      id: 3,
      preview: "/placeholder.svg?height=90&width=160",
      title: "Luxury VIP Transport",
      provider: "Royal Fleets",
      placement: "bottom",
      size: "728×90",
      views: 8102,
      clicks: 200,
      status: "Active",
      startDate: "2023-12-01",
      endDate: "2023-12-25",
      imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    },
    {
      id: 4,
      preview: "/placeholder.svg?height=90&width=160",
      title: "5G Everywhere",
      provider: "Zain",
      placement: "sidebar",
      size: "120×60",
      views: 32152,
      clicks: 890,
      status: "Active",
      startDate: "2023-10-01",
      endDate: "2024-10-01",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCreateCampaign = () => {
    console.log("Creating campaign:", formData)
    setShowCreateModal(false)
    // Reset form
    setFormData({
      title: "",
      provider: "",
      placement: "top",
      size: "728x90",
      imageUrl: "",
      startDate: "",
      endDate: "",
      status: "active",
    })
  }

  const handleEditClick = (campaign) => {
    setSelectedCampaign(campaign)
    setFormData({
      title: campaign.title,
      provider: campaign.provider,
      placement: campaign.placement.toLowerCase(),
      size: campaign.size.replace("×", "x"),
      imageUrl: campaign.imageUrl || "",
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      status: campaign.status.toLowerCase(),
    })
    setShowEditModal(true)
  }

  const handleUpdateCampaign = () => {
    console.log("Updating campaign:", formData)
    setShowEditModal(false)
    setSelectedCampaign(null)
  }

  const handleDeleteClick = (campaignId) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      console.log("Deleting campaign:", campaignId)
    }
  }

  return (
    <div className="admin-ads">
      <div className="ads-header">
        <div className="ads-header-content">
          <h2>Ad Campaign Manager</h2>
          <p>Manage provider promotions, banners, and sidebar ads.</p>
        </div>
        <button className="create-campaign-btn" onClick={() => setShowCreateModal(true)}>
          <span className="plus-icon">+</span> Create Campaign
        </button>
      </div>

      <div className="campaigns-section">
        <div className="campaigns-header">
          <h3>All Campaigns</h3>
          <span className="total-count">{campaigns.length} Total</span>
        </div>

        <div className="campaigns-table-container">
          <table className="campaigns-table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Campaign</th>
                <th>Placement</th>
                <th>Status</th>
                <th>Performance</th>
                <th>Dates</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td>
                    <img
                      src={campaign.preview || "/placeholder.svg"}
                      alt={campaign.title}
                      className="campaign-preview"
                    />
                  </td>
                  <td>
                    <div className="campaign-info">
                      <div className="campaign-title">{campaign.title}</div>
                      <div className="campaign-provider">{campaign.provider}</div>
                    </div>
                  </td>
                  <td>
                    <div className="placement-info">
                      <span className={`placement-badge placement-${campaign.placement}`}>{campaign.placement}</span>
                      <span className="size-text">{campaign.size}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge status-${campaign.status.toLowerCase()}`}>{campaign.status}</span>
                  </td>
                  <td>
                    <div className="performance-info">
                      <div className="performance-row">
                        <span className="performance-icon">👁️</span>
                        <span className="performance-value">{campaign.views.toLocaleString()}</span>
                      </div>
                      <div className="performance-row">
                        <span className="performance-icon">👆</span>
                        <span className="performance-value">{campaign.clicks.toLocaleString()}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="dates-info">
                      <div>Start: {campaign.startDate}</div>
                      <div>End: {campaign.endDate}</div>
                    </div>
                  </td>
                  <td>
                    <div className="action-icons">
                      <button className="action-icon edit-icon" title="Edit" onClick={() => handleEditClick(campaign)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M11.334 2.00004C11.5091 1.82494 11.7169 1.68605 11.9457 1.59129C12.1745 1.49653 12.4197 1.44775 12.6673 1.44775C12.9149 1.44775 13.1601 1.49653 13.3889 1.59129C13.6177 1.68605 13.8256 1.82494 14.0007 2.00004C14.1758 2.17513 14.3147 2.383 14.4094 2.61178C14.5042 2.84055 14.553 3.08575 14.553 3.33337C14.553 3.58099 14.5042 3.82619 14.4094 4.05497C14.3147 4.28374 14.1758 4.49161 14.0007 4.66671L5.00065 13.6667L1.33398 14.6667L2.33398 11L11.334 2.00004Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        className="action-icon delete-icon"
                        title="Delete"
                        onClick={() => handleDeleteClick(campaign.id)}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M2 4H3.33333H14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.33398 4.00004V2.66671C5.33398 2.31309 5.47446 1.97395 5.72451 1.7239C5.97456 1.47385 6.3137 1.33337 6.66732 1.33337H9.33398C9.68761 1.33337 10.0267 1.47385 10.2768 1.7239C10.5268 1.97395 10.6673 2.31309 10.6673 2.66671V4.00004M12.6673 4.00004V13.3334C12.6673 13.687 12.5268 14.0261 12.2768 14.2762C12.0267 14.5262 11.6876 14.6667 11.334 14.6667H4.66732C4.3137 14.6667 3.97456 14.5262 3.72451 14.2762C3.47446 14.0261 3.33398 13.687 3.33398 13.3334V4.00004H12.6673Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>New Ad Campaign</h3>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-form">
                <div className="modal-row">
                  <div className="modal-group">
                    <label>Campaign Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="e.g. Summer Sale"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="modal-group">
                    <label>Provider / Source</label>
                    <input
                      type="text"
                      name="provider"
                      placeholder="e.g. Kuwait Express"
                      value={formData.provider}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="modal-row">
                  <div className="modal-group">
                    <label>Placement</label>
                    <select name="placement" value={formData.placement} onChange={handleInputChange}>
                      <option value="top">Top Banner</option>
                      <option value="sidebar">Sidebar</option>
                      <option value="bottom">Bottom</option>
                    </select>
                  </div>
                  <div className="modal-group">
                    <label>Size</label>
                    <select name="size" value={formData.size} onChange={handleInputChange}>
                      <option value="728x90">728×90 (Leaderboard)</option>
                      <option value="300x250">300×250 (Medium Rectangle)</option>
                      <option value="120x60">120×60 (Small)</option>
                      <option value="160x600">160×600 (Skyscraper)</option>
                    </select>
                  </div>
                </div>

                <div className="modal-group">
                  <label>Ad Image</label>
                  <div className="image-input-wrapper">
                    <input
                      type="text"
                      name="imageUrl"
                      placeholder="https://..."
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                    />
                    <button className="upload-icon-btn">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.1673 6.66667L10.0007 2.5L5.83398 6.66667"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 2.5V12.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="modal-row">
                  <div className="modal-group">
                    <label>Start Date</label>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
                  </div>
                  <div className="modal-group">
                    <label>End Date</label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="modal-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-cancel-btn" onClick={() => setShowCreateModal(false)}>
                Cancel
              </button>
              <button className="modal-create-btn" onClick={handleCreateCampaign}>
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Campaign</h3>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-form">
                <div className="modal-row">
                  <div className="modal-group">
                    <label>Campaign Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="e.g. Summer Sale"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="modal-group">
                    <label>Provider / Source</label>
                    <input
                      type="text"
                      name="provider"
                      placeholder="e.g. Kuwait Express"
                      value={formData.provider}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="modal-row">
                  <div className="modal-group">
                    <label>Placement</label>
                    <select name="placement" value={formData.placement} onChange={handleInputChange}>
                      <option value="top">Top Banner</option>
                      <option value="sidebar">Sidebar</option>
                      <option value="bottom">Bottom</option>
                    </select>
                  </div>
                  <div className="modal-group">
                    <label>Size</label>
                    <select name="size" value={formData.size} onChange={handleInputChange}>
                      <option value="728x90">728×90 (Leaderboard)</option>
                      <option value="300x250">300×250 (Medium Rectangle)</option>
                      <option value="120x60">120×60 (Small)</option>
                      <option value="160x600">160×600 (Skyscraper)</option>
                    </select>
                  </div>
                </div>

                <div className="modal-group">
                  <label>Ad Image</label>
                  <div className="image-input-wrapper">
                    <input
                      type="text"
                      name="imageUrl"
                      placeholder="https://..."
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                    />
                    <button className="upload-icon-btn">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.1673 6.66667L10.0007 2.5L5.83398 6.66667"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 2.5V12.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  {formData.imageUrl && (
                    <div className="image-preview">
                      <img src={formData.imageUrl || "/placeholder.svg"} alt="Ad preview" />
                    </div>
                  )}
                </div>

                <div className="modal-row">
                  <div className="modal-group">
                    <label>Start Date</label>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
                  </div>
                  <div className="modal-group">
                    <label>End Date</label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="modal-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-cancel-btn" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="modal-create-btn" onClick={handleUpdateCampaign}>
                Update Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminAds

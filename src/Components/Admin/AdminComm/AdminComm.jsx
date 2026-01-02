"use client"

import { useState } from "react"
import "./AdminComm.css"

function AdminComm() {
  const [activeTab, setActiveTab] = useState("whatsapp")
  // const [showCreateModal, setShowCreateModal] = useState(false)

  // WhatsApp state
  const [selectedTemplate, setSelectedTemplate] = useState("promo")
  const [recipientNumber, setRecipientNumber] = useState("")
  const [whatsappMessage, setWhatsappMessage] = useState("")

  // Email state
  const [emailTemplate, setEmailTemplate] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")

  // Configuration state
  const [emailConfig, setEmailConfig] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    username: "admin@driveme.com",
    password: "••••••••••••",
    active: true,
  })

  const [whatsappConfig, setWhatsappConfig] = useState({
    accountSid: "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authToken: "••••••••••••••••••••••••",
    phoneNumber: "+14155238886",
    active: true,
  })

  const insertVariable = (variable) => {
    if (activeTab === "whatsapp") {
      setWhatsappMessage((prev) => prev + `{{${variable}}}`)
    } else if (activeTab === "email") {
      setEmailBody((prev) => prev + `{{${variable}}}`)
    }
  }

  const handleSendMessage = () => {
    console.log("Sending message...")
  }

  return (
    <div className="admin-comm">
      <div className="comm-header">
        <div className="comm-header-content">
          <div className="comm-icon">💬</div>
          <div>
            <h2>Communication Center</h2>
            <p>Manage email & WhatsApp notifications, templates, and history.</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="comm-tabs">
        <button
          className={`comm-tab ${activeTab === "whatsapp" ? "active" : ""}`}
          onClick={() => setActiveTab("whatsapp")}
        >
          <span className="tab-icon">📱</span> WhatsApp Manager
        </button>
        <button className={`comm-tab ${activeTab === "email" ? "active" : ""}`} onClick={() => setActiveTab("email")}>
          <span className="tab-icon">✉️</span> Email Manager
        </button>
        <button
          className={`comm-tab ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          <span className="tab-icon">🕐</span> Message History
        </button>
        <button className={`comm-tab ${activeTab === "config" ? "active" : ""}`} onClick={() => setActiveTab("config")}>
          <span className="tab-icon">⚙️</span> Configuration
        </button>
      </div>

      {/* Tab Content */}
      <div className="comm-tab-content">
        {activeTab === "whatsapp" && (
          <div className="whatsapp-manager">
            {/* Template Selection */}
            <div className="template-buttons">
              <button className="template-btn template-promo" onClick={() => setSelectedTemplate("promo")}>
                <span className="template-icon">📢</span> Send Promo
              </button>
              <button className="template-btn template-event" onClick={() => setSelectedTemplate("event")}>
                <span className="template-icon">📅</span> Event Alert
              </button>
              <button className="template-btn template-report" onClick={() => setSelectedTemplate("report")}>
                <span className="template-icon">📊</span> Monthly Report
              </button>
            </div>

            <div className="message-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Select Template</label>
                  <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
                    <option value="">Custom Message</option>
                    <option value="promo">Promotional Message</option>
                    <option value="event">Event Alert</option>
                    <option value="report">Monthly Report</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Recipient Number</label>
                  <input
                    type="text"
                    placeholder="+965 XXXXXXXX"
                    value={recipientNumber}
                    onChange={(e) => setRecipientNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>WhatsApp Message Body</label>
                <textarea
                  rows="8"
                  placeholder="Type your message here..."
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                ></textarea>
                <div className="variable-tags">
                  <button className="variable-tag" onClick={() => insertVariable("name")}>
                    {"{{name}}"}
                  </button>
                  <button className="variable-tag" onClick={() => insertVariable("route")}>
                    {"{{route}}"}
                  </button>
                  <button className="variable-tag" onClick={() => insertVariable("date")}>
                    {"{{date}}"}
                  </button>
                  <button className="variable-tag" onClick={() => insertVariable("amount")}>
                    {"{{amount}}"}
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <button className="send-message-btn" onClick={handleSendMessage}>
                  <span className="send-icon">📤</span> Send Message
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "email" && (
          <div className="email-manager">
            <div className="message-form">
              <div className="form-group">
                <label>Select Template</label>
                <select value={emailTemplate} onChange={(e) => setEmailTemplate(e.target.value)}>
                  <option value="">Custom Message</option>
                  <option value="welcome">Welcome Email</option>
                  <option value="booking">Booking Confirmation</option>
                  <option value="reminder">Payment Reminder</option>
                </select>
              </div>

              <div className="form-group">
                <label>Recipient Address</label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Subject Line</label>
                <input
                  type="text"
                  placeholder="Enter email subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email Message Body</label>
                <textarea
                  rows="10"
                  placeholder="Type your email message here..."
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                ></textarea>
                <div className="variable-tags">
                  <button className="variable-tag" onClick={() => insertVariable("name")}>
                    {"{{name}}"}
                  </button>
                  <button className="variable-tag" onClick={() => insertVariable("route")}>
                    {"{{route}}"}
                  </button>
                  <button className="variable-tag" onClick={() => insertVariable("date")}>
                    {"{{date}}"}
                  </button>
                  <button className="variable-tag" onClick={() => insertVariable("amount")}>
                    {"{{amount}}"}
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <button className="send-message-btn" onClick={handleSendMessage}>
                  <span className="send-icon">📤</span> Send Message
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="message-history">
            <div className="history-table-container">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Channel</th>
                    <th>Recipient</th>
                    <th>Type/Subject</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="5" className="empty-state">
                      No communication history yet.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "config" && (
          <div className="configuration">
            <div className="config-grid">
              {/* Email Configuration */}
              <div className="config-card">
                <div className="config-header">
                  <span className="config-icon">✉️</span>
                  <h3>Email (SMTP/IMAP)</h3>
                </div>

                <div className="config-form">
                  <div className="config-row">
                    <div className="config-group">
                      <label>SMTP Host</label>
                      <input
                        type="text"
                        value={emailConfig.smtpHost}
                        onChange={(e) => setEmailConfig({ ...emailConfig, smtpHost: e.target.value })}
                      />
                    </div>
                    <div className="config-group config-group-small">
                      <label>Port</label>
                      <input
                        type="text"
                        value={emailConfig.smtpPort}
                        onChange={(e) => setEmailConfig({ ...emailConfig, smtpPort: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="config-group">
                    <label>Username</label>
                    <input
                      type="text"
                      value={emailConfig.username}
                      onChange={(e) => setEmailConfig({ ...emailConfig, username: e.target.value })}
                    />
                  </div>

                  <div className="config-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={emailConfig.password}
                      onChange={(e) => setEmailConfig({ ...emailConfig, password: e.target.value })}
                    />
                  </div>

                  <div className="config-actions">
                    <div className="toggle-wrapper">
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={emailConfig.active}
                          onChange={(e) => setEmailConfig({ ...emailConfig, active: e.target.checked })}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                      <span className="toggle-label">Active</span>
                    </div>
                    <button className="save-config-btn">Save Configuration</button>
                  </div>
                </div>
              </div>

              {/* WhatsApp Configuration */}
              <div className="config-card">
                <div className="config-header">
                  <span className="config-icon">💬</span>
                  <h3>WhatsApp (Twilio API)</h3>
                </div>

                <div className="config-form">
                  <div className="config-group">
                    <label>Account SID</label>
                    <input
                      type="text"
                      value={whatsappConfig.accountSid}
                      onChange={(e) => setWhatsappConfig({ ...whatsappConfig, accountSid: e.target.value })}
                    />
                  </div>

                  <div className="config-group">
                    <label>Auth Token</label>
                    <input
                      type="password"
                      value={whatsappConfig.authToken}
                      onChange={(e) => setWhatsappConfig({ ...whatsappConfig, authToken: e.target.value })}
                    />
                  </div>

                  <div className="config-group">
                    <label>Twilio Phone Number</label>
                    <input
                      type="text"
                      value={whatsappConfig.phoneNumber}
                      onChange={(e) => setWhatsappConfig({ ...whatsappConfig, phoneNumber: e.target.value })}
                    />
                  </div>

                  <div className="config-actions">
                    <div className="toggle-wrapper">
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={whatsappConfig.active}
                          onChange={(e) => setWhatsappConfig({ ...whatsappConfig, active: e.target.checked })}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                      <span className="toggle-label">Active</span>
                    </div>
                    <button className="save-config-btn">Save Configuration</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminComm

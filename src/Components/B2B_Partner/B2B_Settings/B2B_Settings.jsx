"use client";

import { useState } from "react";
import "./b2b_settings.css";

function B2B_Settings() {
  const [formData, setFormData] = useState({
    companyName: "Royal Fleets Co.",
    tradeLicense: "TL-998877-KW",
    officeAddress: "Al-Hamra Tower, Floor 25, Kuwait City",
    email: "fleet@driveme.com",
    phone: "+965 2200 1100",
    website: "https://www.royalfleets.com.kw",
  });

  const [notifications, setNotifications] = useState({
    contracts: true,
    maintenance: true,
    drivers: true,
    marketing: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    console.log("Settings saved:", { formData, notifications });
    alert("Settings saved successfully!");
  };

  return (
    <div className="b2b-settings">
      <div className="b2b-settings-grid">
        <div className="b2b-settings-section">
          <div className="b2b-section-header">
            <div className="b2b-section-icon">🏢</div>
            <h2>Company Profile</h2>
          </div>

          <div className="b2b-form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </div>

          <div className="b2b-form-group">
            <label>Trade License Number</label>
            <input
              type="text"
              name="tradeLicense"
              value={formData.tradeLicense}
              onChange={handleInputChange}
            />
          </div>

          <div className="b2b-form-group">
            <label>Office Address</label>
            <input
              type="text"
              name="officeAddress"
              value={formData.officeAddress}
              onChange={handleInputChange}
            />
          </div>

          <div className="b2b-section-divider"></div>

          <div className="b2b-section-header">
            <div className="b2b-section-icon">📞</div>
            <h2>Contact Information</h2>
          </div>

          <div className="b2b-form-group">
            <label>Primary Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="b2b-form-group">
            <label>Support Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="b2b-form-group">
            <label>Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="b2b-settings-section b2b-notifications-section">
          <div className="b2b-section-header">
            <div className="b2b-section-icon">🔔</div>
            <h2>Notification Preferences</h2>
          </div>

          <div className="b2b-notification-item">
            <div>
              <p className="b2b-notification-label">New Contract Requests</p>
            </div>
            <label className="b2b-toggle">
              <input
                type="checkbox"
                checked={notifications.contracts}
                onChange={() => handleNotificationChange("contracts")}
              />
              <span className="b2b-toggle-slider"></span>
            </label>
          </div>

          <div className="b2b-notification-item">
            <div>
              <p className="b2b-notification-label">Fleet Maintenance Alerts</p>
            </div>
            <label className="b2b-toggle">
              <input
                type="checkbox"
                checked={notifications.maintenance}
                onChange={() => handleNotificationChange("maintenance")}
              />
              <span className="b2b-toggle-slider"></span>
            </label>
          </div>

          <div className="b2b-notification-item">
            <div>
              <p className="b2b-notification-label">
                Driver Performance Reports
              </p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={notifications.drivers}
                onChange={() => handleNotificationChange("drivers")}
              />
              <span className="b2b-toggle-slider"></span>
            </label>
          </div>

          <div className="b2b-notification-item">
            <div>
              <p className="b2b-notification-label">Marketing & Updates</p>
            </div>
            <label className="b2b-toggle">
              <input
                type="checkbox"
                checked={notifications.marketing}
                onChange={() => handleNotificationChange("marketing")}
              />
              <span className="b2b-toggle-slider"></span>
            </label>
          </div>

          <button className="b2b-save-btn" onClick={handleSave}>
            💾 Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default B2B_Settings;

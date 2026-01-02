"use client";

import { useState } from "react";
import "./settings.css";

export default function Settings() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleToggle = (setter) => {
    setter((prev) => !prev);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    alert("Changes saved successfully!");
  };

  return (
    <div className="settings-section">
      <div className="settings-container">
        <div className="settings-group">
          <div className="settings-header">
            <h3>🌐 Regional Preferences</h3>
            <p>Customize your language and currency</p>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Language</label>
              <select>
                <option>English</option>
                <option>Arabic</option>
                <option>Urdu</option>
              </select>
            </div>
            <div className="form-group">
              <label>Currency</label>
              <select>
                <option>Kuwaiti Dinar (KWD)</option>
                <option>US Dollar (USD)</option>
                <option>Euro (EUR)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-group">
          <div className="settings-header">
            <h3>🔔 Notifications</h3>
            <p>Manage how we communicate with you</p>
          </div>
          <div className="settings-toggles">
            <div className="toggle-item">
              <div>
                <p className="toggle-label">Push Notifications</p>
                <p className="toggle-description">
                  Receive alerts about your ride status
                </p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={pushNotifications}
                  onChange={() => handleToggle(setPushNotifications)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-item">
              <div>
                <p className="toggle-label">Marketing Emails</p>
                <p className="toggle-description">
                  Receive news, promotions and discounts
                </p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={marketingEmails}
                  onChange={() => handleToggle(setMarketingEmails)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-group">
          <div className="settings-header">
            <h3>🔐 Security</h3>
            <p>Update your password and account security</p>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                placeholder="••••••••"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="new"
                  value={passwords.new}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirm"
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
        </div>

        <button className="save-btn" onClick={handleSaveChanges}>
          📋 Save Changes
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import "./account.css";

function Account() {
  const [preferences, setPreferences] = useState({
    newTripAlerts: true,
    dailyEarnings: true,
    promotionalOffers: false,
  });

  const handleToggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="account">
      <div className="account-content">
        {/* Driver Profile */}
        <div className="account-section">
          <div className="section-header">
            <div className="header-icon driver-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle
                  cx="10"
                  cy="8"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M2 18C2 14.5 5.5 12 10 12C14.5 12 18 14.5 18 18"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
            <h2 className="section-title">Driver Profile</h2>
          </div>

          <div className="profile-grid">
            <div className="profile-field">
              <label className="field-label">Full Name</label>
              <input
                type="text"
                className="field-input"
                value="Test Driver"
                readOnly
              />
            </div>

            <div className="profile-field">
              <label className="field-label">Phone Number</label>
              <input
                type="text"
                className="field-input"
                value="+965 6000 0002"
                readOnly
              />
            </div>

            <div className="profile-field">
              <label className="field-label">Email Address</label>
              <input
                type="text"
                className="field-input"
                value="driver@driveme.com"
                readOnly
              />
            </div>

            <div className="profile-field">
              <label className="field-label">License Number</label>
              <input
                type="text"
                className="field-input"
                value="KWT-DL-998877"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Documents & Verification */}
        <div className="account-section">
          <div className="section-header">
            <div className="header-icon docs-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect
                  x="3"
                  y="2"
                  width="14"
                  height="16"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path d="M6 5H14" stroke="currentColor" strokeWidth="1" />
                <path d="M6 9H14" stroke="currentColor" strokeWidth="1" />
                <path d="M6 13H10" stroke="currentColor" strokeWidth="1" />
                <circle cx="17" cy="2" r="3" fill="#10b981" />
              </svg>
            </div>
            <h2 className="section-title">Documents & Verification</h2>
          </div>

          <div className="documents-list">
            <div className="document-item">
              <div className="doc-status-icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="8" fill="#10b981" />
                  <path
                    d="M4 9L8 13L14 6"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="doc-name">Driving License</span>
              <button className="doc-action">View / Update</button>
            </div>

            <div className="document-item">
              <div className="doc-status-icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="8" fill="#10b981" />
                  <path
                    d="M4 9L8 13L14 6"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="doc-name">Vehicle Insurance</span>
              <button className="doc-action">View / Update</button>
            </div>

            <div className="document-item">
              <div className="doc-status-icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="8" fill="#10b981" />
                  <path
                    d="M4 9L8 13L14 6"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="doc-name">Civil ID</span>
              <button className="doc-action">View / Update</button>
            </div>
          </div>
        </div>
      </div>

      <div className="account-sidebar">
        {/* Preferences */}
        <div className="account-section">
          <div className="section-header">
            <div className="header-icon prefs-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle
                  cx="10"
                  cy="10"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M10 6V10L12 12"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="section-title">Preferences</h2>
          </div>

          <div className="preferences-list">
            <div className="preference-item">
              <span className="pref-label">New Trip Alerts</span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={preferences.newTripAlerts}
                  onChange={() => handleToggle("newTripAlerts")}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="preference-item">
              <span className="pref-label">Daily Earnings Summary</span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={preferences.dailyEarnings}
                  onChange={() => handleToggle("dailyEarnings")}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="preference-item">
              <span className="pref-label">Promotional Offers</span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={preferences.promotionalOffers}
                  onChange={() => handleToggle("promotionalOffers")}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="account-section">
          <div className="section-header">
            <div className="header-icon security-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3 8L10 3L17 8V13C17 16.3 14 18 10 18C6 18 3 16.3 3 13V8Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M10 10C11.1 10 12 10.9 12 12C12 13.1 11.1 14 10 14C8.9 14 8 13.1 8 12C8 10.9 8.9 10 10 10Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
            <h2 className="section-title">Security</h2>
          </div>

          <div className="security-actions">
            <button className="security-btn primary">Change Password</button>
            <button className="security-btn danger">Deactivate Account</button>
          </div>
        </div>

        <button className="save-changes-btn">Save Changes</button>
      </div>
    </div>
  );
}

export default Account;

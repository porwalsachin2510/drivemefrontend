import React from "react";
import "./accountsettings.css";

const AccountSettings = () => {
  const handleChangePassword = () => {
    console.log("Change password clicked");
    // Add your password change logic here
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      console.log("Delete account confirmed");
      // Add your delete account logic here
    }
  };

  return (
    <div className="account-settings">
      <div className="security-section">
        <h2 className="security-title">Security</h2>
        <p className="security-description">
          Manage your account security settings.
        </p>

        <div className="settings-actions">
          <button
            className="setting-btn change-password-btn"
            onClick={handleChangePassword}
          >
            <span className="btn-text">Change Password</span>
            <svg
              className="settings-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m5.657-13.657l-4.243 4.243m-2.828 2.828l-4.243 4.243m16.971-1.414l-6-6m-6 6l-6-6"></path>
            </svg>
          </button>

          <button
            className="setting-btn delete-account-btn"
            onClick={handleDeleteAccount}
          >
            <span className="btn-text">Delete Account</span>
            <svg
              className="settings-icon delete-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m5.657-13.657l-4.243 4.243m-2.828 2.828l-4.243 4.243m16.971-1.414l-6-6m-6 6l-6-6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;

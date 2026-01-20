import React, { useState } from "react";
import "./companyprofile.css";

const CompanyProfile = () => {
  const [formData, setFormData] = useState({
    companyName: "Test Corp Admin",
    website: "https://",
    address: "",
    contactPerson: "Test Corp Admin",
    contactEmail: "corp@driveme.com",
    contactPhone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="company-profile">
      <div className="profile-container">
        <div className="left-section">
          {/* Logo Upload */}
          <div className="logo-section">
            <div className="logo-circle">
              <span className="logo-initial">T</span>
            </div>
            <button className="update-logo-btn">Update Logo</button>
          </div>

          {/* Verification Status */}
          <div className="verification-section">
            <div className="verification-header">Verification Status</div>
            <div className="verification-status">
              <svg
                className="check-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span className="status-text">Trade License Verified</span>
            </div>
          </div>
        </div>

        <div className="right-section">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="address">Headquarters Address</label>
              <textarea
                id="address"
                name="address"
                rows="4"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactPerson">Primary Contact Person</label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactEmail">Contact Email</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group half-width">
              <label htmlFor="contactPhone">Contact Phone</label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;

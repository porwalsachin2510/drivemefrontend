"use client";

import { useState } from "react";
import "./b2b_adddrivermodal.css";

function B2B_AddDriverModal({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    licenseExpiry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Driver added:", formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Driver</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="e.g. Mohammed Ali"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+965"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="licenseExpiry">License Expiry</label>
            <input
              type="date"
              id="licenseExpiry"
              name="licenseExpiry"
              placeholder="dd-mm-yyyy"
              value={formData.licenseExpiry}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-register">
              Register Driver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default B2B_AddDriverModal;

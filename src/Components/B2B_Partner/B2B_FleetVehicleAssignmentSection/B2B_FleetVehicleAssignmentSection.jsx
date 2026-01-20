"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import "./B2B_FleetVehicleAssignmentSection.css";

const B2B_FleetVehicleAssignmentSection = ({
  contract,
  onAssignmentComplete,
}) => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!contract) return null;

  const isAdvancePaid = !!contract.financials?.advancePayment?.paidAt;
  const isSecurityDepositPaid = !!contract.financials?.securityDeposit?.paidAt;
  const isActive = contract.status === "ACTIVE";
  const currency = contract.quotationId?.currency || "AED";

  const getPaymentStatus = () => {
    if (!isAdvancePaid) {
      return {
        status: "pending",
        title: "Awaiting Advance Payment",
        message:
          "Corporate owner needs to make advance payment before vehicle assignment",
      };
    }
    if (!isSecurityDepositPaid) {
      return {
        status: "partial",
        title: "Security Deposit Pending",
        message: "Waiting for security deposit confirmation",
      };
    }
    if (isActive) {
      return {
        status: "ready",
        title: "Ready to Assign Vehicles",
        message:
          "All payments received. You can now assign vehicles from your fleet.",
      };
    }
  };

  const paymentStatus = getPaymentStatus();

  return (
    <div className="b2b-fleet-section">
      <div
        className="section-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="header-content">
          <h3>Vehicle Assignment Status</h3>
          <p className="header-subtitle">{paymentStatus?.title}</p>
        </div>
        <span className={`expand-icon ${isExpanded ? "expanded" : ""}`}>▼</span>
      </div>

      {isExpanded && (
        <div className="section-content">
          <div className={`status-indicator status-${paymentStatus?.status}`}>
            <span className="status-dot"></span>
            <span className="status-text">{paymentStatus?.message}</span>
          </div>

          <div className="payment-breakdown">
            <h4>Payment Status:</h4>
            <div className="payment-items">
              <div
                className={`payment-item ${isAdvancePaid ? "paid" : "pending"}`}
              >
                <span className="item-icon">{isAdvancePaid ? "✓" : "⏳"}</span>
                <div className="item-details">
                  <span className="item-name">Advance Payment (50%)</span>
                  <span className="item-amount">
                    {currency}{" "}
                    {contract.financials?.advancePayment?.amount?.toFixed(2) ||
                      "0.00"}
                  </span>
                </div>
              </div>

              <div
                className={`payment-item ${
                  isSecurityDepositPaid ? "paid" : "pending"
                }`}
              >
                <span className="item-icon">
                  {isSecurityDepositPaid ? "✓" : "⏳"}
                </span>
                <div className="item-details">
                  <span className="item-name">Security Deposit (10%)</span>
                  <span className="item-note">Refundable</span>
                  <span className="item-amount">
                    {currency}{" "}
                    {contract.financials?.securityDeposit?.amount?.toFixed(2) ||
                      "0.00"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {isActive && (
            <div className="assignment-actions">
              <p className="action-message">
                Vehicles can now be assigned to corporate employees from your
                fleet.
              </p>
              <button
                className="btn-assign"
                onClick={() => onAssignmentComplete?.()}
              >
                Proceed to Vehicle Assignment
              </button>
            </div>
          )}

          {!isActive && (
            <div className="assignment-blocked">
              <p>
                Vehicle assignment is blocked until all payments are received
                from the corporate owner.
              </p>
            </div>
          )}

          <div className="vehicles-info">
            <h4>Required Vehicles:</h4>
            <div className="vehicles-list">
              {contract.vehicles?.map((vehicle, idx) => (
                <div key={idx} className="vehicle-item-info">
                  <span className="qty">{vehicle.quantity}x</span>
                  <span className="name">
                    {vehicle.vehicleId?.vehicleName || "Unknown"}
                  </span>
                  <span className="category">
                    {vehicle.vehicleId?.vehicleCategory?.replace(/_/g, " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default B2B_FleetVehicleAssignmentSection;

"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPendingPayments,
  getPaymentDetails,
  verifyPayment,
  clearSelectedPayment,
} from "../../../Redux/slices/adminSlice";
import PaymentBreakdown from "../../../Components/Corporate/PaymentBreakdown/PaymentBreakdown";
import "./PaymentVerification.css";

const PaymentVerification = () => {
  const dispatch = useDispatch();
  const { pendingPayments, selectedPayment, loading } = useSelector(
    (state) => state.admin
  );

  console.log("selectedPayment", selectedPayment);
  const [showModal, setShowModal] = useState(false);
  const [verificationAction, setVerificationAction] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    dispatch(getPendingPayments());
  }, [dispatch]);

  const handleViewDetails = (paymentId) => {
    dispatch(getPaymentDetails(paymentId));
    setShowModal(true);
  };

  const handleVerification = async (action) => {
    if (action === "REJECT" && !rejectionReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    await dispatch(
      verifyPayment({
        paymentId: selectedPayment._id,
        action,
        reason: rejectionReason,
      })
    );

    setShowModal(false);
    setRejectionReason("");
    dispatch(clearSelectedPayment());
    dispatch(getPendingPayments());
  };

  const closeModal = () => {
    setShowModal(false);
    setRejectionReason("");
    dispatch(clearSelectedPayment());
  };

  const getPaymentTypeLabel = (type) => {
    const labels = {
      ADVANCE: "Advance Payment (50%)",
      FINAL: "Final Payment (50%)",
      SECURITY_DEPOSIT: "Security Deposit",
    };
    return labels[type] || type;
  };

  return (
    <div className="payment-verification-container">
      <div className="payment-verification-header">
        <h1>Payment Verification</h1>
        <p>Review and verify pending payments</p>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : pendingPayments.length === 0 ? (
        <div className="no-payments">
          <div className="no-payments-icon">✅</div>
          <h3>All Clear!</h3>
          <p>No pending payments to verify at the moment</p>
        </div>
      ) : (
        <div className="payments-list">
          {pendingPayments.map((payment) => (
            <div key={payment._id} className="payment-card">
              <div className="payment-card-header">
                <div className="payment-type-badge">
                  {getPaymentTypeLabel(payment.paymentType)}
                </div>
                <div className="payment-amount">
                  {payment.currency} {payment.amount.toFixed(2)}
                </div>
              </div>

              <div className="payment-card-body">
                <div className="payment-info-row">
                  <span className="info-label">Contract:</span>
                  <span className="info-value">
                    {payment.contractId?.contractNumber}
                  </span>
                </div>
                <div className="payment-info-row">
                  <span className="info-label">Corporate Owner:</span>
                  <span className="info-value">
                    {payment.corporateOwnerId?.fullName ||
                      payment.corporateOwnerId?.fullNamecompanyName}
                  </span>
                </div>
                <div className="payment-info-row">
                  <span className="info-label">Gateway:</span>
                  <span className="info-value capitalize">
                    {payment.paymentProvider}
                  </span>
                </div>
                <div className="payment-info-row">
                  <span className="info-label">Payment Method:</span>
                  <span className="info-value">{payment.paymentMethod}</span>
                </div>
                <div className="payment-info-row">
                  <span className="info-label">Date:</span>
                  <span className="info-value">
                    {new Date(payment.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="payment-card-footer">
                <button
                  className="btn-view-details"
                  onClick={() => handleViewDetails(payment._id)}
                >
                  View Details & Verify
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedPayment && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Payment Verification</h2>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="verification-section">
                <h3>Payment Details</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Payment Type:</label>
                    <span>
                      {getPaymentTypeLabel(selectedPayment.paymentType)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Amount:</label>
                    <span className="amount-highlight">
                      {selectedPayment.currency}{" "}
                      {selectedPayment.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Gateway:</label>
                    <span className="capitalize">
                      {selectedPayment.paymentProvider}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Payment Method:</label>
                    <span>{selectedPayment.paymentMethod}</span>
                  </div>
                  <div className="detail-item">
                    <label>Transaction ID:</label>
                    <span className="transaction-id">
                      {selectedPayment.gatewayTransactionId ||
                        selectedPayment.gatewayReference}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Gateway Reference:</label>
                    <span className="transaction-id">
                      {selectedPayment.gatewayReference}
                    </span>
                  </div>
                </div>
              </div>

              <div className="verification-section">
                <h3>Corporate Owner Details</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Name:</label>
                    <span>
                      {selectedPayment.corporateOwnerId?.fullName ||
                        selectedPayment.corporateOwnerId?.companyName}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Email:</label>
                    <span>{selectedPayment.corporateOwnerId?.email}</span>
                  </div>
                  <div className="detail-item">
                    <label>Phone:</label>
                    <span>
                      {selectedPayment.corporateOwnerId?.whatsappNumber}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Company:</label>
                    <span>{selectedPayment.corporateOwnerId?.fullName}</span>
                  </div>
                </div>
              </div>

              <div className="verification-section">
                <h3>Contract Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Contract Number:</label>
                    <span>{selectedPayment.contractId?.contractNumber}</span>
                  </div>
                  <div className="detail-item">
                    <label>Fleet Owner:</label>
                    <span>
                      {selectedPayment.fleetOwnerId?.fullName ||
                        selectedPayment.fleetOwnerId?.companyName}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Contract Status:</label>
                    <span className="status-badge">
                      {selectedPayment.contractId?.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="verification-section">
                <h3>Commission Breakdown</h3>
                <div className="commission-breakdown">
                  <div className="breakdown-row">
                    <span>Total Amount:</span>
                    <span className="breakdown-amount">
                      {selectedPayment.currency}{" "}
                      {selectedPayment.amount.toFixed(2)}
                    </span>
                  </div>

                  <div className="breakdown-row">
                    <span>Advance Payment:</span>
                    <span className="breakdown-amount">
                      {selectedPayment.currency}{" "}
                      {selectedPayment.contractId.financials.advancePayment.amount.toFixed(
                        2
                      )}
                    </span>
                  </div>

                  <div className="breakdown-row highlight-admin">
                    <span>Admin Commission (10%):</span>
                    <span className="breakdown-amount">
                      {selectedPayment.currency}{" "}
                      {selectedPayment.adminCommission}
                    </span>
                  </div>
                  <div className="breakdown-row highlight-fleet">
                    <span>Fleet Owner Share (90%):</span>
                    <span className="breakdown-amount">
                      {selectedPayment.currency}{" "}
                      {selectedPayment.fleetOwnerAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {verificationAction === "REJECT" && (
                <div className="verification-section">
                  <h3>Rejection Reason</h3>
                  <textarea
                    className="rejection-textarea"
                    placeholder="Please provide a detailed reason for rejection..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={4}
                  />
                </div>
              )}
            </div>

            <div className="modal-footer">
              {verificationAction === "" ? (
                <>
                  <button
                    className="btn-reject"
                    onClick={() => setVerificationAction("REJECT")}
                  >
                    Reject Payment
                  </button>
                  <button
                    className="btn-approve"
                    onClick={() => setVerificationAction("APPROVE")}
                  >
                    Approve Payment
                  </button>
                </>
              ) : verificationAction === "APPROVE" ? (
                <>
                  <button
                    className="btn-cancel"
                    onClick={() => setVerificationAction("")}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-confirm-approve"
                    onClick={() => handleVerification("APPROVE")}
                  >
                    Confirm Approval
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn-cancel"
                    onClick={() => setVerificationAction("")}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-confirm-reject"
                    onClick={() => handleVerification("REJECT")}
                  >
                    Confirm Rejection
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentVerification;

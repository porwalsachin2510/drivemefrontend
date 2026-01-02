"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getContractById,
  signContract,
  processPayment,
} from "../../../Redux/slices/contractSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import Footer from "../../../Components/Footer/Footer";
import Navbar from "../../../Components/Navbar/Navbar";
import "./CorporateContractDetails.css";

const CorporateContractDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("commuters");


  useEffect(() => {
    if (id && id !== "undefined" && id !== null) {
      dispatch(getContractById(id));
    }
  }, [dispatch, id]);

  const { currentContract, loading, error } = useSelector(
    (state) => state.contract
  );
  const contract = currentContract?.data?.contract;

  console.log("CorporateContractDetails", contract);


  const [showSignModal, setShowSignModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [signature, setSignature] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    transactionId: "",
    amount: "",
  });

  

  const handleSignContract = async () => {
    if (!signature.trim()) {
      alert("Please enter your signature");
      return;
    }

    try {
      await dispatch(
        signContract({
          contractId: contract._id,
          signature,
          ipAddress: "0.0.0.0", // In production, get actual IP
        })
      ).unwrap();
      setShowSignModal(false);
      setSignature("");
      alert("Contract signed successfully!");
    } catch (error) {
      alert(error || "Failed to sign contract");
    }
  };

  const handlePayment = async (paymentType) => {
    if (!paymentDetails.transactionId.trim()) {
      alert("Please enter transaction ID");
      return;
    }

    const amount =
      paymentType === "advance"
        ? contract.financials.advancePayment.amount
        : paymentDetails.amount;

    try {
      await dispatch(
        processPayment({
          contractId: contract._id,
          paymentType,
          amount,
          transactionId: paymentDetails.transactionId,
        })
      ).unwrap();
      setShowPaymentModal(false);
      setPaymentDetails({ transactionId: "", amount: "" });
      alert("Payment processed successfully!");
    } catch (error) {
      alert(error || "Failed to process payment");
    }
  };

  if (loading) {
    return (
      <div className="corporate-contract-details-loading">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="corporate-contract-details-error">
        <div className="error-icon">⚠️</div>
        <h3>Error Loading Contract</h3>
        <p>{error}</p>
        <button onClick={() => navigate("/corporate/contracts")}>
          Back to Contracts
        </button>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="corporate-contract-details-error">
        <div className="error-icon">📄</div>
        <h3>Contract Not Found</h3>
        <button onClick={() => navigate("/corporate/contracts")}>
          Back to Contracts
        </button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "DRAFT":
        return "#FFA500";
      case "PENDING_CORPORATE_SIGNATURE":
        return "#2196F3";
      case "PENDING_FLEET_SIGNATURE":
        return "#9C27B0";
      case "APPROVED_PENDING_PAYMENT":
        return "#FF9800";
      case "ACTIVE":
        return "#4CAF50";
      case "COMPLETED":
        return "#00BCD4";
      case "REJECTED":
        return "#F44336";
      default:
        return "#757575";
    }
  };

  return (
    <>
      {/* ✅ Navbar MUST be rendered */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="corporate-contract-details-container">
        <button
          className="corporate-contract-back-btn"
          onClick={() => navigate("/corporate/contracts")}
        >
          ← Back to Contracts
        </button>

        <div className="corporate-contract-header">
          <h1>Contract Details</h1>
          <span
            className="corporate-contract-status"
            style={{ backgroundColor: getStatusColor(contract.status) }}
          >
            {contract.status.replace(/_/g, " ")}
          </span>
        </div>

        <div className="corporate-contract-sections">
          {/* Fleet Owner Information */}
          <div className="corporate-contract-section">
            <h2>Fleet Owner Information</h2>
            <div className="corporate-contract-info-grid">
              <div className="corporate-contract-info-item">
                <span className="label">Company Name:</span>
                <span className="value">
                  {contract.fleetOwnerId?.companyName ||
                    contract.fleetOwnerId?.fullName ||
                    "N/A"}
                </span>
              </div>
              <div className="corporate-contract-info-item">
                <span className="label">Contact Person:</span>
                <span className="value">
                  {contract.fleetOwnerId?.fullName || "N/A"}
                </span>
              </div>
              <div className="corporate-contract-info-item">
                <span className="label">Email:</span>
                <span className="value">
                  {contract.fleetOwnerId?.email || "N/A"}
                </span>
              </div>
              <div className="corporate-contract-info-item">
                <span className="label">Phone:</span>
                <span className="value">
                  {contract.fleetOwnerId?.whatsappNumber || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Vehicles */}
          <div className="corporate-contract-section">
            <h2>Vehicles ({contract.vehicles?.length || 0})</h2>
            <div className="corporate-contract-vehicles-grid">
              {contract.vehicles?.map((vehicle, index) => (
                <div key={index} className="corporate-contract-vehicle-card">
                  <div className="corporate-contract-vehicle-name">
                    {vehicle.vehicleId?.vehicleName || "Unknown Vehicle"}
                  </div>
                  <div className="corporate-contract-vehicle-details">
                    <span>
                      Category: {vehicle.vehicleId?.vehicleCategory || "N/A"}
                    </span>
                    <span>Quantity: {vehicle.quantity || 0}</span>
                    <span>
                      Reg: {vehicle.vehicleId?.registrationNumber || "N/A"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contract Document */}
          {contract.contractDocument?.url && (
            <div className="corporate-contract-section">
              <h2>Contract Document</h2>
              <div className="corporate-contract-document">
                <a
                  href={contract.contractDocument.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📄 View Contract Document
                </a>
                <p className="uploaded-info">
                  Uploaded on{" "}
                  {new Date(
                    contract.contractDocument.uploadedAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          {/* Financial Details */}
          <div className="corporate-contract-section">
            <h2>Financial Details</h2>
            <div className="corporate-contract-financials">
              <div className="financial-item">
                <span className="label">Total Amount:</span>
                <span className="value">
                  KWD {contract.financials?.totalAmount?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="financial-item">
                <span className="label">Advance Payment (50%):</span>
                <span className="value">
                  KWD{" "}
                  {contract.financials?.advancePayment?.amount?.toFixed(2) ||
                    "0.00"}
                  {contract.financials?.advancePayment?.paidAt && " ✓ Paid"}
                </span>
              </div>
              <div className="financial-item">
                <span className="label">Security Deposit:</span>
                <span className="value">
                  KWD{" "}
                  {contract.financials?.securityDeposit?.amount?.toFixed(2) ||
                    "0.00"}
                </span>
              </div>
            </div>
          </div>

          {/* Digital Signatures */}
          <div className="corporate-contract-section">
            <h2>Digital Signatures</h2>
            <div className="corporate-contract-signatures">
              <div className="signature-status">
                <span className="label">Corporate Owner:</span>
                <span
                  className={`status ${
                    contract.digitalSignatures?.corporateOwner?.signed
                      ? "signed"
                      : "pending"
                  }`}
                >
                  {contract.digitalSignatures?.corporateOwner?.signed
                    ? "✓ Signed"
                    : "Pending"}
                </span>
              </div>
              <div className="signature-status">
                <span className="label">Fleet Owner:</span>
                <span
                  className={`status ${
                    contract.digitalSignatures?.fleetOwner?.signed
                      ? "signed"
                      : "pending"
                  }`}
                >
                  {contract.digitalSignatures?.fleetOwner?.signed
                    ? "✓ Signed"
                    : "Pending"}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="corporate-contract-actions">
            {contract.status === "PENDING_CORPORATE_SIGNATURE" &&
              !contract.digitalSignatures?.corporateOwner?.signed && (
                <button
                  className="corporate-contract-btn-primary"
                  onClick={() => setShowSignModal(true)}
                >
                  Sign Contract
                </button>
              )}

            {(contract.status === "APPROVED_PENDING_PAYMENT" ||
              contract.status === "PENDING_PAYMENT") &&
              !contract.financials?.advancePayment?.paidAt && (
                <button
                  className="corporate-contract-btn-success"
                  onClick={() => setShowPaymentModal(true)}
                >
                  Make Payment
                </button>
              )}
          </div>
        </div>

        {/* Sign Modal */}
        {showSignModal && (
          <div className="corporate-contract-modal-overlay">
            <div className="corporate-contract-modal">
              <h2>Sign Contract</h2>
              <p>Please enter your full name as your digital signature:</p>
              <input
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Enter your full name"
                className="corporate-contract-input"
              />
              <div className="corporate-contract-modal-actions">
                <button
                  className="corporate-contract-btn-secondary"
                  onClick={() => setShowSignModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="corporate-contract-btn-primary"
                  onClick={handleSignContract}
                >
                  Confirm Signature
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="corporate-contract-modal-overlay">
            <div className="corporate-contract-modal">
              <h2>Make Payment</h2>
              <p>
                Amount: KWD{" "}
                {contract.financials?.advancePayment?.amount?.toFixed(2)}
              </p>
              <input
                type="text"
                value={paymentDetails.transactionId}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    transactionId: e.target.value,
                  })
                }
                placeholder="Enter Transaction ID"
                className="corporate-contract-input"
              />
              <div className="corporate-contract-modal-actions">
                <button
                  className="corporate-contract-btn-secondary"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="corporate-contract-btn-success"
                  onClick={() => handlePayment("advance")}
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CorporateContractDetails;

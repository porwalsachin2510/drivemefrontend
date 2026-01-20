"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPartnerBookings,
  acceptBooking,
  rejectBooking,
} from "../../../Redux/slices/bookingSlice";
import { useNavigate } from "react-router-dom";
import "./b2c_partnerbookingspage.css";

const B2C_PartnerBookingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { partnerBookings, loading } = useSelector((state) => state.booking);
  const auth = useSelector((state) => state.auth);
  const [filterStatus, setFilterStatus] = useState("PENDING");
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    if (auth.user?.role === "B2C_PARTNER") {
      dispatch(getPartnerBookings({ status: filterStatus }));
    } else {
      navigate("/");
    }
  }, [dispatch, auth.user, filterStatus, navigate]);

  const handleAccept = (bookingId) => {
    dispatch(acceptBooking(bookingId)).then(() => {
      dispatch(getPartnerBookings({ status: filterStatus }));
    });
  };

  const handleRejectClick = (booking) => {
    setSelectedBooking(booking);
    setShowRejectModal(true);
  };

  const handleRejectSubmit = () => {
    if (selectedBooking) {
      dispatch(
        rejectBooking({
          bookingId: selectedBooking._id,
          rejectionReason,
        }),
      ).then(() => {
        dispatch(getPartnerBookings({ status: filterStatus }));
        setShowRejectModal(false);
        setRejectionReason("");
        setSelectedBooking(null);
      });
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="partner-bookings-page">
      <div className="page-header">
        <h1>Booking Requests</h1>
        <p>Manage passenger booking requests</p>
      </div>

      <div className="bookings-container">
        <div className="filter-tabs">
          <button
            className={`tab-btn ${filterStatus === "PENDING" ? "active" : ""}`}
            onClick={() => setFilterStatus("PENDING")}
          >
            Pending
            <span className="count">
              {
                partnerBookings.filter((b) => b.bookingStatus === "PENDING")
                  .length
              }
            </span>
          </button>
          <button
            className={`tab-btn ${filterStatus === "CONFIRMED" ? "active" : ""}`}
            onClick={() => setFilterStatus("CONFIRMED")}
          >
            Confirmed
            <span className="count">
              {
                partnerBookings.filter((b) => b.bookingStatus === "CONFIRMED")
                  .length
              }
            </span>
          </button>
          <button
            className={`tab-btn ${filterStatus === "REJECTED" ? "active" : ""}`}
            onClick={() => setFilterStatus("REJECTED")}
          >
            Rejected
            <span className="count">
              {
                partnerBookings.filter((b) => b.bookingStatus === "REJECTED")
                  .length
              }
            </span>
          </button>
        </div>

        {loading ? (
          <div className="loading-state">Loading bookings...</div>
        ) : partnerBookings.length === 0 ? (
          <div className="empty-state">
            <p>No {filterStatus.toLowerCase()} bookings</p>
          </div>
        ) : (
          <div className="bookings-list">
            {partnerBookings.map((booking) => (
              <div key={booking._id} className="booking-request-card">
                <div className="booking-passenger-info">
                  <div className="passenger-name">
                    {booking.passengerId?.fullName}
                  </div>
                  <div className="passenger-contact">
                    {booking.passengerId?.whatsappNumber}
                  </div>
                </div>

                <div className="booking-route-info">
                  <div className="route">
                    <span className="label">Route:</span>
                    <span className="value">
                      {booking.pickupLocation} → {booking.dropoffLocation}
                    </span>
                  </div>
                  <div className="travel-date">
                    <span className="label">Travel Date:</span>
                    <span className="value">
                      {formatDate(booking.travelDate)}
                    </span>
                  </div>
                </div>

                <div className="booking-payment-info">
                  <div className="payment-amount">
                    <span className="label">Amount:</span>
                    <span className="amount">
                      AED {booking.paymentAmount?.toFixed(2)}
                    </span>
                  </div>
                  {booking.paymentMethod && (
                    <div className="payment-method">
                      <span className="label">Payment:</span>
                      <span className="method">{booking.paymentMethod}</span>
                    </div>
                  )}
                </div>

                {booking.bookingStatus === "PENDING" && (
                  <div className="booking-actions">
                    <button
                      className="btn btn-accept"
                      onClick={() => handleAccept(booking._id)}
                      disabled={loading}
                    >
                      Accept Booking
                    </button>
                    <button
                      className="btn btn-reject"
                      onClick={() => handleRejectClick(booking)}
                      disabled={loading}
                    >
                      Reject
                    </button>
                  </div>
                )}

                {booking.bookingStatus === "CONFIRMED" && (
                  <div className="status-confirmed">✓ Booking Confirmed</div>
                )}

                {booking.bookingStatus === "REJECTED" && (
                  <div className="status-rejected">
                    ✕ Booking Rejected
                    {booking.rejectionReason && (
                      <p className="reason">
                        Reason: {booking.rejectionReason}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showRejectModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowRejectModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Reject Booking</h3>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Please provide a reason for rejection..."
              rows="4"
            />
            <div className="modal-actions">
              <button
                className="btn btn-cancel"
                onClick={() => setShowRejectModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-confirm"
                onClick={handleRejectSubmit}
                disabled={loading || !rejectionReason.trim()}
              >
                {loading ? "Processing..." : "Confirm Rejection"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default B2C_PartnerBookingsPage;

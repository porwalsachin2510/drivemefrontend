"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPassengerBookings } from "../../../Redux/slices/bookingSlice";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
// import LiveTracking from "../../../Components/LiveTracking/LiveTracking";
import "./commutermybookingspage.css";

const CommuterMyBookingsPage = () => {
  const dispatch = useDispatch();
  const { passengerBookings, loading } = useSelector((state) => state.booking);
  const auth = useSelector((state) => state.auth);
  const [filterStatus, setFilterStatus] = useState("all");
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showTracking, setShowTracking] = useState(false);

  // Derive userType directly from passengerBookings instead of storing in state
  const userType =
    passengerBookings.length > 0
      ? passengerBookings[0].userType
      : "NORMAL_PASSENGER";

  useEffect(() => {
    if (auth.user) {
      dispatch(
        getPassengerBookings({
          status: filterStatus !== "all" ? filterStatus : undefined,
        }),
      );
    }
  }, [dispatch, auth.user, filterStatus]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { color: "#ffc107", label: "Pending" },
      CONFIRMED: { color: "#28a745", label: "Confirmed" },
      COMPLETED: { color: "#17a2b8", label: "Completed" },
      REJECTED: { color: "#dc3545", label: "Rejected" },
      CANCELLED: { color: "#6c757d", label: "Cancelled" },
    };
    return statusConfig[status] || { color: "#6c757d", label: status };
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

//     const handleTrackingClick = (booking) => {
//       console.log("Booking", booking);
//     setSelectedBooking(booking);
//     setShowTracking(true);
//   };

  return (
    <div className="my-bookings-page">
      <Navbar />

      <div className="bookings-container">
        <div className="bookings-header">
          <h1>My Bookings</h1>
          <p>
            {userType === "CORPORATE_EMPLOYEE"
              ? "Your company-sponsored ride bookings"
              : "View and manage your ride bookings"}
          </p>
        </div>

        <div className="filter-section">
          <button
            className={`filter-btn ${filterStatus === "all" ? "active" : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            All Bookings
          </button>
          <button
            className={`filter-btn ${filterStatus === "PENDING" ? "active" : ""}`}
            onClick={() => setFilterStatus("PENDING")}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filterStatus === "CONFIRMED" ? "active" : ""}`}
            onClick={() => setFilterStatus("CONFIRMED")}
          >
            Confirmed
          </button>
          <button
            className={`filter-btn ${filterStatus === "COMPLETED" ? "active" : ""}`}
            onClick={() => setFilterStatus("COMPLETED")}
          >
            Completed
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <p>Loading your bookings...</p>
          </div>
        ) : passengerBookings.length === 0 ? (
          <div className="empty-state">
            <p>No bookings found</p>
            <p className="empty-subtitle">
              {userType === "CORPORATE_EMPLOYEE"
                ? "Your company has not assigned any rides yet"
                : "Start booking a ride to see them here"}
            </p>
          </div>
        ) : (
          <div className="bookings-grid">
            {passengerBookings.map((booking) => {
              const statusConfig = getStatusBadge(booking.bookingStatus);
              return (
                <div key={booking._id} className="booking-card">
                  <div className="booking-card-header">
                    <div className="booking-meta">
                      <h3 className="booking-title">
                        {booking.type === "CORPORATE"
                          ? `${booking.routeId?.fromLocation} → ${booking.routeId?.toLocation}`
                          : `${booking.pickupLocation} → ${booking.dropoffLocation}`}
                      </h3>
                      <p className="booking-date">
                        📅 {formatDate(booking.travelDate || booking.createdAt)}
                      </p>
                    </div>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: statusConfig.color }}
                    >
                      {statusConfig.label}
                    </span>
                  </div>

                  <div className="booking-details">
                    {booking.type === "B2C" ? (
                      <>
                        <div className="detail-item">
                          <span className="detail-label">Driver</span>
                          <span className="detail-value">
                            {booking.b2cPartnerId?.fullName || "N/A"}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Vehicle</span>
                          <span className="detail-value">
                            {booking.b2cPartnerId?.vehicleModel || "N/A"}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Seats</span>
                          <span className="detail-value">
                            {booking.numberOfSeats}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Amount</span>
                          <span className="detail-value">
                            AED {booking.paymentAmount?.toFixed(2) || "N/A"}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Payment Method</span>
                          <span className="detail-value">
                            {booking.paymentMethod || "N/A"}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="detail-item">
                          <span className="detail-label">Company</span>
                          <span className="detail-value">
                            {booking.corporateOwnerId?.companyName || "N/A"}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Route</span>
                          <span className="detail-value">
                            {booking.routeId?.fromLocation} to{" "}
                            {booking.routeId?.toLocation}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Departure</span>
                          <span className="detail-value">
                            {booking.routeId?.departureTime || "N/A"}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Seat</span>
                          <span className="detail-value">
                            {booking.numberOfSeats}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Cost</span>
                          <span className="detail-value">
                            Company Sponsored
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {booking.type === "B2C" && booking.b2cPartnerId && (
                    <div className="partner-info">
                      <p>
                        <strong>Operator:</strong>{" "}
                        {booking.b2cPartnerId.fullName}
                      </p>
                      <p>
                        <strong>Contact:</strong>{" "}
                        {booking.b2cPartnerId.whatsappNumber}
                      </p>
                    </div>
                  )}

                  {/* <div className="booking-actions">
                    {booking.bookingStatus === "CONFIRMED" &&
                      booking.type === "B2C" && (
                        <button
                          className="btn-track"
                          onClick={() => handleTrackingClick(booking)}
                        >
                          🗺️ Track Driver
                        </button>
                      )}
                    {booking.bookingStatus === "PENDING" &&
                      booking.type === "B2C" && (
                        <button className="btn-cancel">Cancel Booking</button>
                      )}
                    {booking.type === "CORPORATE" &&
                      booking.bookingStatus === "CONFIRMED" && (
                        <button
                          className="btn-track"
                          onClick={() => handleTrackingClick(booking)}
                        >
                          🗺️ View Route
                        </button>
                      )}
                  </div> */}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* {showTracking && selectedBooking && (
        <div
          className="tracking-modal-overlay"
          onClick={() => setShowTracking(false)}
        >
          <div className="tracking-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tracking-modal-header">
              <h2>Live Tracking - {selectedBooking._id}</h2>
              <button
                className="close-btn"
                onClick={() => setShowTracking(false)}
              >
                ✕
              </button>
            </div>
            <LiveTracking
              bookingId={selectedBooking._id}
              driverLocation={
                selectedBooking.driverLocation || { lat: 25.2048, lng: 55.2708 }
              }
              passangerLocation={
                selectedBooking.pickupCoordinates || {
                  lat: 25.2048,
                  lng: 55.2708,
                }
              }
              destination={
                selectedBooking.dropoffCoordinates || {
                  lat: 25.1972,
                  lng: 55.2744,
                }
              }
              driverName={selectedBooking.driverName}
              vehicleModel={selectedBooking.vehicleModel}
              driverPhone={selectedBooking.driverPhone}
            />
          </div>
        </div>
      )} */}

      <Footer />
    </div>
  );
};

export default CommuterMyBookingsPage;

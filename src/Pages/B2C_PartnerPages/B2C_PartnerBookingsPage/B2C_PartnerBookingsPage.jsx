// /* eslint-disable no-unused-vars */
// // "use client";

// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   getPartnerBookings,
// //   acceptBooking,
// //   rejectBooking,
// // } from "../../../Redux/slices/bookingSlice";
// // import { useNavigate } from "react-router-dom";
// // import "./b2c_partnerbookingspage.css";

// // const B2C_PartnerBookingsPage = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { partnerBookings, loading } = useSelector((state) => state.booking);
// //   const auth = useSelector((state) => state.auth);
// //   const [filterStatus, setFilterStatus] = useState("PENDING");
// //   const [rejectionReason, setRejectionReason] = useState("");
// //   const [selectedBooking, setSelectedBooking] = useState(null);
// //   const [showRejectModal, setShowRejectModal] = useState(false);

// //   useEffect(() => {
// //     if (auth.user?.role === "B2C_PARTNER") {
// //       dispatch(getPartnerBookings({ status: filterStatus }));
// //     } else {
// //       navigate("/");
// //     }
// //   }, [dispatch, auth.user, filterStatus, navigate]);

// //   const handleAccept = (bookingId) => {
// //     dispatch(acceptBooking(bookingId)).then(() => {
// //       dispatch(getPartnerBookings({ status: filterStatus }));
// //     });
// //   };

// //   const handleRejectClick = (booking) => {
// //     setSelectedBooking(booking);
// //     setShowRejectModal(true);
// //   };

// //   const handleRejectSubmit = () => {
// //     if (selectedBooking) {
// //       dispatch(
// //         rejectBooking({
// //           bookingId: selectedBooking._id,
// //           rejectionReason,
// //         }),
// //       ).then(() => {
// //         dispatch(getPartnerBookings({ status: filterStatus }));
// //         setShowRejectModal(false);
// //         setRejectionReason("");
// //         setSelectedBooking(null);
// //       });
// //     }
// //   };

// //   const formatDate = (date) => {
// //     return new Date(date).toLocaleDateString("en-US", {
// //       year: "numeric",
// //       month: "short",
// //       day: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   };

// //   return (
// //     <div className="partner-bookings-page">
// //       <div className="page-header">
// //         <h1>Booking Requests</h1>
// //         <p>Manage passenger booking requests</p>
// //       </div>

// //       <div className="bookings-container">
// //         <div className="filter-tabs">
// //           <button
// //             className={`tab-btn ${filterStatus === "PENDING" ? "active" : ""}`}
// //             onClick={() => setFilterStatus("PENDING")}
// //           >
// //             Pending
// //             <span className="count">
// //               {
// //                 partnerBookings.filter((b) => b.bookingStatus === "PENDING")
// //                   .length
// //               }
// //             </span>
// //           </button>
// //           <button
// //             className={`tab-btn ${filterStatus === "CONFIRMED" ? "active" : ""}`}
// //             onClick={() => setFilterStatus("CONFIRMED")}
// //           >
// //             Confirmed
// //             <span className="count">
// //               {
// //                 partnerBookings.filter((b) => b.bookingStatus === "CONFIRMED")
// //                   .length
// //               }
// //             </span>
// //           </button>
// //           <button
// //             className={`tab-btn ${filterStatus === "REJECTED" ? "active" : ""}`}
// //             onClick={() => setFilterStatus("REJECTED")}
// //           >
// //             Rejected
// //             <span className="count">
// //               {
// //                 partnerBookings.filter((b) => b.bookingStatus === "REJECTED")
// //                   .length
// //               }
// //             </span>
// //           </button>
// //         </div>

// //         {loading ? (
// //           <div className="loading-state">Loading bookings...</div>
// //         ) : partnerBookings.length === 0 ? (
// //           <div className="empty-state">
// //             <p>No {filterStatus.toLowerCase()} bookings</p>
// //           </div>
// //         ) : (
// //           <div className="bookings-list">
// //             {partnerBookings.map((booking) => (
// //               <div key={booking._id} className="booking-request-card">
// //                 <div className="booking-passenger-info">
// //                   <div className="passenger-name">
// //                     {booking.passengerId?.fullName}
// //                   </div>
// //                   <div className="passenger-contact">
// //                     {booking.passengerId?.whatsappNumber}
// //                   </div>
// //                 </div>

// //                 <div className="booking-route-info">
// //                   <div className="route">
// //                     <span className="label">Route:</span>
// //                     <span className="value">
// //                       {booking.pickupLocation} → {booking.dropoffLocation}
// //                     </span>
// //                   </div>
// //                   <div className="travel-date">
// //                     <span className="label">Travel Date:</span>
// //                     <span className="value">
// //                       {formatDate(booking.travelDate)}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 <div className="booking-payment-info">
// //                   <div className="payment-amount">
// //                     <span className="label">Amount:</span>
// //                     <span className="amount">
// //                       AED {booking.paymentAmount?.toFixed(2)}
// //                     </span>
// //                   </div>
// //                   {booking.paymentMethod && (
// //                     <div className="payment-method">
// //                       <span className="label">Payment:</span>
// //                       <span className="method">{booking.paymentMethod}</span>
// //                     </div>
// //                   )}
// //                 </div>

// //                 {booking.bookingStatus === "PENDING" && (
// //                   <div className="booking-actions">
// //                     <button
// //                       className="btn btn-accept"
// //                       onClick={() => handleAccept(booking._id)}
// //                       disabled={loading}
// //                     >
// //                       Accept Booking
// //                     </button>
// //                     <button
// //                       className="btn btn-reject"
// //                       onClick={() => handleRejectClick(booking)}
// //                       disabled={loading}
// //                     >
// //                       Reject
// //                     </button>
// //                   </div>
// //                 )}

// //                 {booking.bookingStatus === "CONFIRMED" && (
// //                   <div className="status-confirmed">✓ Booking Confirmed</div>
// //                 )}

// //                 {booking.bookingStatus === "REJECTED" && (
// //                   <div className="status-rejected">
// //                     ✕ Booking Rejected
// //                     {booking.rejectionReason && (
// //                       <p className="reason">
// //                         Reason: {booking.rejectionReason}
// //                       </p>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       {showRejectModal && (
// //         <div
// //           className="modal-overlay"
// //           onClick={() => setShowRejectModal(false)}
// //         >
// //           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //             <h3>Reject Booking</h3>
// //             <textarea
// //               value={rejectionReason}
// //               onChange={(e) => setRejectionReason(e.target.value)}
// //               placeholder="Please provide a reason for rejection..."
// //               rows="4"
// //             />
// //             <div className="modal-actions">
// //               <button
// //                 className="btn btn-cancel"
// //                 onClick={() => setShowRejectModal(false)}
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 className="btn btn-confirm"
// //                 onClick={handleRejectSubmit}
// //                 disabled={loading || !rejectionReason.trim()}
// //               >
// //                 {loading ? "Processing..." : "Confirm Rejection"}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default B2C_PartnerBookingsPage;

// // "use client";

// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   getPartnerBookings,
// //   acceptBooking,
// //   rejectBooking,
// //   startTrip,
// //   completeBooking,
// // } from "../../../Redux/slices/bookingSlice";
// // import { useNavigate } from "react-router-dom";
// // import "./b2c_partnerbookingspage.css";

// // const B2C_PartnerBookingsPage = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { partnerBookings, loading } = useSelector((state) => state.booking);
// //   const auth = useSelector((state) => state.auth);
// //   const [filterStatus, setFilterStatus] = useState("PENDING");
// //   const [rejectionReason, setRejectionReason] = useState("");
// //   const [selectedBooking, setSelectedBooking] = useState(null);
// //   const [showRejectModal, setShowRejectModal] = useState(false);

// //   useEffect(() => {
// //     if (auth.user?.role === "B2C_PARTNER") {
// //       dispatch(getPartnerBookings({ status: filterStatus }));
// //     } else {
// //       navigate("/");
// //     }
// //   }, [dispatch, auth.user, filterStatus, navigate]);

// //   const handleAccept = (bookingId) => {
// //     dispatch(acceptBooking(bookingId)).then(() => {
// //       dispatch(getPartnerBookings({ status: filterStatus }));
// //     });
// //   };

// //   const handleRejectClick = (booking) => {
// //     setSelectedBooking(booking);
// //     setShowRejectModal(true);
// //   };

// //   const handleRejectSubmit = () => {
// //     if (selectedBooking) {
// //       dispatch(
// //         rejectBooking({
// //           bookingId: selectedBooking._id,
// //           rejectionReason,
// //         }),
// //       ).then(() => {
// //         dispatch(getPartnerBookings({ status: filterStatus }));
// //         setShowRejectModal(false);
// //         setRejectionReason("");
// //         setSelectedBooking(null);
// //       });
// //     }
// //   };

// //   const handleStartTrip = (bookingId) => {
// //     dispatch(startTrip(bookingId)).then(() => {
// //       dispatch(getPartnerBookings({ status: filterStatus }));
// //     });
// //   };

// //   const handleCompleteBooking = (bookingId) => {
// //     dispatch(completeBooking(bookingId)).then(() => {
// //       dispatch(getPartnerBookings({ status: filterStatus }));
// //     });
// //   };

// //   const formatDate = (date) => {
// //     return new Date(date).toLocaleDateString("en-US", {
// //       year: "numeric",
// //       month: "short",
// //       day: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   };

// //   return (
// //     <div className="partner-bookings-page">
// //       <div className="page-header">
// //         <h1>Booking Requests</h1>
// //         <p>Manage passenger booking requests</p>
// //       </div>

// //       <div className="bookings-container">
// //         <div className="filter-tabs">
// //           <button
// //             className={`tab-btn ${filterStatus === "PENDING" ? "active" : ""}`}
// //             onClick={() => setFilterStatus("PENDING")}
// //           >
// //             Pending
// //             <span className="count">
// //               {
// //                 partnerBookings.filter((b) => b.bookingStatus === "PENDING")
// //                   .length
// //               }
// //             </span>
// //           </button>
// //           <button
// //             className={`tab-btn ${filterStatus === "CONFIRMED" ? "active" : ""}`}
// //             onClick={() => setFilterStatus("CONFIRMED")}
// //           >
// //             Confirmed
// //             <span className="count">
// //               {
// //                 partnerBookings.filter((b) => b.bookingStatus === "CONFIRMED")
// //                   .length
// //               }
// //             </span>
// //           </button>
// //           <button
// //             className={`tab-btn ${filterStatus === "IN_PROGRESS" ? "active" : ""}`}
// //             onClick={() => setFilterStatus("IN_PROGRESS")}
// //           >
// //             In Progress
// //             <span className="count">
// //               {
// //                 partnerBookings.filter((b) => b.bookingStatus === "IN_PROGRESS")
// //                   .length
// //               }
// //             </span>
// //           </button>
// //           <button
// //             className={`tab-btn ${filterStatus === "COMPLETED" ? "active" : ""}`}
// //             onClick={() => setFilterStatus("COMPLETED")}
// //           >
// //             Completed
// //             <span className="count">
// //               {
// //                 partnerBookings.filter((b) => b.bookingStatus === "COMPLETED")
// //                   .length
// //               }
// //             </span>
// //           </button>
// //           <button
// //             className={`tab-btn ${filterStatus === "REJECTED" ? "active" : ""}`}
// //             onClick={() => setFilterStatus("REJECTED")}
// //           >
// //             Rejected
// //             <span className="count">
// //               {
// //                 partnerBookings.filter((b) => b.bookingStatus === "REJECTED")
// //                   .length
// //               }
// //             </span>
// //           </button>
// //         </div>

// //         {loading ? (
// //           <div className="loading-state">Loading bookings...</div>
// //         ) : partnerBookings.length === 0 ? (
// //           <div className="empty-state">
// //             <p>No {filterStatus.toLowerCase()} bookings</p>
// //           </div>
// //         ) : (
// //           <div className="bookings-list">
// //             {partnerBookings.map((booking) => (
// //               <div key={booking._id} className="booking-request-card">
// //                 <div className="booking-passenger-info">
// //                   <div className="passenger-name">
// //                     {booking.passengerId?.fullName}
// //                   </div>
// //                   <div className="passenger-contact">
// //                     {booking.passengerId?.whatsappNumber}
// //                   </div>
// //                 </div>

// //                 <div className="booking-route-info">
// //                   <div className="route">
// //                     <span className="label">Route:</span>
// //                     <span className="value">
// //                       {booking.pickupLocation} → {booking.dropoffLocation}
// //                     </span>
// //                   </div>
// //                   <div className="travel-date">
// //                     <span className="label">Travel Date:</span>
// //                     <span className="value">
// //                       {formatDate(booking.travelDate)}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 <div className="booking-payment-info">
// //                   <div className="payment-amount">
// //                     <span className="label">Amount:</span>
// //                     <span className="amount">
// //                       AED {booking.paymentAmount?.toFixed(2)}
// //                     </span>
// //                   </div>
// //                   {booking.paymentMethod && (
// //                     <div className="payment-method">
// //                       <span className="label">Payment:</span>
// //                       <span className="method">{booking.paymentMethod}</span>
// //                     </div>
// //                   )}
// //                 </div>

// //                 {booking.bookingStatus === "PENDING" && (
// //                   <div className="booking-actions">
// //                     <button
// //                       className="btn btn-accept"
// //                       onClick={() => handleAccept(booking._id)}
// //                       disabled={loading}
// //                     >
// //                       Accept Booking
// //                     </button>
// //                     <button
// //                       className="btn btn-reject"
// //                       onClick={() => handleRejectClick(booking)}
// //                       disabled={loading}
// //                     >
// //                       Reject
// //                     </button>
// //                   </div>
// //                 )}

// //                 {booking.bookingStatus === "CONFIRMED" && (
// //                   <div className="booking-actions">
// //                     <button
// //                       className="btn btn-start-trip"
// //                       onClick={() => handleStartTrip(booking._id)}
// //                       disabled={loading}
// //                     >
// //                       🚗 Start Trip
// //                     </button>
// //                   </div>
// //                 )}

// //                 {booking.bookingStatus === "IN_PROGRESS" && (
// //                   <div className="booking-actions">
// //                     <button
// //                       className="btn btn-complete"
// //                       onClick={() => handleCompleteBooking(booking._id)}
// //                       disabled={loading}
// //                     >
// //                       ✅ Complete Booking
// //                     </button>
// //                   </div>
// //                 )}

// //                 {booking.bookingStatus === "COMPLETED" && (
// //                   <div className="status-completed">✓ Booking Completed</div>
// //                 )}

// //                 {booking.bookingStatus === "REJECTED" && (
// //                   <div className="status-rejected">
// //                     ✕ Booking Rejected
// //                     {booking.rejectionReason && (
// //                       <p className="reason">
// //                         Reason: {booking.rejectionReason}
// //                       </p>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       {showRejectModal && (
// //         <div
// //           className="modal-overlay"
// //           onClick={() => setShowRejectModal(false)}
// //         >
// //           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //             <h3>Reject Booking</h3>
// //             <textarea
// //               value={rejectionReason}
// //               onChange={(e) => setRejectionReason(e.target.value)}
// //               placeholder="Please provide a reason for rejection..."
// //               rows="4"
// //             />
// //             <div className="modal-actions">
// //               <button
// //                 className="btn btn-cancel"
// //                 onClick={() => setShowRejectModal(false)}
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 className="btn btn-confirm"
// //                 onClick={handleRejectSubmit}
// //                 disabled={loading || !rejectionReason.trim()}
// //               >
// //                 {loading ? "Processing..." : "Confirm Rejection"}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default B2C_PartnerBookingsPage;


// "use client";

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useSocket } from "../../../hooks/useSocket";
// import {
//   getPartnerBookings,
//   acceptBooking,
//   rejectBooking,
//   startTrip,
//   completeBooking,
// } from "../../../Redux/slices/bookingSlice";
// import "./b2c_partnerbookingspage.css";

// const B2CPartnerBookingsPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { partnerBookings, loading } = useSelector((state) => state.booking);
//   const socket = useSocket();

//   const [activeTab, setActiveTab] = useState("overview");
//   const [activeBookingTab, setActiveBookingTab] = useState("pending");
//   const [liveLocation, setLiveLocation] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [isSharingLocation, setIsSharingLocation] = useState(false);
//   const [activeTrip, setActiveTrip] = useState(null);
//   const locationIntervalRef = useRef(null);

//   const [stats, setStats] = useState({
//     totalTrips: 0,
//     totalEarnings: 0,
//     todayTrips: 0,
//     todayEarnings: 0,
//     rating: 4.5,
//     partnerCommission: 0,
//   });

//   const fetchB2CDriverBookings = useCallback(() => {
//     dispatch(getPartnerBookings());
//   }, [dispatch]);

//   const updateLocation = useCallback(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const location = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//             driverId: user._id,
//           };

//           // Emit location to server
//           if (socket && socket.socket) {
//             socket.socket.emit("update-location", location);
//           }

//           setLiveLocation(location);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//         },
//       );
//     }
//   }, [socket, user._id]);

//   const startAutomaticLocationSharing = useCallback(() => {
//     if (isSharingLocation) return;

//     setIsSharingLocation(true);
//     console.log(
//       "🚗 Starting automatic location sharing for B2C Partner Driver",
//     );

//     updateLocation();

//     locationIntervalRef.current = setInterval(() => {
//       updateLocation();
//     }, 5000);

//     if (socket && socket.socket) {
//       socket.socket.emit("join-driver-room", user._id);
//     }
//   }, [isSharingLocation, socket, user._id, updateLocation]);

//   const stopAutomaticLocationSharing = useCallback(() => {
//     if (!isSharingLocation) return;

//     setIsSharingLocation(false);
//     console.log("🛑 Stopping automatic location sharing");

//     if (locationIntervalRef.current) {
//       clearInterval(locationIntervalRef.current);
//       locationIntervalRef.current = null;
//     }

//     setActiveTrip(null);
//   }, [isSharingLocation]);

//   const handleAcceptBooking = useCallback(
//     (bookingId) => {
//       dispatch(acceptBooking(bookingId));
//     },
//     [dispatch],
//   );

//   const handleRejectBooking = useCallback(
//     (bookingId) => {
//       dispatch(rejectBooking({ bookingId, rejectionReason: "" }));
//     },
//     [dispatch],
//   );

//   const handleStartTrip = useCallback(
//     (bookingId) => {
//       dispatch(startTrip(bookingId));
//       // Start location sharing when trip starts
//       const booking = partnerBookings.find((b) => b._id === bookingId);
//       if (booking) {
//         setActiveTrip(booking);
//         startAutomaticLocationSharing();
//       }
//     },
//     [dispatch, partnerBookings, startAutomaticLocationSharing],
//   );

//   const handleCompleteBooking = useCallback(
//     (bookingId) => {
//       dispatch(completeBooking(bookingId));
//       // Stop location sharing when trip completes
//       stopAutomaticLocationSharing();
//       setActiveTrip(null);
//       // Update stats after completion
//       fetchB2CDriverBookings();
//     },
//     [dispatch, fetchB2CDriverBookings, stopAutomaticLocationSharing],
//   );

//   useEffect(() => {
//     // Fetch B2C driver's bookings asynchronously to avoid cascading renders
//     setTimeout(() => {
//       fetchB2CDriverBookings();
//     }, 0);
//   }, [fetchB2CDriverBookings]);

//   useEffect(() => {
//     if (!socket || !socket.socket) return;

//     // Join driver's room
//     if (user?._id) {
//       socket.socket.emit("join-driver-room", user._id);
//     }

//     // Listen for new bookings
//     socket.socket.on("new-b2c-booking", (booking) => {
//       // Redux will handle updating the partnerBookings state
//       setNotifications((prev) => [
//         {
//           id: Date.now(),
//           type: "new_booking",
//           message: `New booking request from ${booking.passengerName}`,
//           time: new Date(),
//         },
//         ...prev,
//       ]);
//     });

//     // Listen for location updates
//     socket.socket.on("location-update", (location) => {
//       setLiveLocation(location);
//     });

//     return () => {
//       if (socket.socket) {
//         socket.socket.off("new-b2c-booking");
//         socket.socket.off("location-update");
//       }
//     };
//   }, [socket, user._id]);

//   // Check for active trips and start/stop location sharing
//   useEffect(() => {
//     const activeTrips = partnerBookings.filter(
//       (booking) => booking.bookingStatus === "IN_PROGRESS",
//     );

//     if (activeTrips.length > 0 && !isSharingLocation) {
//       setTimeout(() => {
//         setActiveTrip(activeTrips[0]);
//         startAutomaticLocationSharing();
//       }, 0);
//     } else if (activeTrips.length === 0 && isSharingLocation) {
//       setTimeout(() => {
//         setActiveTrip(null);
//         stopAutomaticLocationSharing();
//       }, 0);
//     }
//   }, [
//     partnerBookings,
//     isSharingLocation,
//     startAutomaticLocationSharing,
//     stopAutomaticLocationSharing,
//   ]);

//   // Cleanup location sharing on component unmount
//   useEffect(() => {
//     return () => {
//       if (locationIntervalRef.current) {
//         clearInterval(locationIntervalRef.current);
//         locationIntervalRef.current = null;
//       }
//       stopAutomaticLocationSharing();
//     };
//   }, [stopAutomaticLocationSharing]);

//   // Filter bookings by status
//   const pendingBookings = partnerBookings.filter(
//     (booking) => booking.bookingStatus === "PENDING",
//   );
//   const confirmedBookings = partnerBookings.filter(
//     (booking) => booking.bookingStatus === "CONFIRMED",
//   );
//   const inProgressBookings = partnerBookings.filter(
//     (booking) => booking.bookingStatus === "IN_PROGRESS",
//   );
//   const completedBookings = partnerBookings.filter(
//     (booking) => booking.bookingStatus === "COMPLETED",
//   );

//   return (
//     <div className="b2c-partner-driver-dashboard">
//       <div className="dashboard-header">
//         <div className="header-content">
//           <h1>B2C Partner Driver Dashboard</h1>
//           <div className="driver-info">
//             <span className="driver-name">
//               {user?.fullName || "B2C Partner Driver"}
//             </span>
//             <span className="partner-badge">B2C Partner</span>
//             <span
//               className={`location-status ${isSharingLocation ? "sharing" : "not-sharing"}`}
//             >
//               {isSharingLocation
//                 ? "🟢 Location Sharing Active"
//                 : "🔴 Location Sharing Inactive"}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="dashboard-tabs">
//         <button
//           className={`tab ${activeTab === "overview" ? "active" : ""}`}
//           onClick={() => setActiveTab("overview")}
//         >
//           Overview
//         </button>
//         <button
//           className={`tab ${activeTab === "bookings" ? "active" : ""}`}
//           onClick={() => setActiveTab("bookings")}
//         >
//           Bookings
//         </button>
//         <button
//           className={`tab ${activeTab === "notifications" ? "active" : ""}`}
//           onClick={() => setActiveTab("notifications")}
//         >
//           Notifications ({notifications.length})
//         </button>
//         <button
//           className={`tab ${activeTab === "location" ? "active" : ""}`}
//           onClick={() => setActiveTab("location")}
//         >
//           Live Location
//         </button>
//       </div>

//       <div className="dashboard-content">
//         {activeTab === "overview" && (
//           <div className="overview-section">
//             <div className="stats-grid">
//               <div className="stat-card">
//                 <h3>Total Trips</h3>
//                 <p className="stat-value">{stats.totalTrips}</p>
//               </div>
//               <div className="stat-card">
//                 <h3>Total Earnings</h3>
//                 <p className="stat-value">${stats.totalEarnings}</p>
//               </div>
//               <div className="stat-card">
//                 <h3>Today's Trips</h3>
//                 <p className="stat-value">{stats.todayTrips}</p>
//               </div>
//               <div className="stat-card">
//                 <h3>Today's Earnings</h3>
//                 <p className="stat-value">${stats.todayEarnings}</p>
//               </div>
//               <div className="stat-card">
//                 <h3>Rating</h3>
//                 <p className="stat-value">⭐ {stats.rating}</p>
//               </div>
//               <div className="stat-card">
//                 <h3>Partner Commission</h3>
//                 <p className="stat-value">${stats.partnerCommission}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "bookings" && (
//           <div className="bookings-section">
//             <div className="booking-tabs">
//               <button
//                 className={`booking-tab ${activeBookingTab === "pending" ? "active" : ""}`}
//                 onClick={() => setActiveBookingTab("pending")}
//               >
//                 Pending Bookings
//               </button>
//               <button
//                 className={`booking-tab ${activeBookingTab === "confirmed" ? "active" : ""}`}
//                 onClick={() => setActiveBookingTab("confirmed")}
//               >
//                 Confirmed Bookings
//               </button>
//               <button
//                 className={`booking-tab ${activeBookingTab === "in-progress" ? "active" : ""}`}
//                 onClick={() => setActiveBookingTab("in-progress")}
//               >
//                 In Progress
//               </button>
//               <button
//                 className={`booking-tab ${activeBookingTab === "completed" ? "active" : ""}`}
//                 onClick={() => setActiveBookingTab("completed")}
//               >
//                 Completed
//               </button>
//             </div>

//             <div className="booking-cards">
//               {loading ? (
//                 <div className="loading-indicator">
//                   <div className="spinner"></div>
//                   <p>Loading bookings...</p>
//                 </div>
//               ) : (
//                 <>
//                   {activeBookingTab === "pending" && (
//                     <div className="booking-card">
//                       <h3>Pending Bookings</h3>
//                       <div className="booking-list">
//                         {pendingBookings.length === 0 ? (
//                           <p className="no-bookings">No pending bookings</p>
//                         ) : (
//                           pendingBookings.map((booking) => (
//                             <div
//                               key={booking._id}
//                               className="booking-item pending"
//                             >
//                               <div className="booking-details">
//                                 <p>
//                                   <strong>Passenger:</strong>{" "}
//                                   {booking.passengerName}
//                                 </p>
//                                 <p>
//                                   <strong>Pickup:</strong>{" "}
//                                   {booking.pickupLocation}
//                                 </p>
//                                 <p>
//                                   <strong>Dropoff:</strong>{" "}
//                                   {booking.dropoffLocation}
//                                 </p>
//                                 <p>
//                                   <strong>Fare:</strong> $
//                                   {booking.paymentAmount}
//                                 </p>
//                                 <p>
//                                   <strong>Distance:</strong> {booking.distance}{" "}
//                                   km
//                                 </p>
//                                 <p>
//                                   <strong>Requested:</strong>{" "}
//                                   {new Date(booking.createdAt).toLocaleString()}
//                                 </p>
//                               </div>
//                               <div className="booking-actions">
//                                 <button
//                                   onClick={() =>
//                                     handleAcceptBooking(booking._id)
//                                   }
//                                   className="accept-btn"
//                                 >
//                                   Accept
//                                 </button>
//                                 <button
//                                   onClick={() =>
//                                     handleRejectBooking(booking._id)
//                                   }
//                                   className="reject-btn"
//                                 >
//                                   Reject
//                                 </button>
//                               </div>
//                             </div>
//                           ))
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {activeBookingTab === "confirmed" && (
//                     <div className="booking-card">
//                       <h3>Confirmed Bookings</h3>
//                       <div className="booking-list">
//                         {confirmedBookings.length === 0 ? (
//                           <p className="no-bookings">No confirmed bookings</p>
//                         ) : (
//                           confirmedBookings.map((booking) => (
//                             <div
//                               key={booking._id}
//                               className="booking-item confirmed"
//                             >
//                               <div className="booking-details">
//                                 <p>
//                                   <strong>Passenger:</strong>{" "}
//                                   {booking.passengerName}
//                                 </p>
//                                 <p>
//                                   <strong>Pickup:</strong>{" "}
//                                   {booking.pickupLocation}
//                                 </p>
//                                 <p>
//                                   <strong>Dropoff:</strong>{" "}
//                                   {booking.dropoffLocation}
//                                 </p>
//                                 <p>
//                                   <strong>Fare:</strong> $
//                                   {booking.paymentAmount}
//                                 </p>
//                                 <p>
//                                   <strong>Distance:</strong> {booking.distance}{" "}
//                                   km
//                                 </p>
//                                 <p>
//                                   <strong>Scheduled:</strong>{" "}
//                                   {new Date(
//                                     booking.scheduledTime,
//                                   ).toLocaleString()}
//                                 </p>
//                               </div>
//                               <div className="booking-actions">
//                                 <button
//                                   onClick={() => handleStartTrip(booking._id)}
//                                   className="start-btn"
//                                 >
//                                   Start Trip
//                                 </button>
//                               </div>
//                             </div>
//                           ))
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {activeBookingTab === "in-progress" && (
//                     <div className="booking-card">
//                       <h3>In Progress Bookings</h3>
//                       <div className="booking-list">
//                         {inProgressBookings.length === 0 ? (
//                           <p className="no-bookings">No in-progress bookings</p>
//                         ) : (
//                           inProgressBookings.map((booking) => (
//                             <div
//                               key={booking._id}
//                               className="booking-item in-progress"
//                             >
//                               <div className="booking-details">
//                                 <p>
//                                   <strong>Passenger:</strong>{" "}
//                                   {booking.passengerName}
//                                 </p>
//                                 <p>
//                                   <strong>Pickup:</strong>{" "}
//                                   {booking.pickupLocation}
//                                 </p>
//                                 <p>
//                                   <strong>Dropoff:</strong>{" "}
//                                   {booking.dropoffLocation}
//                                 </p>
//                                 <p>
//                                   <strong>Fare:</strong> $
//                                   {booking.paymentAmount}
//                                 </p>
//                                 <p>
//                                   <strong>Started:</strong>{" "}
//                                   {new Date(booking.startedAt).toLocaleString()}
//                                 </p>
//                               </div>
//                               <div className="booking-actions">
//                                 <button
//                                   onClick={() =>
//                                     handleCompleteBooking(booking._id)
//                                   }
//                                   className="complete-btn"
//                                 >
//                                   Complete Trip
//                                 </button>
//                               </div>
//                             </div>
//                           ))
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {activeBookingTab === "completed" && (
//                     <div className="booking-card">
//                       <h3>Completed Bookings</h3>
//                       <div className="booking-list">
//                         {completedBookings.length === 0 ? (
//                           <p className="no-bookings">No completed bookings</p>
//                         ) : (
//                           completedBookings.map((booking) => (
//                             <div
//                               key={booking._id}
//                               className="booking-item completed"
//                             >
//                               <div className="booking-details">
//                                 <p>
//                                   <strong>Passenger:</strong>{" "}
//                                   {booking.passengerName}
//                                 </p>
//                                 <p>
//                                   <strong>Pickup:</strong>{" "}
//                                   {booking.pickupLocation}
//                                 </p>
//                                 <p>
//                                   <strong>Dropoff:</strong>{" "}
//                                   {booking.dropoffLocation}
//                                 </p>
//                                 <p>
//                                   <strong>Fare:</strong> $
//                                   {booking.paymentAmount}
//                                 </p>
//                                 <p>
//                                   <strong>Earnings:</strong> $
//                                   {booking.driverEarnings}
//                                 </p>
//                                 <p>
//                                   <strong>Completed:</strong>{" "}
//                                   {new Date(
//                                     booking.completedAt,
//                                   ).toLocaleString()}
//                                 </p>
//                               </div>
//                             </div>
//                           ))
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         {activeTab === "notifications" && (
//           <div className="notifications-section">
//             <h3>Notifications</h3>
//             <div className="notification-list">
//               {notifications.map((notification) => (
//                 <div key={notification.id} className="notification-item">
//                   <div className="notification-content">
//                     <p>{notification.message}</p>
//                     <span className="notification-time">
//                       {new Date(notification.time).toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "location" && (
//           <div className="location-section">
//             <h3>Live Location Tracking</h3>
//             {liveLocation ? (
//               <div className="location-info">
//                 <p>
//                   <strong>Current Latitude:</strong> {liveLocation.lat}
//                 </p>
//                 <p>
//                   <strong>Current Longitude:</strong> {liveLocation.lng}
//                 </p>
//                 <p>
//                   <strong>Last Updated:</strong> {new Date().toLocaleString()}
//                 </p>
//                 <div className="location-map">
//                   <iframe
//                     title="Live Location Map"
//                     width="100%"
//                     height="400"
//                     frameBorder="0"
//                     src={`https://www.openstreetmap.org/export/embed.html?bbox=${liveLocation.lng - 0.01},${liveLocation.lat - 0.01},${liveLocation.lng + 0.01},${liveLocation.lat + 0.01}&layer=mapnik&marker=${liveLocation.lat},${liveLocation.lng}`}
//                     style={{ border: 0 }}
//                     allowFullScreen
//                   />
//                 </div>
//               </div>
//             ) : (
//               <div className="no-location">
//                 <p>
//                   No location data available. Click "Update Location" to share
//                   your location.
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default B2CPartnerBookingsPage;

// "use client";

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useSocket } from "../../../hooks/useSocket";
// import {
//   getPartnerBookings,
//   acceptBooking,
//   rejectBooking,
//   startTrip,
//   completeBooking,
// } from "../../../Redux/slices/bookingSlice";
// import "./b2c_partnerbookingspage.css";

// const B2CPartnerBookingsPage = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   // eslint-disable-next-line no-unused-vars
//   const { partnerBookings, loading } = useSelector((state) => state.booking);
//   const socket = useSocket();

//   const [liveLocation, setLiveLocation] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [activeBookingTab, setActiveBookingTab] = useState("pending");
//   const [activeMainTab, setActiveMainTab] = useState("bookings");
//   const [isSharingLocation, setIsSharingLocation] = useState(false);
//   const [activeTrip, setActiveTrip] = useState(null);
//   const locationIntervalRef = useRef(null);

//   const updateLocation = useCallback(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const location = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//             driverId: user._id,
//             timestamp: new Date().toISOString(),
//             driverType: "B2C_PARTNER",
//           };

//           // Emit location to server
//           if (socket && socket.socket) {
//             socket.socket.emit("update-location", location);
//             console.log("📍 B2C Partner Location emitted:", location);
//           }

//           setLiveLocation(location);
//           console.log("📍 B2C Partner Location updated:", location);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 5000,
//           maximumAge: 0,
//         },
//       );
//     }
//   }, [socket, user._id]);

//   const startAutomaticLocationSharing = useCallback(() => {
//     if (isSharingLocation) return;

//     setIsSharingLocation(true);
//     console.log(
//       "🚗 Starting automatic location sharing for B2C Partner Driver",
//     );

//     updateLocation();

//     locationIntervalRef.current = setInterval(() => {
//       updateLocation();
//     }, 5000);

//     if (socket && socket.socket) {
//       socket.socket.emit("join-driver-room", user._id);
//     }
//   }, [isSharingLocation, socket, user._id, updateLocation]);

//   const stopAutomaticLocationSharing = useCallback(() => {
//     if (!isSharingLocation) return;

//     setIsSharingLocation(false);
//     console.log("🛑 Stopping automatic location sharing");

//     if (locationIntervalRef.current) {
//       clearInterval(locationIntervalRef.current);
//       locationIntervalRef.current = null;
//     }

//     setActiveTrip(null);
//   }, [isSharingLocation]);

//   const fetchB2CDriverBookings = useCallback(async () => {
//     try {
//       await dispatch(getPartnerBookings()).unwrap();

//       // Check for active trips after fetching bookings
//       const inProgressTrips = partnerBookings.filter(
//         (booking) => booking.bookingStatus === "IN_PROGRESS",
//       );

//       const confirmedTrips = partnerBookings.filter(
//         (booking) => booking.bookingStatus === "CONFIRMED",
//       );

//       if (
//         (inProgressTrips.length > 0 || confirmedTrips.length > 0) &&
//         !isSharingLocation
//       ) {
//         startAutomaticLocationSharing();
//       }

//       if (inProgressTrips.length > 0) {
//         setActiveTrip(inProgressTrips[0]);
//       } else if (confirmedTrips.length > 0) {
//         setActiveTrip(confirmedTrips[0]);
//       }
//     } catch (error) {
//       console.error("Error fetching B2C partner bookings:", error);
//     }
//   }, [
//     dispatch,
//     partnerBookings,
//     isSharingLocation,
//     startAutomaticLocationSharing,
//   ]);

//   const handleAcceptBooking = useCallback(
//     (bookingId) => {
//       dispatch(acceptBooking(bookingId));
//       setNotifications((prev) => [
//         {
//           id: Date.now(),
//           title: "Booking Accepted",
//           message: `You have accepted booking ${bookingId}`,
//           timestamp: new Date().toISOString(),
//         },
//         ...prev,
//       ]);
//     },
//     [dispatch],
//   );

//   const handleRejectBooking = useCallback(
//     (bookingId) => {
//       dispatch(rejectBooking({ bookingId, rejectionReason: "" }));
//       setNotifications((prev) => [
//         {
//           id: Date.now(),
//           title: "Booking Rejected",
//           message: `You have rejected booking ${bookingId}`,
//           timestamp: new Date().toISOString(),
//         },
//         ...prev,
//       ]);
//     },
//     [dispatch],
//   );

//   const handleStartTrip = useCallback(
//     (bookingId) => {
//       dispatch(startTrip(bookingId));

//       // Set active trip and start location sharing
//       const booking = partnerBookings.find((b) => b._id === bookingId);
//       if (booking) {
//         setActiveTrip(booking);
//         if (!isSharingLocation) {
//           startAutomaticLocationSharing();
//         }
//       }
//     },
//     [
//       dispatch,
//       partnerBookings,
//       isSharingLocation,
//       startAutomaticLocationSharing,
//     ],
//   );

//   const handleCompleteBooking = useCallback(
//     (bookingId) => {
//       dispatch(completeBooking(bookingId));

//       // Check for remaining active trips
//       const remainingTrips = partnerBookings.filter(
//         (booking) =>
//           booking._id !== bookingId &&
//           (booking.bookingStatus === "CONFIRMED" ||
//             booking.bookingStatus === "IN_PROGRESS"),
//       );

//       if (remainingTrips.length === 0) {
//         stopAutomaticLocationSharing();
//         setActiveTrip(null);
//       } else {
//         setActiveTrip(remainingTrips[0]);
//       }
//     },
//     [dispatch, partnerBookings, stopAutomaticLocationSharing],
//   );

//   useEffect(() => {
//     // Fetch B2C driver's bookings asynchronously to avoid cascading renders
//     setTimeout(() => {
//       fetchB2CDriverBookings();
//     }, 10000000);
//   }, [fetchB2CDriverBookings]);

//   useEffect(() => {
//     if (!socket || !socket.socket) return;

//     // Join driver's room
//     if (user?._id) {
//       socket.socket.emit("join-driver-room", user._id);
//     }

//     // Listen for new bookings
//     socket.socket.on("new-b2c-booking", (booking) => {
//       console.log("📱 New B2C booking received:", booking);
//       // Redux will handle updating the partnerBookings state
//       setNotifications((prev) => [
//         {
//           id: Date.now(),
//           title: "New Booking Request",
//           message: `New booking from ${booking.passengerName}`,
//           timestamp: new Date().toISOString(),
//         },
//         ...prev,
//       ]);

//       // Start location sharing for new booking
//       if (!isSharingLocation) {
//         startAutomaticLocationSharing();
//       }
//     });

//     // Listen for location updates
//     socket.socket.on("location-update", (location) => {
//       console.log("📍 B2C Location update received:", location);
//       setLiveLocation(location);
//     });

//     return () => {
//       if (socket.socket) {
//         socket.socket.off("new-b2c-booking");
//         socket.socket.off("location-update");
//       }
//     };
//   }, [socket, user._id, isSharingLocation, startAutomaticLocationSharing]);

//   // Check for active trips and start/stop location sharing
//   useEffect(() => {
//     const activeTrips = partnerBookings.filter(
//       (booking) =>
//         booking.bookingStatus === "IN_PROGRESS" ||
//         booking.bookingStatus === "CONFIRMED",
//     );

//     if (activeTrips.length > 0 && !isSharingLocation) {
//       setTimeout(() => {
//         setActiveTrip(activeTrips[0]);
//         startAutomaticLocationSharing();
//         console.log(
//           "🚀 Auto-started location sharing for B2C bookings:",
//           activeTrips.length,
//           "active trips",
//         );
//       }, 0);
//     } else if (activeTrips.length === 0 && isSharingLocation) {
//       setTimeout(() => {
//         setActiveTrip(null);
//         stopAutomaticLocationSharing();
//         console.log("🛑 Auto-stopped location sharing - no active B2C trips");
//       }, 0);
//     }
//   }, [
//     partnerBookings,
//     isSharingLocation,
//     startAutomaticLocationSharing,
//     stopAutomaticLocationSharing,
//   ]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (locationIntervalRef.current) {
//         clearInterval(locationIntervalRef.current);
//       }
//     };
//   }, []);

//   const filteredBookings = partnerBookings.filter((booking) => {
//     switch (activeBookingTab) {
//       case "pending":
//         return booking.bookingStatus === "PENDING";
//       case "confirmed":
//         return booking.bookingStatus === "CONFIRMED";
//       case "in-progress":
//         return booking.bookingStatus === "IN_PROGRESS";
//       case "completed":
//         return booking.bookingStatus === "COMPLETED";
//       default:
//         return false;
//     }
//   });

//   return (
//     <div className="b2c-partner-driver-dashboard">
//       <div className="dashboard-header">
//         <h1>B2C Partner Driver Dashboard</h1>
//         <div className="driver-info">
//           <span>Welcome, {user?.fullName || user?.name}</span>
//           <div
//             className={`location-status ${isSharingLocation ? "active" : ""}`}
//           >
//             📍 {isSharingLocation ? "Sharing Live" : "Not Sharing"}
//           </div>
//         </div>
//       </div>

//       <div className="dashboard-tabs">
//         <button
//           className={`tab ${activeMainTab === "bookings" ? "active" : ""}`}
//           onClick={() => setActiveMainTab("bookings")}
//         >
//           Bookings
//         </button>
//         <button
//           className={`tab ${activeMainTab === "notifications" ? "active" : ""}`}
//           onClick={() => setActiveMainTab("notifications")}
//         >
//           Notifications ({notifications.length})
//         </button>
//         <button
//           className={`tab ${activeMainTab === "location" ? "active" : ""}`}
//           onClick={() => setActiveMainTab("location")}
//         >
//           Live Location
//         </button>
//       </div>

//       <div className="dashboard-content">
//         {activeMainTab === "bookings" && (
//           <div className="bookings-section">
//             <div className="booking-tabs">
//               <button
//                 className={`booking-tab ${activeBookingTab === "pending" ? "active" : ""}`}
//                 onClick={() => setActiveBookingTab("pending")}
//               >
//                 Pending Bookings
//               </button>
//               <button
//                 className={`booking-tab ${activeBookingTab === "confirmed" ? "active" : ""}`}
//                 onClick={() => setActiveBookingTab("confirmed")}
//               >
//                 Confirmed Bookings
//               </button>
//               <button
//                 className={`booking-tab ${activeBookingTab === "in-progress" ? "active" : ""}`}
//                 onClick={() => setActiveBookingTab("in-progress")}
//               >
//                 In Progress
//               </button>
//               <button
//                 className={`booking-tab ${activeBookingTab === "completed" ? "active" : ""}`}
//                 onClick={() => setActiveBookingTab("completed")}
//               >
//                 Completed
//               </button>
//             </div>

//             <div className="booking-cards">
//               {activeBookingTab === "pending" && (
//                 <div className="booking-card">
//                   <h3>Pending Bookings</h3>
//                   <div className="booking-list">
//                     {filteredBookings.length > 0 ? (
//                       filteredBookings.map((booking) => (
//                         <div key={booking._id} className="booking-item pending">
//                           <div className="booking-details">
//                             <p>
//                               <strong>Passenger:</strong>{" "}
//                               {booking.passengerName}
//                             </p>
//                             <p>
//                               <strong>Pickup:</strong> {booking.pickupLocation}
//                             </p>
//                             <p>
//                               <strong>Dropoff:</strong>{" "}
//                               {booking.dropoffLocation}
//                             </p>
//                             <p>
//                               <strong>Time:</strong> {booking.travelTime}
//                             </p>
//                             <p>
//                               <strong>Price:</strong> ₹{booking.price}
//                             </p>
//                             <p>
//                               <strong>Distance:</strong> {booking.distance}
//                             </p>
//                           </div>
//                           <div className="booking-actions">
//                             <button
//                               onClick={() => handleAcceptBooking(booking._id)}
//                               className="accept-btn"
//                             >
//                               Accept
//                             </button>
//                             <button
//                               onClick={() => handleRejectBooking(booking._id)}
//                               className="reject-btn"
//                             >
//                               Reject
//                             </button>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="no-bookings">
//                         <p>No pending bookings</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {activeBookingTab === "confirmed" && (
//                 <div className="booking-card">
//                   <h3>Confirmed Bookings</h3>
//                   <div className="booking-list">
//                     {filteredBookings.length > 0 ? (
//                       filteredBookings.map((booking) => (
//                         <div
//                           key={booking._id}
//                           className="booking-item confirmed"
//                         >
//                           <div className="booking-details">
//                             <p>
//                               <strong>Passenger:</strong>{" "}
//                               {booking.passengerName}
//                             </p>
//                             <p>
//                               <strong>Pickup:</strong> {booking.pickupLocation}
//                             </p>
//                             <p>
//                               <strong>Dropoff:</strong>{" "}
//                               {booking.dropoffLocation}
//                             </p>
//                             <p>
//                               <strong>Time:</strong> {booking.travelTime}
//                             </p>
//                             <p>
//                               <strong>Price:</strong> ₹{booking.price}
//                             </p>
//                           </div>
//                           <div className="booking-actions">
//                             <button
//                               onClick={() => handleStartTrip(booking._id)}
//                               className="start-btn"
//                             >
//                               Start Trip
//                             </button>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="no-bookings">
//                         <p>No confirmed bookings</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {activeBookingTab === "in-progress" && (
//                 <div className="booking-card">
//                   <h3>In Progress Trips</h3>
//                   <div className="booking-list">
//                     {filteredBookings.length > 0 ? (
//                       filteredBookings.map((booking) => (
//                         <div
//                           key={booking._id}
//                           className="booking-item in-progress"
//                         >
//                           <div className="booking-details">
//                             <p>
//                               <strong>Passenger:</strong>{" "}
//                               {booking.passengerName}
//                             </p>
//                             <p>
//                               <strong>Pickup:</strong> {booking.pickupLocation}
//                             </p>
//                             <p>
//                               <strong>Dropoff:</strong>{" "}
//                               {booking.dropoffLocation}
//                             </p>
//                             <p>
//                               <strong>Time:</strong> {booking.travelTime}
//                             </p>
//                             <p>
//                               <strong>Price:</strong> ₹{booking.price}
//                             </p>
//                             <div className="status-badge in-progress">
//                               In Progress
//                             </div>
//                           </div>
//                           <div className="booking-actions">
//                             <button
//                               onClick={() => handleCompleteBooking(booking._id)}
//                               className="complete-btn"
//                             >
//                               Complete Trip
//                             </button>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="no-bookings">
//                         <p>No trips in progress</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {activeBookingTab === "completed" && (
//                 <div className="booking-card">
//                   <h3>Completed Trips</h3>
//                   <div className="booking-list">
//                     {filteredBookings.length > 0 ? (
//                       filteredBookings.map((booking) => (
//                         <div
//                           key={booking._id}
//                           className="booking-item completed"
//                         >
//                           <div className="booking-details">
//                             <p>
//                               <strong>Passenger:</strong>{" "}
//                               {booking.passengerName}
//                             </p>
//                             <p>
//                               <strong>Pickup:</strong> {booking.pickupLocation}
//                             </p>
//                             <p>
//                               <strong>Dropoff:</strong>{" "}
//                               {booking.dropoffLocation}
//                             </p>
//                             <p>
//                               <strong>Time:</strong> {booking.travelTime}
//                             </p>
//                             <p>
//                               <strong>Price:</strong> ₹{booking.price}
//                             </p>
//                             <div className="status-badge completed">
//                               Completed
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="no-bookings">
//                         <p>No completed trips</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {activeMainTab === "notifications" && (
//           <div className="notifications-section">
//             <h3>Notifications</h3>
//             <div className="notification-list">
//               {notifications.length > 0 ? (
//                 notifications.map((notification, index) => (
//                   <div key={index} className="notification-item">
//                     <h4>{notification.title}</h4>
//                     <p>{notification.message}</p>
//                     <div className="time">
//                       {new Date(notification.timestamp).toLocaleString()}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="no-notifications">
//                   <p>No notifications</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {activeMainTab === "location" && (
//           <div className="location-section">
//             <h3>Live Location Tracking</h3>
//             <div className="location-info">
//               <p>
//                 <strong>Status:</strong>{" "}
//                 {isSharingLocation ? (
//                   <span style={{ color: "#28a745" }}>
//                     🟢 Actively sharing location
//                   </span>
//                 ) : (
//                   <span style={{ color: "#ffc107" }}>
//                     🟡 Not sharing location
//                   </span>
//                 )}
//               </p>
//               {liveLocation && (
//                 <>
//                   <p>
//                     <strong>Current Location:</strong>{" "}
//                     {liveLocation.lat?.toFixed(6)},{" "}
//                     {liveLocation.lng?.toFixed(6)}
//                   </p>
//                   <p>
//                     <strong>Last Updated:</strong>{" "}
//                     {new Date(liveLocation.timestamp).toLocaleTimeString()}
//                   </p>
//                 </>
//               )}
//               {activeTrip && (
//                 <p>
//                   <strong>Active Trip:</strong> {activeTrip.pickupLocation} →{" "}
//                   {activeTrip.dropoffLocation}
//                 </p>
//               )}
//             </div>

//             <div className="location-map">
//               {liveLocation ? (
//                 <iframe
//                   src={`https://www.openstreetmap.org/export/embed.html?bbox=${liveLocation.lng - 0.01},${liveLocation.lat - 0.01},${liveLocation.lng + 0.01},${liveLocation.lat + 0.01}&layer=mapnik&marker=${liveLocation.lat},${liveLocation.lng}`}
//                   className="live-map"
//                   width="100%"
//                   height="400"
//                   frameBorder="0"
//                   allowFullScreen
//                   title="Driver Live Location"
//                 />
//               ) : (
//                 <div className="no-location">
//                   <p>No location data available</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default B2CPartnerBookingsPage;


"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPartnerBookings,
  acceptBooking,
  rejectBooking,
  startTrip,
  completeBooking,
} from "../../../Redux/slices/bookingSlice";
import {
  getWalletBalance,
  addFundsToWallet,
} from "../../../Redux/slices/walletSlice";
import AddFundsModal from "../../../Components/B2C_Partner/AddFundsModal/AddFundsModal";
import { useSocket } from "../../../hooks/useSocket";
import "./b2c_partnerbookingspage.css";

const B2CPartnerBookingsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { partnerBookings } = useSelector((state) => state.booking);
  const { balance } = useSelector((state) => state.wallet);
  const socket = useSocket();

  const [liveLocation, setLiveLocation] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [activeBookingTab, setActiveBookingTab] = useState("pending");
  const [activeMainTab, setActiveMainTab] = useState("bookings");
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [activeTrip, setActiveTrip] = useState(null);
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const locationIntervalRef = useRef(null);

  const updateLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            driverId: user._id,
            timestamp: new Date().toISOString(),
            driverType: "B2C_PARTNER",
          };

          // Emit location to server
          if (socket && socket.socket) {
            socket.socket.emit("update-location", location);
            console.log("📍 B2C Partner Location emitted:", location);
          }

          setLiveLocation(location);
          console.log("📍 B2C Partner Location updated:", location);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    }
  }, [socket, user._id]);

  const startAutomaticLocationSharing = useCallback(() => {
    if (isSharingLocation) return;

    setIsSharingLocation(true);
    console.log(
      "🚗 Starting automatic location sharing for B2C Partner Driver",
    );

    updateLocation();

    locationIntervalRef.current = setInterval(() => {
      updateLocation();
    }, 5000);

    if (socket && socket.socket) {
      socket.socket.emit("join-driver-room", user._id);
    }
  }, [isSharingLocation, socket, user._id, updateLocation]);

  const stopAutomaticLocationSharing = useCallback(() => {
    if (!isSharingLocation) return;

    setIsSharingLocation(false);
    console.log("🛑 Stopping automatic location sharing");

    if (locationIntervalRef.current) {
      clearInterval(locationIntervalRef.current);
      locationIntervalRef.current = null;
    }

    setActiveTrip(null);
  }, [isSharingLocation]);

  const fetchB2CDriverBookings = useCallback(async () => {
    try {
      await dispatch(getPartnerBookings()).unwrap();

      // Check for active trips after fetching bookings
      const inProgressTrips = partnerBookings.filter(
        (booking) => booking.bookingStatus === "IN_PROGRESS",
      );

      const confirmedTrips = partnerBookings.filter(
        (booking) => booking.bookingStatus === "CONFIRMED",
      );

      if (
        (inProgressTrips.length > 0 || confirmedTrips.length > 0) &&
        !isSharingLocation
      ) {
        startAutomaticLocationSharing();
      }

      if (inProgressTrips.length > 0) {
        setActiveTrip(inProgressTrips[0]);
      } else if (confirmedTrips.length > 0) {
        setActiveTrip(confirmedTrips[0]);
      }
    } catch (error) {
      console.error("Error fetching B2C partner bookings:", error);
    }
  }, [
    dispatch,
    partnerBookings,
    isSharingLocation,
    startAutomaticLocationSharing,
  ]);

  const handleAcceptBooking = useCallback(
    (bookingId) => {
      dispatch(acceptBooking(bookingId))
        .unwrap()
        .then(() => {
          setNotifications((prev) => [
            {
              id: Date.now(),
              title: "Booking Accepted",
              message: `You have accepted booking ${bookingId}`,
              timestamp: new Date().toISOString(),
            },
            ...prev,
          ]);
        })
        .catch((error) => {
          console.error("Accept booking error:", error);

          if (error.requiresWalletFunding) {
            setShowAddFundsModal(true);
          } else {
            alert(error.message || "Failed to accept booking");
          }
        });
    },
    [dispatch],
  );

  const handleRejectBooking = useCallback(
    (bookingId) => {
      dispatch(rejectBooking({ bookingId, rejectionReason: "" }));
      setNotifications((prev) => [
        {
          id: Date.now(),
          title: "Booking Rejected",
          message: `You have rejected booking ${bookingId}`,
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);
    },
    [dispatch],
  );

  const handleStartTrip = useCallback(
    (bookingId) => {
      dispatch(startTrip(bookingId));

      // Set active trip and start location sharing
      const booking = partnerBookings.find((b) => b._id === bookingId);
      if (booking) {
        setActiveTrip(booking);
        if (!isSharingLocation) {
          startAutomaticLocationSharing();
        }
      }
    },
    [
      dispatch,
      partnerBookings,
      isSharingLocation,
      startAutomaticLocationSharing,
    ],
  );

  const handleCompleteBooking = useCallback(
    (bookingId) => {
      dispatch(completeBooking(bookingId));

      // Check for remaining active trips
      const remainingTrips = partnerBookings.filter(
        (booking) =>
          booking._id !== bookingId &&
          (booking.bookingStatus === "CONFIRMED" ||
            booking.bookingStatus === "IN_PROGRESS"),
      );

      if (remainingTrips.length === 0) {
        stopAutomaticLocationSharing();
        setActiveTrip(null);
      } else {
        setActiveTrip(remainingTrips[0]);
      }
    },
    [dispatch, partnerBookings, stopAutomaticLocationSharing],
  );

  const handleAddFunds = useCallback(
    async (amount) => {
      try {
        await dispatch(
          addFundsToWallet({
            amount,
            paymentMethod: "card",
          }),
        ).unwrap();

        // Refresh wallet balance
        await dispatch(getWalletBalance()).unwrap();

        setNotifications((prev) => [
          {
            id: Date.now(),
            title: "Funds Added",
            message: `Successfully added AED ${amount} to your wallet`,
            timestamp: new Date().toISOString(),
          },
          ...prev,
        ]);
      } catch (error) {
        console.error("Add funds error:", error);
        throw error;
      }
    },
    [dispatch],
  );

  useEffect(() => {
    // Fetch wallet balance
    dispatch(getWalletBalance());
  }, [dispatch]);

  useEffect(() => {
    // Fetch B2C driver's bookings asynchronously to avoid cascading renders
    setTimeout(() => {
      fetchB2CDriverBookings();
    }, 1000);
  }, [fetchB2CDriverBookings]);

  useEffect(() => {
    if (!socket || !socket.socket) return;

    // Join driver's room
    if (user?._id) {
      socket.socket.emit("join-driver-room", user._id);
    }

    // Listen for new bookings
    socket.socket.on("new-b2c-booking", (booking) => {
      console.log("📱 New B2C booking received:", booking);
      // Redux will handle updating the partnerBookings state
      setNotifications((prev) => [
        {
          id: Date.now(),
          title: "New Booking Request",
          message: `New booking from ${booking.passengerName}`,
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);

      // Start location sharing for new booking
      if (!isSharingLocation) {
        startAutomaticLocationSharing();
      }
    });

    // Listen for location updates
    socket.socket.on("location-update", (location) => {
      console.log("📍 B2C Location update received:", location);
      setLiveLocation(location);
    });

    return () => {
      if (socket.socket) {
        socket.socket.off("new-b2c-booking");
        socket.socket.off("location-update");
      }
    };
  }, [socket, user._id, isSharingLocation, startAutomaticLocationSharing]);

  // Check for active trips and start/stop location sharing
  useEffect(() => {
    const activeTrips = partnerBookings.filter(
      (booking) =>
        booking.bookingStatus === "IN_PROGRESS" ||
        booking.bookingStatus === "CONFIRMED",
    );

    if (activeTrips.length > 0 && !isSharingLocation) {
      setTimeout(() => {
        setActiveTrip(activeTrips[0]);
        startAutomaticLocationSharing();
        console.log(
          "🚀 Auto-started location sharing for B2C bookings:",
          activeTrips.length,
          "active trips",
        );
      }, 0);
    } else if (activeTrips.length === 0 && isSharingLocation) {
      setTimeout(() => {
        setActiveTrip(null);
        stopAutomaticLocationSharing();
        console.log("🛑 Auto-stopped location sharing - no active B2C trips");
      }, 0);
    }
  }, [
    partnerBookings,
    isSharingLocation,
    startAutomaticLocationSharing,
    stopAutomaticLocationSharing,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
      }
    };
  }, []);

  const filteredBookings = partnerBookings.filter((booking) => {
    switch (activeBookingTab) {
      case "pending":
        return booking.bookingStatus === "PENDING";
      case "confirmed":
        return booking.bookingStatus === "CONFIRMED";
      case "in-progress":
        return booking.bookingStatus === "IN_PROGRESS";
      case "completed":
        return booking.bookingStatus === "COMPLETED";
      default:
        return false;
    }
  });

  return (
    <div className="b2c-partner-driver-dashboard">
      <div className="dashboard-header">
        <h1>B2C Partner Driver Dashboard</h1>
        <div className="driver-info">
          <span>Welcome, {user?.fullName || user?.name}</span>
          <div
            className={`location-status ${isSharingLocation ? "active" : ""}`}
          >
            📍 {isSharingLocation ? "Sharing Live" : "Not Sharing"}
          </div>
          <div className="wallet-balance">
            💰 Wallet: AED {balance || 0}
            <button
              className="add-funds-btn"
              onClick={() => setShowAddFundsModal(true)}
            >
              + Add Funds
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab ${activeMainTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveMainTab("bookings")}
        >
          Bookings
        </button>
        <button
          className={`tab ${activeMainTab === "notifications" ? "active" : ""}`}
          onClick={() => setActiveMainTab("notifications")}
        >
          Notifications ({notifications.length})
        </button>
        <button
          className={`tab ${activeMainTab === "location" ? "active" : ""}`}
          onClick={() => setActiveMainTab("location")}
        >
          Live Location
        </button>
      </div>

      <div className="dashboard-content">
        {activeMainTab === "bookings" && (
          <div className="bookings-section">
            <div className="booking-tabs">
              <button
                className={`booking-tab ${activeBookingTab === "pending" ? "active" : ""}`}
                onClick={() => setActiveBookingTab("pending")}
              >
                Pending Bookings
              </button>
              <button
                className={`booking-tab ${activeBookingTab === "confirmed" ? "active" : ""}`}
                onClick={() => setActiveBookingTab("confirmed")}
              >
                Confirmed Bookings
              </button>
              <button
                className={`booking-tab ${activeBookingTab === "in-progress" ? "active" : ""}`}
                onClick={() => setActiveBookingTab("in-progress")}
              >
                In Progress
              </button>
              <button
                className={`booking-tab ${activeBookingTab === "completed" ? "active" : ""}`}
                onClick={() => setActiveBookingTab("completed")}
              >
                Completed
              </button>
            </div>

            <div className="booking-cards">
              {activeBookingTab === "pending" && (
                <div className="booking-card">
                  <h3>Pending Bookings</h3>
                  <div className="booking-list">
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        <div key={booking._id} className="booking-item pending">
                          <div className="booking-details">
                            <p>
                              <strong>Passenger:</strong>{" "}
                              {booking.passengerName}
                            </p>
                            <p>
                              <strong>Pickup:</strong> {booking.pickupLocation}
                            </p>
                            <p>
                              <strong>Dropoff:</strong>{" "}
                              {booking.dropoffLocation}
                            </p>
                            <p>
                              <strong>Time:</strong> {booking.travelTime}
                            </p>
                            <p>
                              <strong>Price:</strong> ₹{booking.price}
                            </p>
                            <p>
                              <strong>Distance:</strong> {booking.distance}
                            </p>
                          </div>
                          <div className="booking-actions">
                            <button
                              onClick={() => handleAcceptBooking(booking._id)}
                              className="accept-btn"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleRejectBooking(booking._id)}
                              className="reject-btn"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-bookings">
                        <p>No pending bookings</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeBookingTab === "confirmed" && (
                <div className="booking-card">
                  <h3>Confirmed Bookings</h3>
                  <div className="booking-list">
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        <div
                          key={booking._id}
                          className="booking-item confirmed"
                        >
                          <div className="booking-details">
                            <p>
                              <strong>Passenger:</strong>{" "}
                              {booking.passengerName}
                            </p>
                            <p>
                              <strong>Pickup:</strong> {booking.pickupLocation}
                            </p>
                            <p>
                              <strong>Dropoff:</strong>{" "}
                              {booking.dropoffLocation}
                            </p>
                            <p>
                              <strong>Time:</strong> {booking.travelTime}
                            </p>
                            <p>
                              <strong>Price:</strong> ₹{booking.price}
                            </p>
                          </div>
                          <div className="booking-actions">
                            <button
                              onClick={() => handleStartTrip(booking._id)}
                              className="start-btn"
                            >
                              Start Trip
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-bookings">
                        <p>No confirmed bookings</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeBookingTab === "in-progress" && (
                <div className="booking-card">
                  <h3>In Progress Trips</h3>
                  <div className="booking-list">
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        <div
                          key={booking._id}
                          className="booking-item in-progress"
                        >
                          <div className="booking-details">
                            <p>
                              <strong>Passenger:</strong>{" "}
                              {booking.passengerName}
                            </p>
                            <p>
                              <strong>Pickup:</strong> {booking.pickupLocation}
                            </p>
                            <p>
                              <strong>Dropoff:</strong>{" "}
                              {booking.dropoffLocation}
                            </p>
                            <p>
                              <strong>Time:</strong> {booking.travelTime}
                            </p>
                            <p>
                              <strong>Price:</strong> ₹{booking.price}
                            </p>
                            <div className="status-badge in-progress">
                              In Progress
                            </div>
                          </div>
                          <div className="booking-actions">
                            <button
                              onClick={() => handleCompleteBooking(booking._id)}
                              className="complete-btn"
                            >
                              Complete Trip
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-bookings">
                        <p>No trips in progress</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeBookingTab === "completed" && (
                <div className="booking-card">
                  <h3>Completed Trips</h3>
                  <div className="booking-list">
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        <div
                          key={booking._id}
                          className="booking-item completed"
                        >
                          <div className="booking-details">
                            <p>
                              <strong>Passenger:</strong>{" "}
                              {booking.passengerName}
                            </p>
                            <p>
                              <strong>Pickup:</strong> {booking.pickupLocation}
                            </p>
                            <p>
                              <strong>Dropoff:</strong>{" "}
                              {booking.dropoffLocation}
                            </p>
                            <p>
                              <strong>Time:</strong> {booking.travelTime}
                            </p>
                            <p>
                              <strong>Price:</strong> ₹{booking.price}
                            </p>
                            <p>
                              <strong>Payment Method:</strong>{" "}
                              {booking.paymentMethod}
                            </p>
                            <p>
                              <strong>Payment Status:</strong>
                              <span
                                className={`payment-status ${booking.paymentStatus?.toLowerCase()}`}
                              >
                                {booking.paymentStatus === "COMPLETED"
                                  ? "✅ Received"
                                  : booking.paymentStatus}
                              </span>
                            </p>
                            {booking.paymentMethod === "CASH" &&
                              booking.paymentReceivedAt && (
                                <p>
                                  <strong>Payment Received:</strong>{" "}
                                  {new Date(
                                    booking.paymentReceivedAt,
                                  ).toLocaleString()}
                                </p>
                              )}
                            <div className="status-badge completed">
                              Completed
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-bookings">
                        <p>No completed trips</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeMainTab === "notifications" && (
          <div className="notifications-section">
            <h3>Notifications</h3>
            <div className="notification-list">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div key={index} className="notification-item">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <div className="time">
                      {new Date(notification.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-notifications">
                  <p>No notifications</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeMainTab === "location" && (
          <div className="location-section">
            <h3>Live Location Tracking</h3>
            <div className="location-info">
              <p>
                <strong>Status:</strong>{" "}
                {isSharingLocation ? (
                  <span style={{ color: "#28a745" }}>
                    🟢 Actively sharing location
                  </span>
                ) : (
                  <span style={{ color: "#ffc107" }}>
                    🟡 Not sharing location
                  </span>
                )}
              </p>
              {liveLocation && (
                <>
                  <p>
                    <strong>Current Location:</strong>{" "}
                    {liveLocation.lat?.toFixed(6)},{" "}
                    {liveLocation.lng?.toFixed(6)}
                  </p>
                  <p>
                    <strong>Last Updated:</strong>{" "}
                    {new Date(liveLocation.timestamp).toLocaleTimeString()}
                  </p>
                </>
              )}
              {activeTrip && (
                <p>
                  <strong>Active Trip:</strong> {activeTrip.pickupLocation} →{" "}
                  {activeTrip.dropoffLocation}
                </p>
              )}
            </div>

            <div className="location-map">
              {liveLocation ? (
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${liveLocation.lng - 0.01},${liveLocation.lat - 0.01},${liveLocation.lng + 0.01},${liveLocation.lat + 0.01}&layer=mapnik&marker=${liveLocation.lat},${liveLocation.lng}`}
                  className="live-map"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  allowFullScreen
                  title="Driver Live Location"
                />
              ) : (
                <div className="no-location">
                  <p>No location data available</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <AddFundsModal
        isOpen={showAddFundsModal}
        onClose={() => setShowAddFundsModal(false)}
        currentBalance={balance}
        onAddFunds={handleAddFunds}
      />
    </div>
  );
};

export default B2CPartnerBookingsPage;

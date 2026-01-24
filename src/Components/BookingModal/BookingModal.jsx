// "use client";

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createB2CBooking,
//   createCorporateBooking,
// } from "../../Redux/slices/bookingSlice";
// import { createPayment } from "../../Redux/slices/paymentSlice";
// import "./bookingmodal.css";

// const BookingModal = ({
//   route,
//   isOpen,
//   onClose,
//   // eslint-disable-next-line no-unused-vars
//   userRole,
//   isCorporate,
//   onSuccess,
// }) => {
//   const dispatch = useDispatch();
//   const { loading, error, currentBooking, paymentData } = useSelector(
//     (state) => state.booking
//   );

//   console.log("currentBooking", currentBooking);
//   console.log("paymentData", paymentData);
//   // eslint-disable-next-line no-unused-vars
//   const { paymentUrl, paymentProvider } = useSelector((state) => state.payment);
//   const auth = useSelector((state) => state.auth);

//   const [numberOfSeats, setNumberOfSeats] = useState(1);
//   const [paymentMethod, setPaymentMethod] = useState("STRIPE");
//   const [notes, setNotes] = useState("");
//   const [step, setStep] = useState(1); // 1: Details, 2: Payment Method, 3: Processing
//   const [isProcessingPayment, setIsProcessingPayment] = useState(false);

//   const [redirectUrl, setRedirectUrl] = useState(null);

//   useEffect(() => {
//     if (redirectUrl) {
//       window.location.assign(redirectUrl);
//     }
//   }, [redirectUrl]);

//   if (!isOpen || !route) return null;

//   const calculateTotal = () => {
//     const pricePerSeat = route.monthlyPrice || 0;
//     return (pricePerSeat * numberOfSeats).toFixed(2);
//   };

//   const handleSelectPaymentMethod = async (method) => {
//     setPaymentMethod(method);
//     setIsProcessingPayment(true);

//     try {
//       // Get booking details first
//       const bookingData = {
//         partnerId: route.operatorId || route.partnerId,
//         pickupLocation: route.fromLocation,
//         dropoffLocation: route.toLocation,
//         travelDate: new Date().toISOString(),
//         numberOfSeats,
//         paymentMethod: method,
//         paymentAmount: calculateTotal(),
//         travelPath: route.travelPath,
//         vehicleModel: route.vehicleModel,
//         vehiclePlate: route.vehiclePlate,
//         driverName: route.driverName,
//         driverImage: route.driverImage,
//         passengerNotes: notes,
//       };

//       if (method !== "CASH") {
//         // Create payment through payment slice for gateway integration
//         const paymentResult = await dispatch(
//           createPayment({
//             bookingData,
//             amount: calculateTotal(),
//             paymentMethod: method,
//             currency: "AED",
//             customerEmail: auth.user.email,
//           })
//         ).unwrap();

//         console.log("[v0] Payment result:", paymentResult);

//         if (paymentResult.data?.paymentUrl) {
//           setRedirectUrl(paymentResult.data.paymentUrl);
//         } else if (paymentResult.data?.bankDetails) {
//           // Bank transfer
//           alert(
//             `Bank Transfer Details:\n\nBank: ${paymentResult.data.bankDetails.bankName}\nAccount: ${paymentResult.data.bankDetails.accountNumber}\nIBAN: ${paymentResult.data.bankDetails.iban}\nReference: ${paymentResult.data.bankDetails.reference}`
//           );
//           await handleCreateB2CBooking(bookingData);
//         }
//       } else {
//         // Cash payment - create booking directly
//         await handleCreateB2CBooking(bookingData);
//         setStep(3);
//       }
//     } catch (error) {
//       console.error("[v0] Payment selection error:", error);
//       alert(error || "Failed to process payment method");
//       setIsProcessingPayment(false);
//     }
//   };

//   const handleCreateB2CBooking = async (bookingData) => {
//     try {
//       console.log("[v0] Creating B2C booking:", bookingData);
//       await dispatch(createB2CBooking(bookingData)).unwrap();
//       setStep(3);
//       setTimeout(() => {
//         if (onSuccess) onSuccess();
//         onClose();
//       }, 1500);
//     } catch (error) {
//       console.error("[v0] B2C booking error:", error);
//       alert(error || "Failed to create booking");
//       setIsProcessingPayment(false);
//     }
//   };

//   const handleCreateCorporateBooking = async () => {
//     try {
//       const bookingData = {
//         routeId: route.routeId,
//         contractId: route.contractId,
//         corporateOwnerId: auth.user.companyId,
//         pickupLocation: route.fromLocation,
//         dropoffLocation: route.toLocation,
//         travelDate: new Date().toISOString(),
//         numberOfSeats,
//         travelPath: route.travelPath,
//         vehicleModel: route.vehicleModel,
//         vehiclePlate: route.vehiclePlate,
//         driverName: route.driverName,
//         driverImage: route.driverImage,
//         passengerNotes: notes,
//       };

//       console.log("[v0] Creating corporate booking:", bookingData);
//       await dispatch(createCorporateBooking(bookingData)).unwrap();
//       setStep(3);
//       setTimeout(() => {
//         if (onSuccess) onSuccess();
//         onClose();
//       }, 1500);
//     } catch (error) {
//       console.error("[v0] Corporate booking error:", error);
//       alert(error || "Failed to create booking");
//     }
//   };

//   const handleCreateBooking = () => {
//     if (!route || !auth.user) {
//       alert("Missing required information");
//       return;
//     }

//     if (isCorporate) {
//       handleCreateCorporateBooking();
//     } else {
//       // For B2C, go to payment method selection
//       setStep(2);
//     }
//   };

//   return (
//     <div className="booking-modal-overlay" onClick={onClose}>
//       <div
//         className="booking-modal-content"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="booking-modal-header">
//           <h2>
//             {step === 1
//               ? "Book Your Ride"
//               : step === 2
//               ? "Select Payment Method"
//               : "Booking Confirmed"}
//           </h2>
//           <button className="close-btn" onClick={onClose}>
//             ✕
//           </button>
//         </div>

//         {step === 1 ? (
//           <div className="booking-modal-body">
//             <div className="route-summary">
//               <div className="route-item">
//                 <span className="label">From:</span>
//                 <span className="value">{route.fromLocation}</span>
//               </div>
//               <div className="route-item">
//                 <span className="label">To:</span>
//                 <span className="value">{route.toLocation}</span>
//               </div>
//               <div className="route-item">
//                 <span className="label">Driver:</span>
//                 <span className="value">{route.driverName}</span>
//               </div>
//               <div className="route-item">
//                 <span className="label">Vehicle:</span>
//                 <span className="value">{route.vehicleModel}</span>
//               </div>
//             </div>

//             <div className="booking-form">
//               <div className="form-group">
//                 <label>Number of Seats</label>
//                 <input
//                   type="number"
//                   min="1"
//                   max={route.availableSeats || 5}
//                   value={numberOfSeats}
//                   onChange={(e) =>
//                     setNumberOfSeats(Number.parseInt(e.target.value))
//                   }
//                 />
//               </div>

//               {!isCorporate && (
//                 <div className="form-group">
//                   <label>Additional Notes (Optional)</label>
//                   <textarea
//                     value={notes}
//                     onChange={(e) => setNotes(e.target.value)}
//                     placeholder="Any special requirements..."
//                   />
//                 </div>
//               )}

//               <div className="price-summary">
//                 <div className="price-row">
//                   <span>Price per seat:</span>
//                   <span>AED {(route.monthlyPrice || 0).toFixed(2)}</span>
//                 </div>
//                 <div className="price-row">
//                   <span>Number of seats:</span>
//                   <span>{numberOfSeats}</span>
//                 </div>
//                 {!isCorporate && (
//                   <>
//                     <div className="price-row">
//                       <span>Admin Commission (20%):</span>
//                       <span>AED {(calculateTotal() * 0.2).toFixed(2)}</span>
//                     </div>
//                     <div className="price-row">
//                       <span>Driver Earnings (80%):</span>
//                       <span>AED {(calculateTotal() * 0.8).toFixed(2)}</span>
//                     </div>
//                   </>
//                 )}
//                 <div className="price-row total">
//                   <span>Total:</span>
//                   <span>AED {calculateTotal()}</span>
//                 </div>
//               </div>

//               {error && <div className="error-message">{error}</div>}
//             </div>

//             <div className="booking-modal-footer">
//               <button className="btn btn-secondary" onClick={onClose}>
//                 Cancel
//               </button>
//               <button
//                 className="btn btn-primary"
//                 onClick={handleCreateBooking}
//                 disabled={loading}
//               >
//                 {loading
//                   ? "Processing..."
//                   : isCorporate
//                   ? "Confirm Booking"
//                   : "Continue to Payment"}
//               </button>
//             </div>
//           </div>
//         ) : step === 2 ? (
//           <div className="booking-modal-body payment-step">
//             <div className="payment-summary">
//               <div className="summary-item">
//                 <span>Booking Amount:</span>
//                 <span className="amount">AED {calculateTotal()}</span>
//               </div>
//               <div className="summary-item">
//                 <span>Admin Commission (20%):</span>
//                 <span>AED {(calculateTotal() * 0.2).toFixed(2)}</span>
//               </div>
//               <div className="summary-item">
//                 <span>Driver Earnings (80%):</span>
//                 <span className="amount">
//                   AED {(calculateTotal() * 0.8).toFixed(2)}
//                 </span>
//               </div>
//             </div>

//             <div className="payment-methods-section">
//               <h3 className="section-title">Select Payment Method</h3>
//               <div className="payment-methods-list">
//                 <div
//                   className={`payment-method-card ${
//                     paymentMethod === "STRIPE" ? "active" : ""
//                   }`}
//                   onClick={() => handleSelectPaymentMethod("STRIPE")}
//                   disabled={isProcessingPayment}
//                 >
//                   <div className="method-icon">💳</div>
//                   <div className="method-name">Credit/Debit Card</div>
//                   <div className="method-provider">Stripe Payment</div>
//                 </div>

//                 <div
//                   className={`payment-method-card ${
//                     paymentMethod === "TAP" ? "active" : ""
//                   }`}
//                   onClick={() => handleSelectPaymentMethod("TAP")}
//                   disabled={isProcessingPayment}
//                 >
//                   <div className="method-icon">🏦</div>
//                   <div className="method-name">Tap Payments</div>
//                   <div className="method-provider">Card & Wallet</div>
//                 </div>

//                 <div
//                   className={`payment-method-card ${
//                     paymentMethod === "CASH" ? "active" : ""
//                   }`}
//                   onClick={() => handleSelectPaymentMethod("CASH")}
//                   disabled={isProcessingPayment}
//                 >
//                   <div className="method-icon">💵</div>
//                   <div className="method-name">Pay on Ride</div>
//                   <div className="method-provider">Cash Payment</div>
//                 </div>
//               </div>
//             </div>

//             {error && <div className="error-message">{error}</div>}

//             <div className="booking-modal-footer">
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => setStep(1)}
//                 disabled={isProcessingPayment}
//               >
//                 Back
//               </button>
//               <button
//                 className="btn btn-primary"
//                 disabled={isProcessingPayment}
//               >
//                 {isProcessingPayment
//                   ? "Processing..."
//                   : "Proceed with " + paymentMethod}
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="booking-modal-body success-step">
//             <div className="success-icon">✓</div>
//             <h3>Booking Confirmed!</h3>
//             <p className="success-message">
//               {isCorporate
//                 ? "Your corporate booking has been confirmed and sent to your company."
//                 : "Your booking has been placed successfully!"}
//             </p>
//             <div className="booking-details">
//               <div className="detail-row">
//                 <span>Pickup:</span>
//                 <span>{route.fromLocation}</span>
//               </div>
//               <div className="detail-row">
//                 <span>Dropoff:</span>
//                 <span>{route.toLocation}</span>
//               </div>
//               <div className="detail-row">
//                 <span>Seats:</span>
//                 <span>{numberOfSeats}</span>
//               </div>
//               <div className="detail-row">
//                 <span>Total Amount:</span>
//                 <span className="amount">AED {calculateTotal()}</span>
//               </div>
//             </div>
//             <div className="booking-modal-footer">
//               <button className="btn btn-primary" onClick={onClose}>
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingModal;

"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createB2CBooking,
  createCorporateBooking,
  clearBookingData,
} from "../../Redux/slices/bookingSlice";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaUser,
  FaBus,
  FaCalendarAlt,
  FaMinus,
  FaPlus,
  FaCreditCard,
  FaMoneyBillWave,
  FaUniversity,
  FaCheck,
  FaSpinner,
} from "react-icons/fa";
import "./bookingmodal.css";

const BookingModal = ({ route, isOpen, onClose, isCorporate, onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error, currentBooking, bookingCreated, paymentData } =
    useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);

  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethodRef = useRef(paymentMethod);
  const onSuccessRef = useRef(onSuccess);
  const isCorporateRef = useRef(isCorporate);

  useEffect(() => {
    paymentMethodRef.current = paymentMethod;
  }, [paymentMethod]);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    isCorporateRef.current = isCorporate;
  }, [isCorporate]);

  // Effect 1: Handle payment URL redirects
  useEffect(() => {
    if (bookingCreated && paymentData?.paymentUrl) {
      window.location.href = paymentData.paymentUrl;
    }
  }, [bookingCreated, paymentData]);

  // Effect 2: Handle step transition for CASH and CORPORATE bookings
  useEffect(() => {
    if (
      bookingCreated &&
      (paymentMethodRef.current === "CASH" || isCorporateRef.current)
    ) {
      // Defer the state update to avoid cascading renders
      queueMicrotask(() => {
        setStep(3);
        const timer = setTimeout(() => {
          if (onSuccessRef.current) onSuccessRef.current();
        }, 2000);
        return () => clearTimeout(timer);
      });
    }
  }, [bookingCreated]);

  useEffect(() => {
    return () => {
      dispatch(clearBookingData());
    };
  }, [dispatch]);

  if (!isOpen || !route) return null;

  const availableSeats = route.availableSeats ?? route.totalSeats ?? 10;
  const pricePerSeat = route.monthlyPrice || route.price || 0;
  const totalAmount = (pricePerSeat * numberOfSeats).toFixed(2);
  const adminCommission = (totalAmount * 0.2).toFixed(2);
  const driverEarnings = (totalAmount * 0.8).toFixed(2);

  const handleIncreaseSeats = () => {
    const maxSeats = isCorporate ? 1 : availableSeats;
    if (numberOfSeats < maxSeats) {
      setNumberOfSeats((prev) => prev + 1);
    }
  };

  const handleDecreaseSeats = () => {
    if (numberOfSeats > 1) {
      setNumberOfSeats((prev) => prev - 1);
    }
  };

  const handleContinueToPayment = () => {
    if (isCorporate) {
      handleCorporateBooking();
    } else {
      setStep(2);
    }
  };

  const handleSelectPaymentMethod = async (method) => {
    setPaymentMethod(method);
    setIsProcessing(true);

    const bookingData = {
      routeId: route.routeId || route.id,
      partnerId: route.operatorId || route.partnerId || route.b2cPartnerId,
      pickupLocation: route.fromLocation,
      dropoffLocation: route.toLocation,
      travelDate: new Date().toISOString(),
      numberOfSeats,
      paymentMethod: method,
      paymentAmount: Number.parseFloat(totalAmount),
      travelPath: route.travelPath || [],
      vehicleModel: route.vehicleModel,
      vehiclePlate: route.vehiclePlate,
      driverName: route.driverName,
      driverImage: route.driverImage,
      passengerNotes: notes,
    };

    try {
      await dispatch(createB2CBooking(bookingData)).unwrap();
    } catch (err) {
      console.error("Booking error:", err);
      setIsProcessing(false);
    }
  };

  const handleCorporateBooking = async () => {
    setIsProcessing(true);

    // Validate driver is assigned for corporate booking
    const driverId = route.driverId || route.assignedDriverId;
    if (!driverId) {
      console.error("No driver assigned to this corporate route");
      setIsProcessing(false);
      alert(
        "This route has no assigned driver. Please contact your company administrator.",
      );
      return;
    }

    const bookingData = {
      routeId: route.routeId || route.id,
      contractId: route.contractId || null,
      corporateOwnerId: user.companyId,
      driverId: driverId,
      pickupLocation: route.fromLocation,
      dropoffLocation: route.toLocation,
      travelDate: new Date().toISOString(),
      numberOfSeats,
      travelPath: route.travelPath || [],
      vehicleModel: route.vehicleModel,
      vehiclePlate: route.vehiclePlate,
      driverName: route.driverName,
      driverImage: route.driverImage,
      passengerNotes: notes,
    };

    try {
      await dispatch(createCorporateBooking(bookingData)).unwrap();
    } catch (err) {
      console.error("Corporate booking error:", err);
      setIsProcessing(false);
    }
  };;

  const handleClose = () => {
    dispatch(clearBookingData());
    setStep(1);
    setNumberOfSeats(1);
    setPaymentMethod("");
    setNotes("");
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="booking-modal-overlay" onClick={handleClose}>
      <div
        className="booking-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="booking-modal-header">
          <h2>
            {step === 1 && "Book Your Ride"}
            {step === 2 && "Select Payment Method"}
            {step === 3 && "Booking Confirmed"}
          </h2>
          <button className="close-btn" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>

        <div className="booking-modal-body">
          {step === 1 && (
            <div className="step-content step-details">
              <div className="route-summary-card">
                <div className="route-summary-header">
                  <h3>Route Details</h3>
                </div>
                <div className="route-summary-body">
                  <div className="summary-row">
                    <FaMapMarkerAlt className="icon from" />
                    <div className="summary-info">
                      <span className="label">Pickup</span>
                      <span className="value">{route.fromLocation}</span>
                    </div>
                  </div>
                  <div className="summary-row">
                    <FaMapMarkerAlt className="icon to" />
                    <div className="summary-info">
                      <span className="label">Dropoff</span>
                      <span className="value">{route.toLocation}</span>
                    </div>
                  </div>
                  <div className="summary-row">
                    <FaUser className="icon" />
                    <div className="summary-info">
                      <span className="label">Driver</span>
                      <span className="value">
                        {route.driverName || "Assigned Driver"}
                      </span>
                    </div>
                  </div>
                  <div className="summary-row">
                    <FaBus className="icon" />
                    <div className="summary-info">
                      <span className="label">Vehicle</span>
                      <span className="value">
                        {route.vehicleModel || "Bus"} -{" "}
                        {route.vehiclePlate || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="summary-row">
                    <FaCalendarAlt className="icon" />
                    <div className="summary-info">
                      <span className="label">Travel Date</span>
                      <span className="value">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="seats-selector">
                <label>Number of Seats</label>
                <div className="seats-control">
                  <button
                    className="seats-btn"
                    onClick={handleDecreaseSeats}
                    disabled={numberOfSeats <= 1}
                  >
                    <FaMinus />
                  </button>
                  <span className="seats-count">{numberOfSeats}</span>
                  <button
                    className="seats-btn"
                    onClick={handleIncreaseSeats}
                    disabled={
                      isCorporate
                        ? numberOfSeats >= 1
                        : numberOfSeats >= availableSeats
                    }
                  >
                    <FaPlus />
                  </button>
                </div>
                <span className="seats-available">
                  {isCorporate
                    ? "Corporate: 1 seat per employee"
                    : `${availableSeats} seats available`}
                </span>
              </div>

              <div className="notes-input">
                <label>Additional Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requirements or notes..."
                  rows={3}
                />
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Price per seat</span>
                  <span>AED {pricePerSeat.toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Number of seats</span>
                  <span>x {numberOfSeats}</span>
                </div>
                {!isCorporate && (
                  <>
                    <div className="price-row sub">
                      <span>Admin Commission (20%)</span>
                      <span>AED {adminCommission}</span>
                    </div>
                    <div className="price-row sub">
                      <span>Driver Earnings (80%)</span>
                      <span>AED {driverEarnings}</span>
                    </div>
                  </>
                )}
                <div className="price-row total">
                  <span>Total Amount</span>
                  <span>AED {totalAmount}</span>
                </div>
              </div>

              {isCorporate && (
                <div className="corporate-notice">
                  <FaCheck className="notice-icon" />
                  <span>
                    As a corporate employee, no payment is required. Your
                    company covers the cost.
                  </span>
                </div>
              )}

              {error && <div className="error-message">{error}</div>}

              <div className="modal-actions">
                <button className="btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={handleContinueToPayment}
                  disabled={loading || isProcessing}
                >
                  {loading || isProcessing ? (
                    <>
                      <FaSpinner className="spinner" /> Processing...
                    </>
                  ) : isCorporate ? (
                    "Confirm Booking"
                  ) : (
                    "Continue to Payment"
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content step-payment">
              <div className="payment-amount-display">
                <span className="amount-label">Amount to Pay</span>
                <span className="amount-value">AED {totalAmount}</span>
              </div>

              <div className="commission-info">
                <div className="commission-row">
                  <span>Admin Commission (20%)</span>
                  <span>AED {adminCommission}</span>
                </div>
                <div className="commission-row highlight">
                  <span>Driver Earnings (80%)</span>
                  <span>AED {driverEarnings}</span>
                </div>
              </div>

              <div className="payment-methods">
                <h3>Choose Payment Method</h3>
                <div className="payment-options">
                  <div
                    className={`payment-option ${paymentMethod === "STRIPE" ? "selected" : ""} ${isProcessing ? "disabled" : ""}`}
                    onClick={() =>
                      !isProcessing && handleSelectPaymentMethod("STRIPE")
                    }
                  >
                    <div className="option-icon">
                      <FaCreditCard />
                    </div>
                    <div className="option-info">
                      <span className="option-title">Credit/Debit Card</span>
                      <span className="option-desc">
                        Pay securely with Stripe
                      </span>
                    </div>
                    {paymentMethod === "STRIPE" && isProcessing && (
                      <FaSpinner className="processing-spinner" />
                    )}
                  </div>

                  <div
                    className={`payment-option ${paymentMethod === "TAP" ? "selected" : ""} ${isProcessing ? "disabled" : ""}`}
                    onClick={() =>
                      !isProcessing && handleSelectPaymentMethod("TAP")
                    }
                  >
                    <div className="option-icon">
                      <FaUniversity />
                    </div>
                    <div className="option-info">
                      <span className="option-title">Tap Payments</span>
                      <span className="option-desc">
                        Card, Apple Pay, Google Pay
                      </span>
                    </div>
                    {paymentMethod === "TAP" && isProcessing && (
                      <FaSpinner className="processing-spinner" />
                    )}
                  </div>

                  <div
                    className={`payment-option ${paymentMethod === "CASH" ? "selected" : ""} ${isProcessing ? "disabled" : ""}`}
                    onClick={() =>
                      !isProcessing && handleSelectPaymentMethod("CASH")
                    }
                  >
                    <div className="option-icon">
                      <FaMoneyBillWave />
                    </div>
                    <div className="option-info">
                      <span className="option-title">Cash Payment</span>
                      <span className="option-desc">Pay to driver on ride</span>
                    </div>
                    {paymentMethod === "CASH" && isProcessing && (
                      <FaSpinner className="processing-spinner" />
                    )}
                  </div>
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="modal-actions">
                <button
                  className="btn-secondary"
                  onClick={() => setStep(1)}
                  disabled={isProcessing}
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content step-success">
              <div className="success-icon">
                <FaCheck />
              </div>
              <h3>Booking Confirmed!</h3>
              <p className="success-message">
                {isCorporate
                  ? "Your corporate booking has been confirmed. Your company has been notified."
                  : paymentMethod === "CASH"
                    ? "Your booking is pending. Please pay the driver when you board."
                    : "Your booking has been confirmed and payment received."}
              </p>

              <div className="booking-confirmation-details">
                <div className="detail-row">
                  <span className="detail-label">Booking ID</span>
                  <span className="detail-value">
                    {currentBooking?._id || "Generating..."}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Pickup</span>
                  <span className="detail-value">{route.fromLocation}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Dropoff</span>
                  <span className="detail-value">{route.toLocation}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Seats</span>
                  <span className="detail-value">{numberOfSeats}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Total Amount</span>
                  <span className="detail-value">AED {totalAmount}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment Method</span>
                  <span className="detail-value">
                    {isCorporate ? "Corporate" : paymentMethod}
                  </span>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-primary" onClick={handleClose}>
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

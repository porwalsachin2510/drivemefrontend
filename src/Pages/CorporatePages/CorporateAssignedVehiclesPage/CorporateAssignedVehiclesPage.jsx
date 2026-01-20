"use client";

import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
import Footer from "../../../Components/Footer/Footer";
import Navbar from "../../../Components/Navbar/Navbar";
import "./CorporateAssignedVehiclesPage.css";
import AddDriverModal from "../../../Components/Corporate/AddDriverModal/AddDriverModal";

const CorporateAssignedVehiclesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { contractId } = location.state || {};

  const [contract, setContract] = useState(null);
  const [assignedVehicles, setAssignedVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("vehicles");
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  console.log("assignedVehicles", assignedVehicles);
  const [showAddCorporateDriverModal, setShowAddCorporateDriverModal] =
    useState(false);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [driversLoading, setDriversLoading] = useState(false);

  console.log("availableDrivers", availableDrivers);

  const [assignmentForm, setAssignmentForm] = useState({
    driverId: "",
    fuelCardNumber: "",
  });


  const [routeForm, setRouteForm] = useState({
    fromLocation: "",
    toLocation: "",
    routeStartDate: "",
    startTime: "",
    endTime: "",
    stopPoints: [],
    totalDistance: "",
    estimatedDuration: "",
    availableDays: [],
    routeNotes: "",
  });


  const [newStopPoint, setNewStopPoint] = useState({
    location: "",
    time: "",
  });

  const [modalType, setModalType] = useState(null);

  const fetchAvailableDrivers = async () => {
    try {
      setDriversLoading(true);
      const driversResponse = await api.get(
        `/corporate/available-corporate-driver`,
      );
      
      console.log("first driversData", driversResponse.data);

      if (driversResponse.data.success) {
        setAvailableDrivers(driversResponse.data.drivers || []);
      }
    } catch (err) {
      console.error("Error fetching drivers", err);
      alert("Failed to load available drivers");
    } finally {
      setDriversLoading(false);
    }
  };


  const fetchAssignedVehicles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/contracts/assigned-vehicles/${contractId}`
      );

      if (response.data.success) {
        setContract(response.data.data.contract);
        setAssignedVehicles(response.data.data.assignedVehicles || []);
      } else {
        setError(response.data.message || "Failed to fetch assigned vehicles");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error loading assigned vehicles"
      );
      console.error("[v0] Error fetching assigned vehicles:", err);
    } finally {
      setLoading(false);
    }
  }, [contractId]);

  useEffect(() => {
    if (!contractId) {
      setError("Contract ID not provided");
      setLoading(false);
      return;
    }

    fetchAssignedVehicles();
  }, [contractId, fetchAssignedVehicles]);

  useEffect(() => {
    if (assignedVehicles && assignedVehicles.length > 0) {
      const extractedRoutes = assignedVehicles
        .filter(
          (vehicle) =>
            vehicle.routeDetails && Object.keys(vehicle.routeDetails).length > 0
        )
        .map((vehicle) => ({
          ...vehicle.routeDetails,
          vehicleId: vehicle._id,
          vehicleName: vehicle.vehicleDetails?.vehicleName,
          registrationNumber: vehicle.vehicleDetails?.registrationNumber,
        }));
      setRoutes(extractedRoutes);
    }
  }, [assignedVehicles]);

  const handleAssignmentSubmit = async (e, type) => {
    e.preventDefault();

    if (type === "driver" && !assignmentForm.driverId) {
      alert("Please enter driver ID");
      return;
    }

    if (type === "fuel" && !assignmentForm.fuelCardNumber) {
      alert("Please enter fuel card number");
      return;
    }

    const payload =
      type === "driver"
        ? { driverId: assignmentForm.driverId }
        : { fuelCardNumber: assignmentForm.fuelCardNumber };

    try {
      const response = await api.post(
        `/contracts/assign-driver-fuel/${contractId}/${selectedVehicle._id}`,
        payload
      );

      if (response.data.success) {
        alert(
          `${type === "driver" ? "Driver" : "Fuel card"} assigned successfully`
        );
        closeModal();
        await fetchAssignedVehicles();
      }
    } catch (err) {
      alert(err.response?.data?.message || `Failed to assign ${type}`);
      console.error("[v0] Error updating assignment:", err);
    }
  };

  const handleRouteSubmit = async (e) => {
    e.preventDefault();

    if (!routeForm.fromLocation || !routeForm.toLocation) {
      alert("Please fill in required route details");
      return;
    }

    try {
      const response = await api.post(
        `/contracts/assign-route/${contractId}/${selectedVehicle._id}`,
        routeForm
      );

      if (response.data.success) {
        alert("Route assigned successfully");
        closeModal();
        await fetchAssignedVehicles();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to assign route");
      console.error("[v0] Error assigning route:", err);
    }
  };

  const handleAddStopPoint = () => {
    if (!newStopPoint.location || !newStopPoint.time) {
      alert("Please fill in location and time for the stop point");
      return;
    }

    setRouteForm({
      ...routeForm,
      stopPoints: [
        ...routeForm.stopPoints,
        { location: newStopPoint.location, time: newStopPoint.time },
      ],
    });

    setNewStopPoint({ location: "", time: "" });
  };

  const handleRemoveStopPoint = (index) => {
    setRouteForm({
      ...routeForm,
      stopPoints: routeForm.stopPoints.filter((_, i) => i !== index),
    });
  };

  const openAssignmentModal = (vehicle, type) => {
    setSelectedVehicle(vehicle);
    setModalType(type);
    if (type === "driver") {
      setAssignmentForm({ ...assignmentForm, driverId: "" });
      fetchAvailableDrivers(); 
    } else if (type === "fuel") {
      setAssignmentForm({ ...assignmentForm, fuelCardNumber: "" });
    }
  };

  const openRouteModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalType("route");
    setRouteForm({
      fromLocation: "",
      toLocation: "",
      routeStartDate: "",
      startTime: "",
      endTime: "",
      stopPoints: [],
      totalDistance: "",
      estimatedDuration: "",
      availableDays: [],
      routeNotes: "",
    });
    setNewStopPoint({ location: "", time: "" });
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedVehicle(null);
  };

  const getAssignedVehicleRoute = (vehicle) => {
    return vehicle.routeDetails && Object.keys(vehicle.routeDetails).length > 0
      ? vehicle.routeDetails
      : null;
  };

  const getAssignmentStatus = (vehicle, type) => {
    if (type === "driver") {
      return vehicle.driverId ? "assigned" : "pending";
    }
    if (type === "fuel") {
      return vehicle.fuelCardNumber ? "assigned" : "pending";
    }
  };

  if (loading) {
    return (
      <div className="corporate-assigned-vehicles-loading">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="corporate-assigned-vehicles-error">
        <div className="error-icon">⚠️</div>
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={() => navigate("/corporate/contracts")}>
          Back to Contracts
        </button>
      </div>
    );
  }

  const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const toggleDay = (day) => {
    setRouteForm((prev) => {
      const days = prev.availableDays || [];

      return {
        ...prev,
        availableDays: days.includes(day)
          ? days.filter((d) => d !== day)
          : [...days, day],
      };
    });
  };
  
  return (
    <>
      <Navbar activeTab="contracts" setActiveTab={() => {}} />
      <div className="corporate-assigned-vehicles-container">
        <button
          className="corporate-assigned-vehicles-back-btn"
          onClick={() => navigate("/corporate/contracts")}
        >
          ← Back to Contracts
        </button>

        <div className="corporate-assigned-vehicles-header">
          <div>
            <h1>Assigned Vehicles</h1>
            <p className="contract-info">
              Contract: {contract?.contractNumber}
            </p>
          </div>
          <button
            className="add-btn"
            onClick={() => setShowAddCorporateDriverModal(true)}
          >
            + Add Driver
          </button>
        </div>

        <div className="corporate-assigned-vehicles-tabs">
          <button
            className={`tab-button ${activeTab === "vehicles" ? "active" : ""}`}
            onClick={() => setActiveTab("vehicles")}
          >
            Vehicles ({assignedVehicles.length})
          </button>
          <button
            className={`tab-button ${activeTab === "routes" ? "active" : ""}`}
            onClick={() => setActiveTab("routes")}
          >
            Routes ({routes.length})
          </button>
        </div>

        {/* Vehicles Tab */}
        {activeTab === "vehicles" && (
          <div className="corporate-assigned-vehicles-content">
            {assignedVehicles.length === 0 ? (
              <div className="empty-state">
                <p>No assigned vehicles yet</p>
              </div>
            ) : (
              <div className="vehicles-grid">
                {assignedVehicles.map((vehicle) => {
                  const vehicleRoute = getAssignedVehicleRoute(vehicle);
                  return (
                    <div key={vehicle._id} className="vehicle-card-premium">
                      <div className="vehicle-card-header-premium">
                        <div className="vehicle-name-badge">
                          <h3>{vehicle.vehicleDetails?.vehicleName}</h3>
                          <span className="vehicle-category-badge">
                            {vehicle.vehicleDetails?.vehicleCategory}
                          </span>
                        </div>
                        <p className="vehicle-reg-premium">
                          {vehicle.vehicleDetails?.registrationNumber}
                        </p>
                      </div>

                      {/* Driver Section */}
                      <div className="assignment-card">
                        <div className="assignment-card-header">
                          <span className="assignment-label">Driver</span>
                          <span
                            className={`status-badge ${getAssignmentStatus(
                              vehicle,
                              "driver",
                            )}`}
                          >
                            {getAssignmentStatus(vehicle, "driver")}
                          </span>
                        </div>
                        {vehicle.driverId ? (
                          <div className="assignment-details">
                            <p className="driver-name">
                              {vehicle.driverId.name}
                            </p>
                            <p className="driver-meta">
                              License: {vehicle.driverId.licenseNumber}
                            </p>
                            <p className="assigned-by-meta">
                              {vehicle.driverAssignedBy === "B2B_PARTNER"
                                ? "🏢 Fleet Owner"
                                : "✓ Self"}
                            </p>
                          </div>
                        ) : (
                          <p className="not-assigned">No driver assigned yet</p>
                        )}
                        {!vehicle.driverId && (
                          <button
                            className="assign-btn"
                            onClick={() =>
                              openAssignmentModal(vehicle, "driver")
                            }
                          >
                            Assign Driver
                          </button>
                        )}
                      </div>

                      {/* Fuel Section */}
                      <div className="assignment-card">
                        <div className="assignment-card-header">
                          <span className="assignment-label">Fuel Card</span>
                          <span
                            className={`status-badge ${getAssignmentStatus(
                              vehicle,
                              "fuel",
                            )}`}
                          >
                            {getAssignmentStatus(vehicle, "fuel")}
                          </span>
                        </div>
                        {vehicle.fuelCardNumber ? (
                          <div className="assignment-details">
                            <p className="fuel-card-number">
                              {vehicle.fuelCardNumber}
                            </p>
                            <p className="assigned-by-meta">
                              {vehicle.fuelAssignedBy === "B2B_PARTNER"
                                ? "🏢 Fleet Owner"
                                : "✓ Self"}
                            </p>
                          </div>
                        ) : (
                          <p className="not-assigned">
                            No fuel card assigned yet
                          </p>
                        )}
                        {!vehicle.fuelCardNumber && (
                          <button
                            className="assign-btn"
                            onClick={() => openAssignmentModal(vehicle, "fuel")}
                          >
                            Add Fuel Card
                          </button>
                        )}
                      </div>

                      {/* Route Section */}
                      <div className="assignment-card">
                        <div className="assignment-card-header">
                          <span className="assignment-label">Route</span>
                          <span
                            className={`status-badge ${
                              vehicleRoute ? "assigned" : "pending"
                            }`}
                          >
                            {vehicleRoute ? "assigned" : "pending"}
                          </span>
                        </div>
                        {vehicleRoute ? (
                          <div className="assignment-details">
                            <p className="route-text">
                              <strong>📍 From:</strong>{" "}
                              {vehicleRoute.fromLocation}
                            </p>
                            <p className="route-text">
                              <strong>📍 To:</strong> {vehicleRoute.toLocation}
                            </p>
                            <p className="route-text">
                              <strong>📅 Date:</strong>{" "}
                              {new Date(
                                vehicleRoute.routeStartDate,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        ) : (
                          <p className="not-assigned">No route assigned yet</p>
                        )}
                        {!vehicleRoute && (
                          <button
                            className="assign-btn"
                            onClick={() => openRouteModal(vehicle)}
                          >
                            Assign Route
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Routes Tab */}
        {activeTab === "routes" && (
          <div className="corporate-assigned-vehicles-content">
            {routes.length === 0 ? (
              <div className="empty-state">
                <p>No routes assigned yet</p>
              </div>
            ) : (
              <div className="routes-grid">
                {routes.map((route) => (
                  <div key={route._id} className="route-card-premium">
                    <div className="route-card-header-premium">
                      <h3>
                        {route.fromLocation} → {route.toLocation}
                      </h3>
                      <span className="route-status-badge">{route.status}</span>
                    </div>
                    <div className="route-card-body">
                      <div className="route-info">
                        <p className="route-detail">
                          <strong>🚗 Vehicle:</strong> {route.vehicleName} (
                          {route.registrationNumber})
                        </p>
                        <p className="route-detail">
                          <strong>📅 Date:</strong>{" "}
                          {new Date(route.routeStartDate).toLocaleDateString()}
                        </p>
                        <p className="route-detail">
                          <strong>⏱️ Time:</strong> {route.startTime} -{" "}
                          {route.endTime}
                        </p>
                        <p className="route-detail">
                          <strong>📏 Distance:</strong> {route.totalDistance} km
                        </p>
                        <p className="route-detail">
                          <strong>⏳ Duration:</strong>{" "}
                          {route.estimatedDuration}
                        </p>
                        {route.routeNotes && (
                          <p className="route-detail">
                            <strong>📝 Notes:</strong> {route.routeNotes}
                          </p>
                        )}
                      </div>

                      {/* Stop Points */}
                      {route.stopPoints && route.stopPoints.length > 0 && (
                        <div className="stop-points-display">
                          <strong>🛑 Stop Points:</strong>
                          <div className="stop-points-list-display">
                            {route.stopPoints.map((stop, idx) => (
                              <div key={idx} className="stop-point-display">
                                <span className="stop-location">
                                  {stop.location}
                                </span>
                                <span className="stop-time">{stop.time}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Driver Assignment Modal */}
        {/* {modalType === "driver" && selectedVehicle && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-premium" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-premium">
                <h2>Assign Driver</h2>
                <button className="modal-close" onClick={closeModal}>
                  ✕
                </button>
              </div>
              <form
                onSubmit={(e) => handleAssignmentSubmit(e, "driver")}
                className="modal-form"
              >
                <div className="form-group">
                  <label>Driver ID *</label>
                  <input
                    type="text"
                    placeholder="Enter driver ID or reference"
                    value={assignmentForm.driverId}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        driverId: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    Assign Driver
                  </button>
                </div>
              </form>
            </div>
          </div>
        )} */}

        {modalType === "driver" && selectedVehicle && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-premium" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-premium">
                <h2>Assign Driver</h2>
                <button className="modal-close" onClick={closeModal}>
                  ✕
                </button>
              </div>

              <form
                onSubmit={(e) => handleAssignmentSubmit(e, "driver")}
                className="modal-form"
              >
                <div className="form-group">
                  <label>Select Driver *</label>

                  {driversLoading ? (
                    <p>Loading drivers...</p>
                  ) : (
                    <select
                      value={assignmentForm.driverId}
                      onChange={(e) =>
                        setAssignmentForm({
                          ...assignmentForm,
                          driverId: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">-- Select Driver --</option>

                      {availableDrivers.map((driver) => (
                        <option key={driver._id} value={driver._id}>
                          {driver.name} - {driver.licenseNumber}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    Assign Driver
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Fuel Assignment Modal */}
        {modalType === "fuel" && selectedVehicle && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-premium" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-premium">
                <h2>Add Fuel Card</h2>
                <button className="modal-close" onClick={closeModal}>
                  ✕
                </button>
              </div>
              <form
                onSubmit={(e) => handleAssignmentSubmit(e, "fuel")}
                className="modal-form"
              >
                <div className="form-group">
                  <label>Fuel Card Number *</label>
                  <input
                    type="text"
                    placeholder="Enter fuel card number"
                    value={assignmentForm.fuelCardNumber}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        fuelCardNumber: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    Add Fuel Card
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Route Assignment Modal */}
        {modalType === "route" && selectedVehicle && (
          <div className="modal-overlay" onClick={closeModal}>
            <div
              className="modal-premium modal-large"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header-premium">
                <h2>Assign Route</h2>
                <button className="modal-close" onClick={closeModal}>
                  ✕
                </button>
              </div>
              <form onSubmit={handleRouteSubmit} className="modal-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>From Location *</label>
                    <input
                      type="text"
                      placeholder="Starting location"
                      value={routeForm.fromLocation}
                      onChange={(e) =>
                        setRouteForm({
                          ...routeForm,
                          fromLocation: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>To Location *</label>
                    <input
                      type="text"
                      placeholder="Destination"
                      value={routeForm.toLocation}
                      onChange={(e) =>
                        setRouteForm({
                          ...routeForm,
                          toLocation: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Route Start Date</label>
                    <input
                      type="date"
                      value={routeForm.routeStartDate}
                      onChange={(e) =>
                        setRouteForm({
                          ...routeForm,
                          routeStartDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Start Time</label>
                    <input
                      type="time"
                      value={routeForm.startTime}
                      onChange={(e) =>
                        setRouteForm({
                          ...routeForm,
                          startTime: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>End Time</label>
                    <input
                      type="time"
                      value={routeForm.endTime}
                      onChange={(e) =>
                        setRouteForm({ ...routeForm, endTime: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="stop-points-section">
                  <h3>Stop Points</h3>
                  <div className="stop-points-input-group">
                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        placeholder="Enter stop location"
                        value={newStopPoint.location}
                        onChange={(e) =>
                          setNewStopPoint({
                            ...newStopPoint,
                            location: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Time</label>
                      <input
                        type="time"
                        value={newStopPoint.time}
                        onChange={(e) =>
                          setNewStopPoint({
                            ...newStopPoint,
                            time: e.target.value,
                          })
                        }
                      />
                    </div>
                    <button
                      type="button"
                      className="btn-add-stop"
                      onClick={handleAddStopPoint}
                    >
                      Add Stop
                    </button>
                  </div>

                  {routeForm.stopPoints.length > 0 && (
                    <div className="stop-points-list">
                      {routeForm.stopPoints.map((stop, idx) => (
                        <div key={idx} className="stop-point-item">
                          <div className="stop-point-info">
                            <p className="stop-location">{stop.location}</p>
                            <p className="stop-time">{stop.time}</p>
                          </div>
                          <button
                            type="button"
                            className="btn-remove-stop"
                            onClick={() => handleRemoveStopPoint(idx)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Total Distance (km)</label>
                    <input
                      type="number"
                      placeholder="Distance in kilometers"
                      value={routeForm.totalDistance}
                      onChange={(e) =>
                        setRouteForm({
                          ...routeForm,
                          totalDistance: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Estimated Duration</label>
                    <input
                      type="text"
                      placeholder="e.g., 2 hours 30 minutes"
                      value={routeForm.estimatedDuration}
                      onChange={(e) =>
                        setRouteForm({
                          ...routeForm,
                          estimatedDuration: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Days Vehicles Available (On/Off)
                  </label>

                  <div className="days-container">
                    {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                      (day) => (
                        <button
                          type="button"
                          className={`day-button ${
                            routeForm.availableDays?.includes(day)
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => toggleDay(day)}
                        >
                          {day}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>Route Notes</label>
                  <textarea
                    placeholder="Any special instructions or notes for this route"
                    value={routeForm.routeNotes}
                    onChange={(e) =>
                      setRouteForm({ ...routeForm, routeNotes: e.target.value })
                    }
                    rows="3"
                  />
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    Assign Route
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAddCorporateDriverModal && (
          <AddDriverModal
            onClose={() => setShowAddCorporateDriverModal(false)}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default CorporateAssignedVehiclesPage;

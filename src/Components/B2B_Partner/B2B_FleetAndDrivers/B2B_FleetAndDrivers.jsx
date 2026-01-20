"use client";

import { useState } from "react";
import B2B_VehiclesTab from "../B2B_FleetAndDriversSub/B2B_VehiclesTab/B2B_VehiclesTab";
import B2B_DriversTab from "../B2B_FleetAndDriversSub/B2B_DriversTab/B2B_DriversTab";
import B2B_AddDriverModal from "../B2B_FleetAndDriversSub/B2B_AddDriverModal/B2B_AddDriverModal";
import B2B_AddVehicleModal from "../B2B_FleetAndDriversSub/B2B_AddVehicleModal/B2B_AddVehicleModal";
import "./b2b_fleetanddrivers.css";

function B2B_FleetAndDrivers() {
  const [activeSubTab, setActiveSubTab] = useState("vehicles");
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
   const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);

  return (
    <div className="fleet-and-drivers">
      <div className="fleet-header">
        <h2 className="fleet-title">Fleet Management</h2>
        {activeSubTab === "drivers" ? (
          <button
            className="add-btn"
            onClick={() => setShowAddDriverModal(true)}
          >
            + Add Driver
          </button>
        ) : (
          <button
            className="add-btn"
            onClick={() => setShowAddVehicleModal(true)}
          >
            + Add Vehicle
          </button>
        )}
      </div>

      <div className="fleet-tabs">
        <button
          className={`fleet-tab ${activeSubTab === "vehicles" ? "active" : ""}`}
          onClick={() => setActiveSubTab("vehicles")}
        >
          🚗 Vehicles (8)
        </button>
        <button
          className={`fleet-tab ${activeSubTab === "drivers" ? "active" : ""}`}
          onClick={() => setActiveSubTab("drivers")}
        >
          👤 Drivers (6)
        </button>
      </div>

      <div className="fleet-content">
        {activeSubTab === "vehicles" && <B2B_VehiclesTab />}
        {activeSubTab === "drivers" && <B2B_DriversTab />}
      </div>

      {showAddDriverModal && (
        <B2B_AddDriverModal onClose={() => setShowAddDriverModal(false)} />
      )}

      {showAddVehicleModal && (
        <B2B_AddVehicleModal onClose={() => setShowAddVehicleModal(false)} />
      )}
    </div>
  );
}

export default B2B_FleetAndDrivers;

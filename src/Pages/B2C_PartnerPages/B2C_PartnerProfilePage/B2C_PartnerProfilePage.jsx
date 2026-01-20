"use client";

import { useState } from "react";
import B2C_Partner_Header from "../../../Components/B2C_Partner/B2C_Partner_Header/B2C_Partner_Header";
import B2C_Navigation from "../../../Components/B2C_Partner/B2C_Navigation/B2C_Navigation";
import MyTrips from "../../../Components/B2C_Partner/Tabs/MyTrips/MyTrips";
import Earnings from "../../../Components/B2C_Partner/Tabs/Earnings/Earnings";
import Vehicles from "../../../Components/B2C_Partner/Tabs/Vehicles/Vehicles";
import Account from "../../../Components/B2C_Partner/Tabs/Account/Account";
import "./b2c_partnerprofilepage.css";

function B2C_PartnerProfilePage() {
  const [b2cactiveTab, setB2CActiveTab] = useState("trips");

  const renderContent = () => {
    switch (b2cactiveTab) {
      case "trips":
        return <MyTrips />;
      case "earnings":
        return <Earnings />;
      case "vehicles":
        return <Vehicles />;
      case "account":
        return <Account />;
      default:
        return <MyTrips />;
    }
  };

  return (
    <div className="b2c-my-profile">
      

      <div className="driver-dashboard-container">
        <div className="driver-dashboard">
          <B2C_Partner_Header />
          <div className="dashboard-container">
            <B2C_Navigation
              b2cactiveTab={b2cactiveTab}
              setB2CActiveTab={setB2CActiveTab}
            />
            <div className="dashboard-content">{renderContent()}</div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default B2C_PartnerProfilePage;

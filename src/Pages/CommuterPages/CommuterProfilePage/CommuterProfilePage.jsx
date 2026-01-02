import { useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Sidebar from "../../../Components/Section/Sidebar/Sidebar";
import Navigation from "../../../Components/Section/Navigation/Navigation";
import MyRides from "../../../Components/Section/MyRides/MyRides";
import FindRoutes from "../../../Components/Section/FindRoutes/FindRoutes";
import Wallet from "../../../Components/Section/Wallet/Wallet";
import Alerts from "../../../Components/Section/Alerts/Alerts";
import Settings from "../../../Components/Section/Settings/Settings";
import "./commuterprofilepage.css";
import Footer from "../../../Components/Footer/Footer";

export default function CommuterProfilePage() {
  const [profileactiveTab, setProfileActiveTab] = useState("my-rides");
  const [activeTab, setActiveTab] = useState("corporate");

  const renderContent = () => {
    switch (profileactiveTab) {
      case "my-rides":
        return <MyRides />;
      case "find-routes":
        return <FindRoutes />;
      case "wallet":
        return <Wallet />;
      case "alerts":
        return <Alerts />;
      case "settings":
        return <Settings />;
      default:
        return <MyRides />;
    }
  };

  return (
    <div className="commuter-my-profile">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="commuter-profile-container">
        <Sidebar />
        <div className="commuter-profile-main">
          <Navigation
            profileactiveTab={profileactiveTab}
            setProfileActiveTab={setProfileActiveTab}
          />
          <div className="commuter-profile-content">{renderContent()}</div>
        </div>
      </div>

      <Footer />
    </div>
  );
}




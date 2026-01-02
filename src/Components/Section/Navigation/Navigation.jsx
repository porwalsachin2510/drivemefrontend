"use client";
import "./navigation.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/slices/authSlice";
import api from "../../../utils/api";

export default function Navigation({ profileactiveTab, setProfileActiveTab }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tabs = [
    { id: "my-rides", label: "My Rides", icon: "📋" },
    { id: "find-routes", label: "Find Routes", icon: "📍" },
    { id: "wallet", label: "Wallet", icon: "💳" },
    { id: "alerts", label: "Alerts", icon: "🔔" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

 const handleLogout = async () => {
   try {
     const token = localStorage.getItem("token");
     
     if (!token) {
       console.log("[v0] No token found, redirecting to login");
       navigate("/login");
       return;
     }

     dispatch(logout());

     // Call backend logout endpoint to clear cookies and session
     await api.post(
       "/auth/logout",
       {},
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
         withCredentials: true,
       }
     );

     // Clear frontend storage
     localStorage.removeItem("token");
     localStorage.removeItem("user");

     console.log("[v0] User logged out successfully");

     // Redirect to login page
     navigate("/login");
   } catch (err) {
     console.error("[v0] Logout error:", err);

     localStorage.removeItem("token");
     localStorage.removeItem("user");

     // Redirect to login regardless of error
     navigate("/login");
   }
 };


  return (
    <div className="navigation">
      <div className="nav-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${profileactiveTab === tab.id ? "active" : ""}`}
            onClick={() => setProfileActiveTab(tab.id)}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        <span>↗️</span>
      </button>
    </div>
  );
}

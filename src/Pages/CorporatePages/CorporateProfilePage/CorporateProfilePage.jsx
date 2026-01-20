import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/slices/authSlice";
import api from "../../../utils/api";

import Navbar from "../../../Components/Navbar/Navbar";
import CompanyProfile from "../../../Components/Corporate/Company_Profile/CompanyProfile";
import AccountSettings from "../../../Components/Corporate/Account_Settings/AccountSettings";
import Footer from "../../../Components/Footer/Footer";
import "./corporateprofilepage.css";


export default function CorporateProfilePage() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [activeTab, setActiveTab] = useState("corporate");
  
  const [corporateactiveTab, setCorporateActiveTab] = useState("company-profile");

  
  
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
    <div className="corporate-my-profile">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="corporate-dashboard-container">
        {/* Stats Cards */}
        <div className="corporate-stats-section">
          <div className="corporate-stat-card">
            <div className="corporate-stat-icon corporate-blue-bg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className="corporate-stat-content">
              <div className="corporate-stat-label">Active Contracts</div>
              <div className="corporate-stat-value">0</div>
            </div>
          </div>

          <div className="corporate-stat-card">
            <div className="corporate-stat-icon corporate-green-bg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="corporate-stat-content">
              <div className="corporate-stat-label">Employees Transported</div>
              <div className="corporate-stat-value">0</div>
            </div>
          </div>

          <div className="corporate-stat-card">
            <div className="corporate-stat-icon corporate-purple-bg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
              </svg>
            </div>
            <div className="corporate-stat-content">
              <div className="corporate-stat-label">Monthly Spend</div>
              <div className="corporate-stat-value">0 KWD</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="corporate-main-content">
          <div className="corporate-content-header">
            <div className="corporate-header-left">
              <h1 className="corporate-portal-title">
                Corporate Management Portal
              </h1>
              <span className="corporate-verified-badge">
                Verified Business
              </span>
            </div>
            <button className="corporate-logout-btn" onClick={handleLogout}>Log Out</button>
          </div>

          {/* Tabs */}
          <div className="corporate-tabs-container">
            <button
              className={`corporate-tab ${
                corporateactiveTab === "company-profile"
                  ? "corporate-active"
                  : ""
              }`}
              onClick={() => setCorporateActiveTab("company-profile")}
            >
              Company Profile
            </button>
            <button
              className={`corporate-tab ${
                corporateactiveTab === "account-settings"
                  ? "corporate-active"
                  : ""
              }`}
              onClick={() => setCorporateActiveTab("account-settings")}
            >
              Account Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="corporate-tab-content">
            {corporateactiveTab === "company-profile" ? (
              <CompanyProfile />
            ) : (
              <AccountSettings />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}




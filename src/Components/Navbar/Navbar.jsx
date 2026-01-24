"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import UniversalNotifications from "../Common/Notifications/UniversalNotifications";
import {
  selectIsAuthenticated,
  selectLoading,
} from "../../Redux/selectors/authSelectors";

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const [showNotifications, setShowNotifications] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectLoading);
   const { unreadCount } = useSelector((state) => state.notifications);

  const navigate = useNavigate();

  const roleRedirectMap = {
    COMMUTER: "/commuter-profile",
    CORPORATE: "/corporate-profile",
    B2C_PARTNER: "/",
    B2B_PARTNER: "/",
    ADMIN: "/",
  };

  const contractroleRedirectMap = {
    COMMUTER: "/commuter",
    CORPORATE: "/corporate",
    B2C_PARTNER: "/b2c-partner",
    B2B_PARTNER: "/b2b-partner",
    ADMIN: "/admin",
  };

//  const rolehomeRedirectMap = {
//     COMMUTER: "/",
//     CORPORATE: "/service-selection"
//   }

  const handleLogin = () => {
    navigate("/login");
  };

  const handleMyProfile = () => {
    if (user && user.role) {
      const profileUrl = roleRedirectMap[user.role] || "/login";
      navigate(profileUrl);
    } else {
      navigate("/login");
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    localStorage.setItem("activeTab", tab);
    setMobileMenuOpen(false);
  };

  const handleContractTabClick = (tab) => {

    console.log("this tab clicked ", tab);
    setActiveTab(tab);

    localStorage.setItem("activeTab", tab);
    
    setMobileMenuOpen(false);
    if (user && user.role) {
      const contractUrl = contractroleRedirectMap[user.role] || "/login";
      navigate(contractUrl + "/contracts");
    } else {
      navigate("/login");
    }
  };

  // const handleHomeClick = () => {
    
  //   if (user && user.role) {
  //     const homeUrl = rolehomeRedirectMap[user.role] || "/login";
  //     navigate(homeUrl);
  //   } else {
  //     navigate("/login");
  //   }
  // };

  // Get user initial for avatar
  const userInitial =
    user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U";

  if (isLoading) {
    return <nav className="navbar" />; // Prevent layout shift
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <div className="logo-box">driveMe</div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Nav Items */}
        <div className={`navbar-items ${mobileMenuOpen ? "active" : ""}`}>
          <div className="nav-tabs">
            {/* <button
              className={`navbar-tab ${
                activeTab === "commuters" ? "active" : ""
              }`}
              onClick={() => handleTabClick("commuters")}
            >
              Commuters
            </button>
            <button
              className={`navbar-tab ${
                activeTab === "corporate" ? "active" : ""
              }`}
              onClick={() => handleTabClick("corporate")}
            >
              <span className="building-icon">⌂</span> Corporate
            </button> */}

            {isAuthenticated && user?.role === "CORPORATE" && (
              <>
                <button
                  className={`navbar-tab ${
                    activeTab === "my-quotations" ? "" : ""
                  }`}
                  onClick={() => {
                    handleTabClick("my-quotations");
                    navigate("/my-quotations");
                  }}
                >
                  My Quotations
                </button>

                <button
                  className={`navbar-tab ${
                    activeTab === "contracts" ? "" : ""
                  }`}
                  onClick={() => handleContractTabClick("contracts")}
                >
                  Contracts
                </button>
              </>
            )}
          </div>

          {isAuthenticated ? (
            // After Login: Show user avatar with dropdown and notifications
            <div className="nav-user-section">
              {/* Notifications Icon */}
              <div className="nav-notifications">
                <button
                  className="notifications-icon"
                  onClick={() => setShowNotifications(!showNotifications)}
                  title="Notifications"
                >
                  🔔
                  {unreadCount > 0 && (
                    <span className="notification-badge">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </button>

                <UniversalNotifications
                  isOpen={showNotifications}
                  onClose={() => setShowNotifications(false)}
                />
              </div>

              {/* User Avatar */}
              <button
                className="user-avatar"
                onClick={handleMyProfile}
                title="Click to my profile"
              >
                {userInitial}
              </button>
            </div>
          ) : (
            // Before Login: Show login button
            <button className="nav-login" onClick={handleLogin}>
              <span className="login-arrow">→</span> Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

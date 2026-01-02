"use client";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="commuter-sidebar">
      <div className="sidebar-profile">
        <div className="profile-avatar-outer">
          <div className="profile-avatar">
            <img src="https://i.pravatar.cc/100?img=3" alt="Profile" />
            <div className="online-indicator"></div>
          </div>
        </div>

        <h2 className="profile-name">Test Passenger</h2>
        <p className="profile-email">passenger@driveme.com</p>
        <span className="premium-badge">Premium Member</span>
      </div>

      <div className="sidebar-stats">
        <div className="stat-item">
          <p className="stat-label">TOTAL RIDES</p>
          <p className="stat-value">124</p>
        </div>
        <div className="stat-item">
          <p className="stat-label">SAVED CO2</p>
          <p className="stat-value green">45kg</p>
        </div>
      </div>

      <div className="wallet-card">
        <p className="wallet-label">Wallet Balance</p>
        <p className="wallet-amount">14.500 KWD</p>
        <button className="topup-btn">
          <span>📋</span> Top Up Wallet
        </button>
      </div>
    </div>
  );
}

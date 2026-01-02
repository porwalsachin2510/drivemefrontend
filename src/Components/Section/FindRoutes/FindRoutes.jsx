"use client";
import "./find-routes.css";

export default function FindRoutes() {
  return (
    <div className="find-routes-section">
      <h2>My Active Routes</h2>
      <p className="routes-count">0 Active</p>

      <div className="empty-state">
        <div className="empty-icon">🚌</div>
        <p className="empty-title">
          You haven't joined any partner routes yet.
        </p>
        <p className="empty-subtitle">
          Search for a route on the home page to join!
        </p>
      </div>
    </div>
  );
}

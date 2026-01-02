"use client";

import { useState } from "react";
import { normalizeTime } from "../../utils/helperutility";
import "./availablesection.css";

const AvailableSection = ({
  routes,
  loading,
  onFilterChange,
  searchParams,
  currentFilterType,
}) => {
  console.log("Available Section search Params", searchParams);
  console.log("Data Getting", routes);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filterOptions = [
    "All",
    "Budget Friendly",
    "AC Vehicle",
    "WiFi Available",
    "Premium",
    "Ladies Only",
    "Express",
  ];

  const hasSearchParams =
    searchParams &&
    (searchParams.pickupLocation || searchParams.dropoffLocation);
  const showNoSearchMessage =
    currentFilterType === "matched" && !hasSearchParams;

  const handleTabChange = (tab) => {
    if (tab === "matched" && !hasSearchParams) {
      if (onFilterChange) {
        onFilterChange({
          filterType: tab,
          selectedFilter: "All",
        });
      }
      return;
    }

    if (onFilterChange) {
      if (tab === "all") {
        onFilterChange({
          filterType: "all",
          selectedFilter: "All",
        });
      } else if (tab === "matched" && hasSearchParams) {
        onFilterChange({
          filterType: "matched",
          selectedFilter: "All",
          ...searchParams,
        });
      }
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);

    if (onFilterChange) {
      if (currentFilterType === "all") {
        onFilterChange({
          filterType: "all",
          selectedFilter: filter,
        });
      } else if (currentFilterType === "matched" && hasSearchParams) {
        onFilterChange({
          filterType: "matched",
          selectedFilter: filter,
          ...searchParams,
        });
      }
    }
  };

  const getBorderColor = (index) => {
    const colors = [
      "#FDB913",
      "#FDB913",
      "#17A2B8",
      "#17A2B8",
      "#17A2B8",
      "#FDB913",
    ];
    return colors[index % colors.length];
  };

  const formatDate = (date) => {
    if (!date) return "TBD";
    const d = new Date(date);
    return d.toLocaleDateString("en-GB");
  };

  return (
    <div className="available-section">
      <div className="section-header">
        <p className="all-listings-label">ALL LISTINGS</p>
      </div>

      <div className="title-section">
        <div className="title-and-count">
          <h2 className="section-title">Available B2C Routes</h2>
          <p className="routes-count">
            Showing {showNoSearchMessage ? 0 : routes.length} routes
          </p>
        </div>

        <div className="tab-buttons">
          <button
            className={`tab-btn ${currentFilterType === "all" ? "active" : ""}`}
            onClick={() => handleTabChange("all")}
          >
            All Routes
          </button>
          <button
            className={`tab-btn ${
              currentFilterType === "matched" ? "active" : ""
            }`}
            onClick={() => handleTabChange("matched")}
          >
            Matched For Me
          </button>
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-label">Filter by:</label>
        <div className="filter-tags">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              className={`filter-tag ${
                selectedFilter === filter ? "active" : ""
              }`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {!loading && !showNoSearchMessage && routes.length > 0 && (
        <div className="routes-list">
          {routes.map((route, idx) => (
            <div
              key={route.routeId || idx}
              className="route-item"
              style={{ borderLeftColor: getBorderColor(idx) }}
            >
              <div className="route-row-1">
                <div className="route-info">
                  <h3 className="route-title">
                    {route.company || route.operator}
                    {route.rating && <span className="star-icon">⭐</span>}
                  </h3>
                  <span className="company-badge">{route.vehicleModel}</span>
                </div>

                <h6>AVAILABLE SEATS: {route.availableSeats}</h6>

                <div className="price-section">
                  <p className="price-label">MONTHLY PRICE</p>
                  <p className="price-value">{route.monthlyPrice}</p>
                </div>
              </div>

              <div className="route-row-2">
                <div className="route-details">
                  <div className="detail-group">
                    <label className="detail-label">FROM</label>
                    <p className="detail-value">
                      <span className="detail-icon">📍</span>
                      {typeof route.fromLocation === "string"
                        ? route.fromLocation
                        : route.fromLocation?.location}
                    </p>
                  </div>

                  <div className="detail-group">
                    <label className="detail-label">TO</label>
                    <p className="detail-value">
                      <span className="detail-icon">📍</span>
                      {typeof route.toLocation === "string"
                        ? route.toLocation
                        : route.toLocation?.location}
                    </p>
                  </div>

                  <div className="detail-group">
                    <label className="detail-label">Arrival Time</label>
                    <p className="detail-value">
                      <span className="detail-icon">🕐</span>
                      {route.pickupArrivalTime &&
                        route.pickupArrivalTime !== "N/A" && (
                          <span className="arrival-time">
                            {normalizeTime(route.pickupArrivalTime)}
                          </span>
                        )}
                    </p>
                  </div>

                  <div className="detail-group">
                    <label className="detail-label">START DATE</label>
                    <p className="detail-value">
                      <span className="detail-icon">📅</span>
                      {formatDate(route.startDate)}
                    </p>
                  </div>
                </div>

                <button className="join-btn">
                  <span className="join-icon">📌</span> Join Pool
                </button>
              </div>

              {/* Available Days */}
              <div className="availablesection-featured-detail-group">
                <label className="availablesection-detail-label">
                  Available Days <span className="days-arrow">⇒</span>
                </label>
                <div className="available-days">
                  {route.dayMatching.matchedDays?.map((day) => (
                    <span
                      key={day}
                      className={`day-pill ${
                        ["SAT", "SUN"].includes(day) ? "weekend" : ""
                      }`}
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && routes.length === 0 && !showNoSearchMessage && (
        <div className="empty-state">
          <p>No routes available at the moment</p>
        </div>
      )}

      {!loading && showNoSearchMessage && (
        <div className="empty-state">
          <p>No routes matches available for you</p>
          <p className="empty-subtitle">Search Commutes</p>
        </div>
      )}
    </div>
  );
};

export default AvailableSection;

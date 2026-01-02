import { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./searchfleet.css";
import { useNavigate } from "react-router-dom";

export default function SearchFleet() {
  const [activeTab, setActiveTab] = useState("corporate");

  const navigate = useNavigate();
  
  if (activeTab === "corporate" || activeTab === "commuters") {
    navigate("/");
  };

   const fleetData = [
     {
       id: 1,
       image:
         "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=400&fit=crop",
       type: "BUS",
       name: "Toyota Coaster 2023",
       company: "Kuwait Express Transport",
       companyLink: "#",
       rating: 4.8,
       seaters: "22 Seater",
       category: "Industrial & Office",
       features: ["AC", "Safety Sensors"],
       price: "450 KWD / Mo",
       verified: true,
     },
     {
       id: 2,
       image:
         "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=400&fit=crop",
       type: "VAN",
       name: "Toyota Hiace High Roof",
       company: "Gulf Logistics",
       companyLink: "#",
       rating: 4.6,
       seaters: "13 Seater",
       category: "Staff Transport",
       features: ["High Roof", "GPS Tracking"],
       price: "220 KWD / Mo",
       verified: true,
     },
     {
       id: 3,
       image:
         "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=400&fit=crop",
       type: "LUXURY COACH",
       name: "Mercedes-Benz Tourismo",
       company: "Royal Fleets",
       companyLink: "#",
       rating: 5,
       seaters: "50 Seater",
       category: "Events & Executive",
       features: ["WiFi", "Toilet", "Leather Seats"],
       price: "1200 KWD / Mo",
       verified: true,
     },
   ];
    
    
  return (
    <div className="searchfleet">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Search Fleet */}

      <div className="search-fleet-container">
        {/* Header Section */}
        <div className="search-fleet-header">
          <button className="modify-search-btn">
            <span className="back-arrow">←</span> Modify Search
          </button>
          <p className="search-info">
            Showing results for <strong>All Fleet</strong> (Passenger Vehicles)
          </p>
        </div>

        {/* Main Content */}
        <div className="search-fleet-content">
          {/* Title Section */}
          <div className="fleet-title-section">
            <h2 className="fleet-title">Matched Fleet Options</h2>
            <div className="matches-badge">
              {fleetData.length} Matches Found
            </div>
          </div>

          {/* Fleet Cards */}
          <div className="fleet-cards-container">
            {fleetData.map((vehicle) => (
              <div key={vehicle.id} className="fleet-card">
                {/* Left Section: Image with Badges */}
                <div className="card-image-section">
                  <img
                    src={vehicle.image || "/placeholder.svg"}
                    alt={vehicle.name}
                    className="fleet-vehicle-image"
                  />

                  <div className="badge-luxury">{vehicle.type}</div>

                  {vehicle.verified && (
                    <div className="badge-verified">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Right Section: Content */}
                <div className="card-right-section">
                  {/* Header: Title + Rating */}
                  <div className="card-title-rating">
                    <div className="title-wrapper">
                      <h3 className="vehicle-title">{vehicle.name}</h3>
                      <a href={vehicle.companyLink} className="company-name">
                        {vehicle.company}
                      </a>
                    </div>
                    <div className="rating-display">
                      <span className="star-icon">★</span>
                      <span className="rating-number">{vehicle.rating}</span>
                    </div>
                  </div>

                  {/* Features Row */}
                  <div className="features-display">
                    <div className="feature-box">
                      <span className="feature-icon">👥</span>
                      <span className="feature-label">{vehicle.seaters}</span>
                    </div>
                    <div className="feature-box">
                      <span className="feature-icon">🏢</span>
                      <span className="feature-label">{vehicle.category}</span>
                    </div>
                  </div>

                  {/* Tags/Features */}
                  <div className="tags-list">
                    {vehicle.features.map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Footer: Price + Buttons */}
                  <div className="card-bottom-section">
                    <div className="price-info">
                      <p className="price-label">STARTING FROM</p>
                      <p className="price-amount">{vehicle.price}</p>
                    </div>
                    <div className="action-buttons">
                      <button className="info-button" title="More info">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                      </button>
                      <button className="quote-button">
                        Get Quote <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Search Fleet */}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-col">
            <h4>driveMe</h4>
            <p>"smart mobility, made for the GCC"</p>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>
                <a href="#">Home to Work</a>
              </li>
              <li>
                <a href="#">Corporate Solutions</a>
              </li>
              <li>
                <a href="#">Find a Driver</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Refund Policy</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul>
              <li>hello@drivemekw.com</li>
              <li>+965 9676 1400</li>
              <li>WhatsApp Support Available</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 DRIVEME. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

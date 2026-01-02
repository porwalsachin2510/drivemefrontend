"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import CommuteSearchForm from "../../../Components/CommutersSearchForm/Commute-search-form";
import FeaturedRoutes from "../../../Components/FeaturedRoutes/FeaturedRoutes";
import AvailableSection from "../../../Components/AvailableSection/AvailableSection";
import { useNavigate } from "react-router-dom";
import Footer from "../../../Components/Footer/Footer";
import {
  isServiceAvailable,
  getDisplayCountry,
} from "../../../utils/helperutility";
import "./commuterhomepage.css";
// import { selectUserRole } from "../../Redux/selectors/authSelectors";

// import { useSelector } from "react-redux";

import api from "../../../utils/api";

export default function CommuterHomePage() {
  
//   const userRole = useSelector(selectUserRole);

//   if (userRole === "CORPORATE") {
//     navigate("/corporate");
//   }
//   const [activeTab, setActiveTab] = useState("commuters");
//   const [corporateStep, setCorporateStep] = useState("choose"); // "choose" or specific service
//   const [selectedService, setSelectedService] = useState(null); // "passenger", "goods", "managed"
//   const [errors, setErrors] = useState({});

  // START: NEW STATE FOR ROUTES AND LOADING
  const [firstloadroutes, setFirstLoadRoutes] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({});
  // const [queryparam, setQueryParam] = useState();
  // const [userType, setUserType] = useState(null);
  // const [companyName, setCompanyName] = useState(null);
  const [currentFilterType, setCurrentFilterType] = useState("all");
  // END: NEW STATE FOR ROUTES AND LOADING

    const [userNationality, setUserNationality] = useState(null);
    
    const navigate = useNavigate();
  const hasDetectedRef = useRef(false);

  const availableSectionRef = useRef(null);

  useEffect(() => {
    const detectUserLocation = async () => {
      // Prevent duplicate execution (StrictMode safe)
      if (hasDetectedRef.current) return;

      try {
        console.log("[v0] Detecting user location...");
        // Call backend API to detect location (no CORS issues)
        const response = await api.get(
          "/location/detect",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("Location data", response.data);

        if (response.data.success) {
          const countryName = response.data.nationality;

          console.log("[v0] Detected country:", countryName);

          let nationality = countryName;

          if (countryName === "Kuwait") {
            nationality = "Kuwait";
          } else if (countryName === "United Arab Emirates") {
            nationality = "UAE";
          }

          setUserNationality(nationality);
          hasDetectedRef.current = true;

          console.log("[v0] User nationality set to:", nationality);
        }
      } catch (error) {
        console.error("[v0] Error detecting location:", error);
        // Default to Kuwait if error occurs
        setUserNationality(null);
      }
    };

    detectUserLocation();
  }, []);

//   const [formData, setFormData] = useState({
//     // Commuters
//     pickupLocation: "",
//     dropoffLocation: "",
//     workCategory: "Select Category",
//     tripType: "Round Trip",
//     startDate: "",
//     shiftType: "Full Day",
//     pickupTime: "",

//     // Corporate - Passenger Vehicles
//     vehicleType: "Any Type",
//     minSeats: "",
//     workingDays: "Select",
//     workCategory2: "Select Category",
//     startDate2: "",
//     monthlyBudget: "Flexible",

//     // Corporate - Goods Carrier
//     vehicleType2: "Any Type",
//     capacity: "",
//     startDate3: "",
//     monthlyBudget2: "Flexible",

//     // Corporate - Managed Services
//     vehicleType3: "Any Type",
//     minSeats2: "",
//     workingDays2: "Select",
//     workCategory3: "Select Category",
//     startDate4: "",
//     monthlyBudget3: "Flexible",

//     // Rental Preferences & Special Requirements
//     rentalPreference: "with-driver",
//     specialRequirements: [],
//   });

  const fetchRoutes = useCallback(
    async (params = {}) => {
      try {
        if (!userNationality) {
          console.log("Nationality missing → routes API blocked");
          return;
        }

        setLoading(true);

        const token =
          localStorage.getItem("token") ||
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if (!token) {
          console.error("No authentication token found");
          setLoading(false);
          return;
        }

        const queryParams = new URLSearchParams();
        if (params.pickupLocation)
          queryParams.append("pickupLocation", params.pickupLocation);
        if (params.dropoffLocation)
          queryParams.append("dropoffLocation", params.dropoffLocation);
        if (params.filterType)
          queryParams.append("filterType", params.filterType);
        if (params.workCategory)
          queryParams.append("workCategory", params.workCategory);
        if (params.tripType) queryParams.append("tripType", params.tripType);
        if (params.startDate) queryParams.append("startDate", params.startDate);
        if (params.selectedDays)
          queryParams.append(
            "selectedDays",
            JSON.stringify(params.selectedDays)
          );
        if (userNationality) {
          queryParams.append("nationality", userNationality);
          console.log("[v0] Fetching routes for nationality:", userNationality);
        }

        const response = await api.get(
          `/commute/search?${queryParams.toString()}`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data.success) {
          console.log("Commuter Search Vehicle", response.data.routes);
          if (params.filterType === "matched") {
            setRoutes(response.data.routes);
          } else {
            setFirstLoadRoutes(response.data.routes);
          }
        }
      } catch (error) {
        console.error("Error fetching routes:", error);

        if (error.response?.status === 401) {
          alert("Session expired. Please login again.");
          navigate("/login");
        } else if (error.response?.status === 403) {
          alert("Access denied. Only commuters can access this page.");
        } else {
          alert("Failed to fetch routes. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate, userNationality]
  );

  useEffect(() => {
    if (userNationality) {
      fetchRoutes({ filterType: "all" });
      setCurrentFilterType("all");
    }
  }, [fetchRoutes, userNationality]);

  const handleSearch = (searchData) => {
    setSearchParams(searchData);
    setCurrentFilterType("matched");

    fetchRoutes({
      ...searchData,
      filterType: "matched",
    });

    setTimeout(() => {
      if (availableSectionRef.current) {
        availableSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  };

  const handleFilterChange = (filterData) => {
    // If clicking "matched" without search params, just update UI state
    if (
      filterData.filterType === "matched" &&
      !searchParams.pickupLocation &&
      !searchParams.dropoffLocation
    ) {
      setCurrentFilterType("matched");
      return;
    }

    setCurrentFilterType(filterData.filterType);

    let params;
    if (filterData.filterType === "all") {
      // For "all" routes: fetch without search location filters
      params = {
        filterType: "all",
        selectedFilter: filterData.selectedFilter || "All",
      };
    } else {
      // For "matched" routes: include search params
      params = {
        ...searchParams,
        ...filterData,
      };
    }

    fetchRoutes(params);
  };

  const featuredRoutes = firstloadroutes.slice(0, 6);

  // eslint-disable-next-line no-unused-vars
  const goToSearchFleetPage = () => {
    navigate("/search-fleet", {
      state: { username: "Sachin", age: 22 }, // sending data
    });
  };

//   const validateCorporateForm = () => {
//     const newErrors = {};

//     if (selectedService === "passenger") {
//       if (formData.vehicleType === "Any Type")
//         newErrors.vehicleType = "Please select a vehicle type";
//       if (!formData.minSeats) newErrors.minSeats = "Min seats is required";
//       if (formData.workingDays === "Select")
//         newErrors.workingDays = "Please select working days";
//       if (!formData.startDate2) newErrors.startDate2 = "Date is required";
//     } else if (selectedService === "goods") {
//       if (formData.vehicleType2 === "Any Type")
//         newErrors.vehicleType2 = "Please select a vehicle type";
//       if (!formData.capacity) newErrors.capacity = "Capacity is required";
//       if (!formData.startDate3) newErrors.startDate3 = "Date is required";
//     } else if (selectedService === "managed") {
//       if (formData.vehicleType3 === "Any Type")
//         newErrors.vehicleType3 = "Please select a vehicle type";
//       if (!formData.minSeats2) newErrors.minSeats2 = "Min seats is required";
//       if (formData.workingDays2 === "Select")
//         newErrors.workingDays2 = "Please select working days";
//       if (!formData.startDate4) newErrors.startDate4 = "Date is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleSelectChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const toggleSpecialRequirement = (req) => {
//     setFormData((prev) => ({
//       ...prev,
//       specialRequirements: prev.specialRequirements.includes(req)
//         ? prev.specialRequirements.filter((r) => r !== req)
//         : [...prev.specialRequirements, req],
//     }));
//   };

//   const handleSearchFleet = (e) => {
//     e.preventDefault();
//     if (validateCorporateForm()) {
//       const selectedServiceLabel =
//         selectedService === "passenger"
//           ? "Passenger Vehicles"
//           : selectedService === "goods"
//           ? "Goods Carrier"
//           : "Managed Services";
//       alert(`${selectedServiceLabel} form is valid! Searching fleet...`);
//     }
//   };

  // ============ COMMUTERS VIEW ============
 
    return (
      <div className="homepage">
        

        <div className="commuters-container">
          <div className="page-title">
            <h1>Smart Mobility, Made for the GCC</h1>
            <p>
              Connect with fellow commuters or professional transportation
              services for <br />a stress-free journey.
            </p>
            {userNationality && (
              <>
                {isServiceAvailable(userNationality) ? (
                  <p className="location-indicator available">
                    📍 Showing routes for:{" "}
                    <strong>{getDisplayCountry(userNationality)}</strong>
                  </p>
                ) : (
                  <div className="location-indicator unavailable">
                    🚫 Our service is currently not available in{" "}
                    <span className="country-highlight">{userNationality}</span>
                    .
                    <p className="expansion-text">
                      We are expanding soon to more countries.
                    </p>
                    <button
                      className="notify-btn"
                      onClick={() =>
                        console.log("Notify request from:", userNationality)
                      }
                    >
                      Notify me when available
                    </button>
                  </div>
                )}
              </>
            )}

            {userNationality === null && (
              <p className="location-indicator available">
                📍
                <strong>Location Not Found</strong>
              </p>
            )}
          </div>

          <CommuteSearchForm onSearch={handleSearch} />

          <FeaturedRoutes routes={featuredRoutes} loading={loading} />

          <div ref={availableSectionRef}>
            <AvailableSection
              routes={
                currentFilterType === "matched" ? routes : firstloadroutes
              }
              loading={loading}
              onFilterChange={handleFilterChange}
              searchParams={searchParams}
              currentFilterType={currentFilterType}
            />
          </div>
        </div>

        
      </div>
    );
  }

  // ============ CORPORATE VIEW ============
//   if (activeTab === "corporate") {
//     // Step 1: Choose Service Type
//     if (corporateStep === "choose" || !selectedService) {
//       return (
//         <div className="homepage">
//           <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

//           <div className="hero-banner">
//             <img
//               src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=300&fit=crop"
//               alt="Corporate transportation"
//             />
//           </div>

//           {/* <div className="corporate-container">
//             <div className="page-title">
//               <h1>
//                 Corporate Transportation{" "}
//                 <span className="highlight">Solutions</span>
//               </h1>
//               <p>
//                 Efficient, reliable fleet services tailored for your business
//                 needs in Kuwait.
//               </p>
//             </div>

//             <div className="service-selection">
//               <h2>Find Fleet Solutions</h2>
//               <p>Step 1 of 2: Choose Service</p>

//               <div className="services-grid">
//                 <div
//                   className="service-card"
//                   onClick={() => {
//                     setSelectedService("passenger");
//                     setCorporateStep("form");
//                   }}
//                 >
//                   <div className="service-icon">🚌</div>
//                   <h3>Passenger Vehicles</h3>
//                   <p>Buses, Vans, SUVs for staff or event transport.</p>
//                 </div>

//                 <div
//                   className="service-card"
//                   onClick={() => {
//                     setSelectedService("goods");
//                     setCorporateStep("form");
//                   }}
//                 >
//                   <div className="service-icon">🚚</div>
//                   <h3>Goods Carrier</h3>
//                   <p>Trucks, pickups, and logistics vehicles.</p>
//                 </div>

//                 <div
//                   className="service-card"
//                   onClick={() => {
//                     setSelectedService("managed");
//                     setCorporateStep("form");
//                   }}
//                 >
//                   <div className="service-icon">🏢</div>
//                   <h3>Managed Services</h3>
//                   <p>Full employee shuttle solutions & management.</p>
//                 </div>
//               </div>
//             </div>
//           </div> */}

//           <Footer />
//         </div>
//       );
//     }

//     // Step 2: Show form based on selected service
//     return (
//       <div className="homepage">
//         <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

//         <div className="hero-banner">
//           <img
//             src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=300&fit=crop"
//             alt="Corporate transportation"
//           />
//         </div>

//         <div className="corporate-container">
//           <form className="search-form" onSubmit={handleSearchFleet}>
//             <div className="form-header">
//               <div className="form-header-left">
//                 <h2>Find Fleet Solutions</h2>
//                 <p>Step 2 of 2: Customize Requirements</p>
//               </div>
//               <div className="form-header-right">
//                 <div className="progress-dots">
//                   <span className="dot"></span>
//                   <span className="dot active"></span>
//                 </div>
//               </div>
//             </div>

//             {/* ===== PASSENGER VEHICLES FORM ===== */}
//             {selectedService === "passenger" && (
//               <>
//                 <div className="form-grid-3col">
//                   <div className="form-group">
//                     <label>Preferred Vehicle Type</label>
//                     <select
//                       name="vehicleType"
//                       value={formData.vehicleType}
//                       onChange={handleSelectChange}
//                       className={errors.vehicleType ? "input-error" : ""}
//                     >
//                       <option>Any Type</option>
//                       <option>Bus</option>
//                       <option>Van</option>
//                       <option>SUV</option>
//                     </select>
//                     {errors.vehicleType && (
//                       <span className="error-message">
//                         {errors.vehicleType}
//                       </span>
//                     )}
//                   </div>

//                   <div className="form-group">
//                     <label>Min. Seats</label>
//                     <input
//                       type="text"
//                       name="minSeats"
//                       placeholder="e.g. 14"
//                       value={formData.minSeats}
//                       onChange={handleInputChange}
//                       className={errors.minSeats ? "input-error" : ""}
//                     />
//                     {errors.minSeats && (
//                       <span className="error-message">{errors.minSeats}</span>
//                     )}
//                   </div>

//                   <div className="form-group">
//                     <label>Tentative Start Date</label>
//                     <input
//                       type="date"
//                       name="startDate2"
//                       value={formData.startDate2}
//                       onChange={handleInputChange}
//                       className={errors.startDate2 ? "input-error" : ""}
//                     />
//                     {errors.startDate2 && (
//                       <span className="error-message">{errors.startDate2}</span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label>Monthly Budget Range</label>
//                   <select
//                     name="monthlyBudget"
//                     value={formData.monthlyBudget}
//                     onChange={handleSelectChange}
//                   >
//                     <option>Flexible</option>
//                     <option>Under 1000 KD</option>
//                     <option>1000 - 5000 KD</option>
//                     <option>5000+ KD</option>
//                   </select>
//                 </div>
//               </>
//             )}

//             {/* ===== GOODS CARRIER FORM ===== */}
//             {selectedService === "goods" && (
//               <>
//                 <div className="form-grid-3col">
//                   <div className="form-group">
//                     <label>Preferred Vehicle Type</label>
//                     <select
//                       name="vehicleType2"
//                       value={formData.vehicleType2}
//                       onChange={handleSelectChange}
//                       className={errors.vehicleType2 ? "input-error" : ""}
//                     >
//                       <option>Any Type</option>
//                       <option>Pickup</option>
//                       <option>Truck</option>
//                       <option>Van</option>
//                     </select>
//                     {errors.vehicleType2 && (
//                       <span className="error-message">
//                         {errors.vehicleType2}
//                       </span>
//                     )}
//                   </div>

//                   <div className="form-group">
//                     <label>Capacity (Tons/Vol)</label>
//                     <input
//                       type="text"
//                       name="capacity"
//                       placeholder="e.g. 3 Tons"
//                       value={formData.capacity}
//                       onChange={handleInputChange}
//                       className={errors.capacity ? "input-error" : ""}
//                     />
//                     {errors.capacity && (
//                       <span className="error-message">{errors.capacity}</span>
//                     )}
//                   </div>

//                   <div className="form-group">
//                     <label>Tentative Start Date</label>
//                     <input
//                       type="date"
//                       name="startDate3"
//                       value={formData.startDate3}
//                       onChange={handleInputChange}
//                       className={errors.startDate3 ? "input-error" : ""}
//                     />
//                     {errors.startDate3 && (
//                       <span className="error-message">{errors.startDate3}</span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label>Monthly Budget Range</label>
//                   <select
//                     name="monthlyBudget2"
//                     value={formData.monthlyBudget2}
//                     onChange={handleSelectChange}
//                   >
//                     <option>Flexible</option>
//                     <option>Under 500 KD</option>
//                     <option>500 - 2000 KD</option>
//                     <option>2000+ KD</option>
//                   </select>
//                 </div>
//               </>
//             )}

//             {/* ===== MANAGED SERVICES FORM ===== */}
//             {selectedService === "managed" && (
//               <>
//                 <div className="form-grid-3col">
//                   <div className="form-group">
//                     <label>Preferred Vehicle Type</label>
//                     <select
//                       name="vehicleType3"
//                       value={formData.vehicleType3}
//                       onChange={handleSelectChange}
//                       className={errors.vehicleType3 ? "input-error" : ""}
//                     >
//                       <option>Any Type</option>
//                       <option>Bus</option>
//                       <option>Van</option>
//                       <option>Mixed Fleet</option>
//                     </select>
//                     {errors.vehicleType3 && (
//                       <span className="error-message">
//                         {errors.vehicleType3}
//                       </span>
//                     )}
//                   </div>

//                   <div className="form-group">
//                     <label>Min. Seats</label>
//                     <input
//                       type="text"
//                       name="minSeats2"
//                       placeholder="e.g. 14"
//                       value={formData.minSeats2}
//                       onChange={handleInputChange}
//                       className={errors.minSeats2 ? "input-error" : ""}
//                     />
//                     {errors.minSeats2 && (
//                       <span className="error-message">{errors.minSeats2}</span>
//                     )}
//                   </div>

//                   <div className="form-group">
//                     <label>Working Days/Week</label>
//                     <select
//                       name="workingDays2"
//                       value={formData.workingDays2}
//                       onChange={handleSelectChange}
//                       className={errors.workingDays2 ? "input-error" : ""}
//                     >
//                       <option>Select</option>
//                       <option>3 Days</option>
//                       <option>5 Days</option>
//                       <option>6 Days</option>
//                       <option>7 Days</option>
//                     </select>
//                     {errors.workingDays2 && (
//                       <span className="error-message">
//                         {errors.workingDays2}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="form-grid-2col">
//                   <div className="form-group">
//                     <label>Work Category</label>
//                     <select
//                       name="workCategory3"
//                       value={formData.workCategory3}
//                       onChange={handleSelectChange}
//                     >
//                       <option>Select Category</option>
//                       <option>Engineering</option>
//                       <option>Finance</option>
//                       <option>Healthcare</option>
//                     </select>
//                   </div>

//                   <div className="form-group">
//                     <label>Tentative Start Date</label>
//                     <input
//                       type="date"
//                       name="startDate4"
//                       value={formData.startDate4}
//                       onChange={handleInputChange}
//                       className={errors.startDate4 ? "input-error" : ""}
//                     />
//                     {errors.startDate4 && (
//                       <span className="error-message">{errors.startDate4}</span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label>Monthly Budget Range</label>
//                   <select
//                     name="monthlyBudget3"
//                     value={formData.monthlyBudget3}
//                     onChange={handleSelectChange}
//                   >
//                     <option>Flexible</option>
//                     <option>Under 2000 KD</option>
//                     <option>2000 - 10000 KD</option>
//                     <option>10000+ KD</option>
//                   </select>
//                 </div>
//               </>
//             )}

//             {/* ===== RENTAL PREFERENCES ===== */}
//             <div className="form-group">
//               <label>Rental Preferences</label>
//               <div className="radio-group-horizontal">
//                 <div className="radio-option">
//                   <input
//                     type="radio"
//                     name="rentalPreference"
//                     value="with-driver"
//                     checked={formData.rentalPreference === "with-driver"}
//                     onChange={handleSelectChange}
//                   />
//                   <span className="radio-label">👤 With Driver</span>
//                 </div>
//                 <div className="radio-option">
//                   <input
//                     type="radio"
//                     name="rentalPreference"
//                     value="without-driver"
//                     checked={formData.rentalPreference === "without-driver"}
//                     onChange={handleSelectChange}
//                   />
//                   <span className="radio-label">🚫 Without Driver</span>
//                 </div>
//                 <div className="radio-option">
//                   <input
//                     type="radio"
//                     name="rentalPreference"
//                     value="fuel-included"
//                     checked={formData.rentalPreference === "fuel-included"}
//                     onChange={handleSelectChange}
//                   />
//                   <span className="radio-label">⛽ Fuel Included</span>
//                 </div>
//                 <div className="radio-option">
//                   <input
//                     type="radio"
//                     name="rentalPreference"
//                     value="without-fuel"
//                     checked={formData.rentalPreference === "without-fuel"}
//                     onChange={handleSelectChange}
//                   />
//                   <span className="radio-label">🚫 Without Fuel</span>
//                 </div>
//               </div>
//             </div>

//             {/* ===== SPECIAL REQUIREMENTS ===== */}
//             <div className="form-group">
//               <label>Special Requirements</label>
//               <div className="checkbox-group-horizontal">
//                 {[
//                   "Air Conditioning",
//                   "WiFi Onboard",
//                   "Wheelchair Access",
//                   "GPS Tracking",
//                 ].map((req) => (
//                   <div key={req} className="checkbox-option">
//                     <input
//                       type="checkbox"
//                       checked={formData.specialRequirements.includes(req)}
//                       onChange={() => toggleSpecialRequirement(req)}
//                     />
//                     <span className="checkbox-label">{req}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ===== FORM ACTIONS ===== */}
//             <div className="form-actions">
//               <button
//                 type="button"
//                 className="btn-back"
//                 onClick={() => {
//                   setCorporateStep("choose");
//                   setSelectedService(null);
//                   setErrors({});
//                 }}
//               >
//                 ← Back
//               </button>
//               <button type="submit" className="btn-search">
//                 🔍 Search Fleet
//               </button>
//             </div>
//           </form>
//         </div>

//         <Footer />
//       </div>
//     );
//   }

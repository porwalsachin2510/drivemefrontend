"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  loginSuccess,
  authStart,
  authError,
  clearError,
} from "../../Redux/slices/authSlice";
import api from "../../utils/api";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import {
  selectLoading,
  selectError,
} from "../../Redux/selectors/authSelectors";
import "./register.css";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState("COMMUTER");

  const [success, setSuccess] = useState("");

  const [isOpen, setIsOpen] = useState(true);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "commuters";
  });

  const roles = [
    { id: "COMMUTER", label: "COMMUTER", icon: "👤" },
    { id: "CORPORATE", label: "CORPORATE", icon: "🏢" },
    { id: "B2C_PARTNER", label: "B2C PARTNER", icon: "🚗" },
    { id: "B2B_PARTNER", label: "B2B PARTNER", icon: "🏭" },
  ];

  const roleRedirectMap = {
    COMMUTER: "/commuter-profile",
    CORPORATE: "/corporate-profile",
    B2C_PARTNER: "/b2c-partner-profile",
    B2B_PARTNER: "/b2b-partner-profile",
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
    password: "",
    companyName: "",
    companyAddress: "",
    companyLogo: null,
    tradeLicense: null,
    fleetManagement: [
      {
        vehicleType: "",
        model: "",
        year: "",
        seatingCapacity: "",
        quantityAvailable: "",
        images: [],
      },
    ],
    routeListings: [
      {
        fromLocation: "",
        toLocation: "",
        inboundStart: "",
        routeStartDate: "",
        oneWayPrice: "",
        roundTripPrice: "",
        totalSeats: "",
        availableSeats: "",
        monthlyPrice: "",
        stopPoints: [], // [{ location, time }]
        driverImage: null,
        availableDays: [],
        driverName: "",
        nationality: "",
        licenseNumber: "",
        experience: "",
        vehicleModel: "",
        vehiclePlate: "",
        images: [],
      },
    ],
    acceptedPaymentMethods: [],
  });

  const toggleDay = (day, routeIndex) => {
    const routes = [...formData.routeListings];
    const days = routes[routeIndex].availableDays || [];

    routes[routeIndex].availableDays = days.includes(day)
      ? days.filter((d) => d !== day)
      : [...days, day];

    setFormData({ ...formData, routeListings: routes });
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    dispatch(authError(""));
    setFormData((prev) => ({
      ...prev,
      acceptedPaymentMethods: [],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    dispatch(clearError());
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [name]: {
            file: file,
            preview: reader.result,
            fileName: file.name,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleVehicleChange = (index, field, value) => {
  //   const updatedFleet = [...formData.fleetManagement];
  //   updatedFleet[index][field] = value;
  //   setFormData((prev) => ({
  //     ...prev,
  //     fleetManagement: updatedFleet,
  //   }));
  // };

  // const handleVehicleImageChange = (vehicleIndex, imageIndex, file) => {
  //   const updatedFleet = [...formData.fleetManagement];
  //   const imageArray = [...(updatedFleet[vehicleIndex].images || [])];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       imageArray[imageIndex] = {
  //         file: file,
  //         preview: reader.result,
  //         fileName: file.name,
  //       };
  //       updatedFleet[vehicleIndex].images = imageArray.filter(
  //         (img) => img !== undefined
  //       );
  //       setFormData((prev) => ({
  //         ...prev,
  //         fleetManagement: updatedFleet,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const removeVehicleImage = (vehicleIndex, imageIndex) => {
  //   const updatedFleet = [...formData.fleetManagement];
  //   updatedFleet[vehicleIndex].images = updatedFleet[
  //     vehicleIndex
  //   ].images.filter((_, idx) => idx !== imageIndex);
  //   setFormData((prev) => ({
  //     ...prev,
  //     fleetManagement: updatedFleet,
  //   }));
  // };

  // const canAddMoreVehicleImages = (vehicleIndex) => {
  //   return (formData.fleetManagement[vehicleIndex].images || []).length < 10;
  // };

  // const addVehicle = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     fleetManagement: [
  //       ...prev.fleetManagement,
  //       {
  //         vehicleType: "",
  //         model: "",
  //         year: "",
  //         seatingCapacity: "",
  //         quantityAvailable: "",
  //         images: [],
  //       },
  //     ],
  //   }));
  // };

  // const deleteVehicle = (index) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     fleetManagement: prev.fleetManagement.filter((_, i) => i !== index),
  //   }));
  // };

  const handleRouteChange = (index, field, value) => {
    setFormData((prev) => {
      const routes = [...prev.routeListings];
      if (!routes[index]) return prev;
      routes[index][field] = value;
      return { ...prev, routeListings: routes };
    });
  };

  // const handleRouteChange = (index, field, value) => {
  //   const updatedRoutes = [...formData.routeListings];
  //   updatedRoutes[index][field] = value;
  //   setFormData((prev) => ({
  //     ...prev,
  //     routeListings: updatedRoutes,
  //   }));
  // };

  // const handleStopPointChange = (routeIndex, stopIndex, value) => {
  //   const updatedRoutes = [...formData.routeListings];
  //   const updatedStopPoints = [...updatedRoutes[routeIndex].stopPoints];
  //   updatedStopPoints[stopIndex] = value;
  //   updatedRoutes[routeIndex].stopPoints = updatedStopPoints;
  //   setFormData((prev) => ({
  //     ...prev,
  //     routeListings: updatedRoutes,
  //   }));
  // };

  const addStopPoint = (routeIndex) => {
    const routes = [...formData.routeListings];
    routes[routeIndex].stopPoints.push({ location: "", time: "" });
    setFormData({ ...formData, routeListings: routes });
  };

  const removeStopPoint = (routeIndex, stopIndex) => {
    const updatedRoutes = [...formData.routeListings];
    updatedRoutes[routeIndex].stopPoints = updatedRoutes[
      routeIndex
    ].stopPoints.filter((_, idx) => idx !== stopIndex);
    setFormData((prev) => ({
      ...prev,
      routeListings: updatedRoutes,
    }));
  };

  const handleRouteImageChange = (routeIndex, imageIndex, file) => {
    const updatedRoutes = [...formData.routeListings];
    const imageArray = [...(updatedRoutes[routeIndex].images || [])];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageArray[imageIndex] = {
          file: file,
          preview: reader.result,
          fileName: file.name,
        };
        updatedRoutes[routeIndex].images = imageArray.filter(
          (img) => img !== undefined
        );
        setFormData((prev) => ({
          ...prev,
          routeListings: updatedRoutes,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeRouteImage = (routeIndex, imageIndex) => {
    const updatedRoutes = [...formData.routeListings];
    updatedRoutes[routeIndex].images = updatedRoutes[routeIndex].images.filter(
      (_, idx) => idx !== imageIndex
    );
    setFormData((prev) => ({
      ...prev,
      routeListings: updatedRoutes,
    }));
  };

  const canAddMoreRouteImages = (routeIndex) => {
    return (formData.routeListings[routeIndex].images || []).length < 10;
  };

  const handleCompanyLogoChange = (file) => {
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      companyLogo: {
        file,
        preview: URL.createObjectURL(file),
      },
    }));
  };

  const removeCompanyLogo = () => {
    setFormData((prev) => ({
      ...prev,
      companyLogo: null,
    }));
  };

  const handleDriverImageChange = (routeIndex, file) => {
    if (!file) return;

    const routes = [...formData.routeListings];
    routes[routeIndex].driverImage = {
      file,
      preview: URL.createObjectURL(file),
      fileName: file.name,
    };

    setFormData((prev) => ({
      ...prev,
      routeListings: routes,
    }));
  };

  const removeDriverImage = (routeIndex) => {
    const routes = [...formData.routeListings];
    routes[routeIndex].driverImage = null;

    setFormData((prev) => ({
      ...prev,
      routeListings: routes,
    }));
  };


  const addRoute = () => {
    setFormData((prev) => ({
      ...prev,
      routeListings: [
        ...prev.routeListings,
        {
          fromLocation: "",
          toLocation: "",
          inboundStart: "",
          routeStartDate: "",
          oneWayPrice: "",
          roundTripPrice: "",
          totalSeats: "",
          availableSeats: "",
          stopPoints: [],
          driverName: "",
          nationality: "",
          licenseNumber: "",
          experience: "",
          vehicleModel: "",
          vehiclePlate: "",
          images: [],
        },
      ],
    }));
  };

  const deleteRoute = (index) => {
    setFormData((prev) => ({
      ...prev,
      routeListings: prev.routeListings.filter((_, i) => i !== index),
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setFormData((prev) => ({
      ...prev,
      acceptedPaymentMethods: prev.acceptedPaymentMethods.includes(method)
        ? prev.acceptedPaymentMethods.filter((m) => m !== method)
        : [...prev.acceptedPaymentMethods, method],
    }));
  };

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.whatsappNumber ||
      !formData.password
    ) {
      dispatch(authError("Please fill in all required fields"));
      return false;
    }

    if (
      selectedRole === "CORPORATE" &&
      (!formData.companyName || !formData.companyAddress)
    ) {
      dispatch(authError("Please fill in company details"));
      return false;
    }

    if (selectedRole === "B2C_PARTNER") {
      let hasAtLeastOneRouteWithImage = false;
      for (const route of formData.routeListings) {
        if (route.images && route.images.length > 0) {
          hasAtLeastOneRouteWithImage = true;
          break;
        }
      }

      if (
        formData.routeListings.length === 0 ||
        !hasAtLeastOneRouteWithImage ||
        formData.acceptedPaymentMethods.length === 0
      ) {
        dispatch(
          authError(
            "Please add at least one route with at least one image and select payment methods"
          )
        );
        return false;
      }
    }

    // if (selectedRole === "B2B_PARTNER") {
    //   let hasAtLeastOneVehicleWithImage = false;
    //   for (const vehicle of formData.fleetManagement) {
    //     if (vehicle.images && vehicle.images.length > 0) {
    //       hasAtLeastOneVehicleWithImage = true;
    //       break;
    //     }
    //   }

    //   if (
    //     formData.fleetManagement.length === 0 ||
    //     !hasAtLeastOneVehicleWithImage ||
    //     formData.acceptedPaymentMethods.length === 0
    //   ) {
    //     dispatch(
    //       authError(
    //         "Please add at least one vehicle with at least one image and select payment methods"
    //       )
    //     );
    //     return false;
    //   }
    // }

    if (selectedRole === "B2B_PARTNER") {
      if (formData.acceptedPaymentMethods.length === 0) {
        dispatch(authError("Please select payment methods"));
        return false;
      }
    }
    
    return true;
  };

  console.log("Frontend formData By User", formData);

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    setSuccess("");
    dispatch(authError(""));

    if (!validateForm()) {
      return;
    }

    dispatch(authStart());

    try {
      const submitData = new FormData();
      submitData.append("role", selectedRole);
      submitData.append("fullName", formData.fullName);
      submitData.append("email", formData.email);
      submitData.append("whatsappNumber", formData.whatsappNumber);
      submitData.append("password", formData.password);

      if (formData.companyLogo) {
        submitData.append("companyLogo", formData.companyLogo.file);
      }

      if (selectedRole === "CORPORATE") {
        submitData.append("companyName", formData.companyName);
        submitData.append("companyAddress", formData.companyAddress);
        if (formData.tradeLicense?.file) {
          submitData.append("tradeLicense", formData.tradeLicense.file);
        }
      }

      if (selectedRole === "B2B_PARTNER") {
        // submitData.append(
        //   "fleetManagement",
        //   JSON.stringify(
        //     formData.fleetManagement.map((vehicle) => ({
        //       vehicleType: vehicle.vehicleType,
        //       model: vehicle.model,
        //       year: vehicle.year,
        //       seatingCapacity: vehicle.seatingCapacity,
        //       quantityAvailable: vehicle.quantityAvailable,
        //     }))
        //   )
        // );

        // formData.fleetManagement.forEach((vehicle, vehicleIndex) => {
        //   vehicle.images.forEach((image) => {
        //     const fileToUpload = image.file || image;
        //     submitData.append(`fleetImages_${vehicleIndex}`, fileToUpload);
        //   });
        // });

        submitData.append(
          "acceptedPaymentMethods",
          JSON.stringify(formData.acceptedPaymentMethods)
        );
      }

      if (selectedRole === "B2C_PARTNER") {
        submitData.append(
          "routeListings",
          JSON.stringify(
            formData.routeListings.map((route) => ({
              fromLocation: route.fromLocation,
              toLocation: route.toLocation,
              inboundStart: route.inboundStart,
              routeStartDate: route.routeStartDate,
              oneWayPrice: route.oneWayPrice,
              roundTripPrice: route.roundTripPrice,
              monthlyPrice: route.monthlyPrice,
              totalSeats: route.totalSeats,
              availableSeats: route.availableSeats,
              availableDays: route.availableDays,
              stopPoints: route.stopPoints, // INCLUDE STOP POINTS ARRAY
              driverName: route.driverName,
              nationality: route.nationality,
              licenseNumber: route.licenseNumber,
              experience: route.experience,
              vehicleModel: route.vehicleModel,
              vehiclePlate: route.vehiclePlate,
            }))
          )
        );

        formData.routeListings.forEach((route, routeIndex) => {
          route.images.forEach((image) => {
            const fileToUpload = image.file || image;
            submitData.append(`routeImages_${routeIndex}`, fileToUpload);
          });

           if (route.driverImage?.file) {
             submitData.append(
               `driverImage_${routeIndex}`,
               route.driverImage.file
             );
           }
        });

        

        submitData.append(
          "acceptedPaymentMethods",
          JSON.stringify(formData.acceptedPaymentMethods)
        );
      }

      console.log("submitData", submitData);

      const response = await api.post(
        "/auth/register",
        submitData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        dispatch(
          loginSuccess({
            user: response.data.user,
            token: response.data.token,
          })
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setSuccess("Registration successful! Redirecting...");

        const userRole = response.data.user?.role;
        const redirectPath = roleRedirectMap[userRole] || "/login";

        setTimeout(() => {
          navigate(redirectPath);
        }, 1500);
      }
    } catch (err) {
      dispatch(
        authError(
          err.response?.data?.message ||
            "Registration failed. Please try again."
        )
      );
      dispatch(
        authError(
          err.response?.data?.message ||
            "Registration failed. Please try again."
        )
      );
      console.error("Registration error:", err);
    }
  };

  return (
    <div>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1 className="register-title">Join DriveMe</h1>
            <p className="register-subtitle">
              Create your account and start moving
            </p>
          </div>

          {error && <div className="register-error-message">{error}</div>}
          {success && <div className="register-success-message">{success}</div>}

          <div className="register-role-selector">
            {roles.map((role) => (
              <button
                key={role.id}
                className={`register-role-button ${
                  selectedRole === role.id ? "register-active" : ""
                }`}
                onClick={() => handleRoleSelect(role.id)}
                type="button"
              >
                <span className="register-role-button-icon">{role.icon}</span>
                <span className="register-role-button-text">{role.label}</span>
              </button>
            ))}
          </div>

          <div className="register-form-divider"></div>

          <form onSubmit={handleSubmit}>
            {/* Common Fields for All Roles */}
            <div className="register-form-row">
              <div className="register-form-group">
                <label className="register-form-label">
                  Full Name / Company Rep. <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="register-form-input"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="register-form-group">
                <label className="register-form-label">
                  WhatsApp Number <span className="register-required">*</span>
                </label>
                <input
                  type="tel"
                  className="register-form-input"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
            </div>

            <div className="register-form-row">
              <div className="register-form-group">
                <label className="register-form-label">
                  Email Address <span className="register-required">*</span>
                </label>
                <input
                  type="email"
                  className="register-form-input"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="register-form-group">
                <label className="register-form-label">
                  Password <span className="register-required">*</span>
                </label>
                <input
                  type="password"
                  className="register-form-input"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Corporate Role Specific */}
            {selectedRole === "CORPORATE" && (
              <>
                <div className="register-form-divider"></div>
                <div className="register-corp-section-header">
                  <span className="register-section-icon">🏢</span>
                  <span>Company Details</span>
                </div>

                <div className="register-form-row">
                  <div className="register-form-group">
                    <label className="register-form-label">Company Name</label>
                    <input
                      type="text"
                      className="register-form-input"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="e.g. ABC Trading Co."
                    />
                  </div>
                  <div className="register-form-group">
                    <label className="register-form-label">
                      Trade License / Logo
                    </label>
                    <div className="register-file-input-wrapper">
                      <input
                        type="file"
                        id="tradeLicense"
                        name="tradeLicense"
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                      />
                      <label
                        htmlFor="tradeLicense"
                        className="register-file-input-label"
                      >
                        {formData.tradeLicense
                          ? `${formData.tradeLicense.fileName} ✓`
                          : "Choose File"}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="register-form-row full">
                  <div className="register-form-group">
                    <label className="register-form-label">
                      Company Address
                    </label>
                    <textarea
                      className="register-form-input"
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleInputChange}
                      placeholder="Full office address..."
                    ></textarea>
                  </div>
                </div>
              </>
            )}

            {/* B2B Partner Specific - Fleet Management
            {selectedRole === "B2B_PARTNER" && (
              <>
                <div className="register-form-divider"></div>
                <div className="register-corp-section-header">
                  <span className="register-section-icon">🚗</span>
                  <span>Fleet Management</span>
                </div>

                {formData.fleetManagement.map((vehicle, vehicleIndex) => (
                  <div key={vehicleIndex} className="register-vehicle-item">
                    <div className="register-vehicle-header">
                      <span className="register-vehicle-number">
                        {vehicleIndex + 1}
                      </span>
                      {formData.fleetManagement.length > 1 && (
                        <button
                          type="button"
                          className="register-delete-vehicle-btn"
                          onClick={() => deleteVehicle(vehicleIndex)}
                        >
                          🗑️ Remove
                        </button>
                      )}
                    </div>

                    <div className="register-form-row three-col">
                      <div className="register-form-group">
                        <label className="register-form-label">
                          Vehicle Type
                        </label>
                        <input
                          type="text"
                          className="register-form-input"
                          placeholder="e.g. Bus"
                          value={vehicle.vehicleType}
                          onChange={(e) =>
                            handleVehicleChange(
                              vehicleIndex,
                              "vehicleType",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="register-form-group">
                        <label className="register-form-label">Model</label>
                        <input
                          type="text"
                          className="register-form-input"
                          placeholder="e.g. Mercedes Sprinter"
                          value={vehicle.model}
                          onChange={(e) =>
                            handleVehicleChange(
                              vehicleIndex,
                              "model",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="register-form-group">
                        <label className="register-form-label">Year</label>
                        <input
                          type="number"
                          className="register-form-input"
                          placeholder="2024"
                          value={vehicle.year}
                          onChange={(e) =>
                            handleVehicleChange(
                              vehicleIndex,
                              "year",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="register-form-row">
                      <div className="register-form-group">
                        <label className="register-form-label">
                          Seating Capacity
                        </label>
                        <input
                          type="number"
                          className="register-form-input"
                          placeholder="50"
                          value={vehicle.seatingCapacity}
                          onChange={(e) =>
                            handleVehicleChange(
                              vehicleIndex,
                              "seatingCapacity",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="register-form-group">
                        <label className="register-form-label">
                          Quantity Available
                        </label>
                        <input
                          type="number"
                          className="register-form-input"
                          placeholder="5"
                          value={vehicle.quantityAvailable}
                          onChange={(e) =>
                            handleVehicleChange(
                              vehicleIndex,
                              "quantityAvailable",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="register-form-row register-full">
                      <div className="register-form-group">
                        <label className="register-form-label">
                          Vehicle Images
                          <span className="register-section-subtitle">
                            (Min 1, Max 10)
                          </span>
                        </label>
                        <div className="register-image-gallery">
                          {vehicle.images && vehicle.images.length > 0 ? (
                            <>
                              <div className="register-image-grid">
                                {vehicle.images.map((image, imgIdx) => (
                                  <div
                                    key={imgIdx}
                                    className="register-image-card"
                                  >
                                    <img
                                      src={image.preview || "/placeholder.svg"}
                                      alt={`Vehicle ${imgIdx + 1}`}
                                      className="register-image-thumbnail"
                                    />
                                    <button
                                      type="button"
                                      className="register-remove-image-btn"
                                      onClick={() =>
                                        removeVehicleImage(vehicleIndex, imgIdx)
                                      }
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                                {canAddMoreVehicleImages(vehicleIndex) && (
                                  <label
                                    className="register-image-upload-box add-more"
                                    htmlFor={`vehicleImage_${vehicleIndex}_${vehicle.images.length}`}
                                  >
                                    <input
                                      type="file"
                                      id={`vehicleImage_${vehicleIndex}_${vehicle.images.length}`}
                                      accept="image/*"
                                      onChange={(e) =>
                                        handleVehicleImageChange(
                                          vehicleIndex,
                                          vehicle.images.length,
                                          e.target.files[0]
                                        )
                                      }
                                      style={{ display: "none" }}
                                    />
                                    <span className="register-plus-icon">
                                      +
                                    </span>
                                  </label>
                                )}
                              </div>
                              {vehicle.images.length < 10 && (
                                <p className="register-image-count-text">
                                  {vehicle.images.length}/10 images uploaded
                                </p>
                              )}
                            </>
                          ) : (
                            <label
                              className="register-image-upload-box register-first"
                              htmlFor={`vehicleImage_${vehicleIndex}_0`}
                            >
                              <input
                                type="file"
                                id={`vehicleImage_${vehicleIndex}_0`}
                                accept="image/*"
                                onChange={(e) =>
                                  handleVehicleImageChange(
                                    vehicleIndex,
                                    0,
                                    e.target.files[0]
                                  )
                                }
                                style={{ display: "none" }}
                              />
                              <span className="register-plus-icon">+</span>
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="register-add-vehicle-btn"
                  onClick={addVehicle}
                >
                  + Add Another Vehicle
                </button>
              </>
            )} */}
            

            {/* B2C Partner Specific - Route Listings */}
            {selectedRole === "B2C_PARTNER" && (
              <>
                <div className="form-group">
                  <label className="form-label">
                    Days Vehicles Available (On/Off)
                  </label>
                  {formData.routeListings.map((route, index) => (
                    <div className="days-container">
                      {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                        (day) => (
                          <button
                            type="button"
                            key={day}
                            className={`day-button ${route.availableDays.includes(day) ? "selected" : ""
                              }`}
                            onClick={() => toggleDay(day, index)}
                          >
                            {day}
                          </button>
                        )
                      )}
                    </div>))}
                </div>

                <div className="register-form-row register-full">
                  <div className="register-form-group">
                    <label className="register-form-label">
                      Company Logo
                      <span className="register-section-subtitle">
                        (Only 1 image)
                      </span>
                    </label>

                    <div className="register-image-gallery">
                      {formData.companyLogo ? (
                        <div className="register-image-grid">
                          <div className="register-image-card">
                            <img
                              src={
                                formData.companyLogo.preview ||
                                "/placeholder.svg"
                              }
                              alt="Company Logo"
                              className="register-image-thumbnail"
                            />
                            <button
                              type="button"
                              className="register-remove-image-btn"
                              onClick={removeCompanyLogo}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label
                          className="register-image-upload-box register-first"
                          htmlFor="companyLogo"
                        >
                          <input
                            type="file"
                            id="companyLogo"
                            accept="image/*"
                            onChange={(e) =>
                              handleCompanyLogoChange(e.target.files[0])
                            }
                            style={{ display: "none" }}
                          />
                          <span className="register-plus-icon">+</span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                <div className="register-form-divider"></div>

                <div className="register-b2c-section-header">
                  <div>
                    <div className="register-b2c-top-row">
                      <span className="register-section-icon">🚗</span>
                      <span className="register-section-title">
                        Route Listings
                      </span>
                    </div>

                    <span className="register-section-subtitle">
                      Manage your available routes and seats
                    </span>
                  </div>

                  <button
                    type="button"
                    className="register-add-route-btn"
                    onClick={addRoute}
                  >
                    + Add Route
                  </button>
                </div>

                {formData.routeListings.map((route, routeIndex) => (
                  <div key={routeIndex} className="register-my-route-item">
                    <div className="register-route-header-main">
                      <div className="register-route-header">
                        <span className="register-route-number">
                          {routeIndex + 1}
                        </span>
                        <span className="register-route-title">
                          Route Details
                        </span>
                        <div className="register-route-controls">
                          <button
                            type="button"
                            className="register-delete-route-btn"
                            onClick={() => deleteRoute(routeIndex)}
                          >
                            🗑️
                          </button>

                          <button
                            type="button"
                            className="register-collapse-route-btn"
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            {isOpen ? "▲" : "▼"}
                          </button>
                        </div>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="register-route-content">
                        <div className="register-form-row">
                          <div className="register-form-group">
                            <label className="register-form-label">
                              From Location
                            </label>
                            <input
                              type="text"
                              className="register-form-input"
                              placeholder="e.g. Dubai"
                              value={route.fromLocation}
                              onChange={(e) =>
                                handleRouteChange(
                                  routeIndex,
                                  "fromLocation",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="register-form-group">
                            <label className="register-form-label">
                              To Location
                            </label>
                            <input
                              type="text"
                              className="register-form-input"
                              placeholder="e.g. Abu Dhabi"
                              value={route.toLocation}
                              onChange={(e) =>
                                handleRouteChange(
                                  routeIndex,
                                  "toLocation",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="register-form-row">
                          <div className="register-form-group">
                            <label className="register-form-label">
                              Start Time
                            </label>
                            <input
                              type="time"
                              className="register-form-input"
                              value={route.inboundStart}
                              onChange={(e) =>
                                handleRouteChange(
                                  routeIndex,
                                  "inboundStart",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="register-form-group">
                            <label className="register-form-label">
                              Route Start Date
                            </label>
                            <input
                              type="date"
                              className="register-form-input"
                              value={route.routeStartDate}
                              onChange={(e) =>
                                handleRouteChange(
                                  routeIndex,
                                  "routeStartDate",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="price-register-form-row">
                          <div className="register-form-group">
                            <label className="register-form-label">
                              One Way Price
                            </label>
                            <input
                              type="number"
                              className="register-form-input"
                              placeholder="0.00"
                              value={route.oneWayPrice}
                              onChange={(e) =>
                                handleRouteChange(
                                  routeIndex,
                                  "oneWayPrice",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="register-form-group">
                            <label className="register-form-label">
                              Round Trip Price
                            </label>
                            <input
                              type="number"
                              className="register-form-input"
                              placeholder="0.00"
                              value={route.roundTripPrice}
                              onChange={(e) =>
                                handleRouteChange(
                                  routeIndex,
                                  "roundTripPrice",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div className="register-form-group">
                            <label className="register-form-label">
                              Monthly Price
                            </label>
                            <input
                              type="number"
                              className="register-form-input"
                              placeholder="0.00"
                              value={route.monthlyPrice}
                              onChange={(e) =>
                                handleRouteChange(
                                  routeIndex,
                                  "monthlyPrice",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="register-form-row">
                          <div className="register-form-group">
                            <label className="register-form-label">
                              Total Seats
                            </label>
                            <input
                              type="number"
                              className="register-form-input"
                              placeholder="20"
                              value={route.totalSeats}
                              onChange={(e) =>
                                handleRouteChange(
                                  routeIndex,
                                  "totalSeats",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="register-form-group">
                            <label className="register-form-label">
                              Available Seats
                            </label>
                            <input
                              type="number"
                              className="register-form-input"
                              placeholder="20"
                              value={route.availableSeats}
                              onChange={(e) =>
                                handleRouteChange(
                                  routeIndex,
                                  "availableSeats",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="register-form-divider"></div>

                        <div className="register-stop-points-section">
                          <div className="register-stop-points-header">
                            <div>
                              <span className="register-section-icon">📍</span>
                              <span className="register-section-title">
                                Stop Points
                              </span>
                            </div>
                            <button
                              type="button"
                              className="register-add-stop-btn"
                              onClick={() => addStopPoint(routeIndex)}
                            >
                              + Add Stop Point
                            </button>
                          </div>

                          {route.stopPoints.length > 0 ? (
                            <div className="register-stop-points-list">
                              {route.stopPoints.map((stop, i) => (
                                <div
                                  key={i}
                                  className="register-stop-point-item"
                                >
                                  <span className="register-stop-point-number">
                                    {i + 1}
                                  </span>
                                  <input
                                    type="text"
                                    className="register-form-input register-stop-point-input"
                                    placeholder={`Stop point ${i + 1}`}
                                    value={i.location}
                                    onChange={(e) => {
                                      const sp = [...route.stopPoints];
                                      sp[i] = {
                                        ...sp[i],
                                        location: e.target.value,
                                      };
                                      handleRouteChange(
                                        routeIndex,
                                        "stopPoints",
                                        sp
                                      );
                                    }}
                                  />

                                  <input
                                    type="text"
                                    className="register-form-input register-stop-point-input"
                                    placeholder={`Stop point Time ${i + 1}`}
                                    value={i.time}
                                    onChange={(e) => {
                                      const sp = [...route.stopPoints];
                                      sp[i] = {
                                        ...sp[i],
                                        time: e.target.value,
                                      };
                                      handleRouteChange(
                                        routeIndex,
                                        "stopPoints",
                                        sp
                                      );
                                    }}
                                  />
                                  <button
                                    type="button"
                                    className="register-remove-stop-btn"
                                    onClick={() =>
                                      removeStopPoint(routeIndex, i)
                                    }
                                    title="Remove stop point"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="register-no-stop-points-text">
                              No stop points added yet. Click "+ Add Stop Point"
                              to add stops between your route.
                            </p>
                          )}
                        </div>

                        <div className="register-form-divider"></div>

                        <div className="register-corp-section-header">
                          <span className="register-section-icon">👤</span>
                          <span>Driver Information</span>
                        </div>

                        <div className="register-form-row">
                          <div className="register-form-group">
                            <label className="register-form-label">
                              Driver Name
                            </label>
                            <input
                              type="text"
                              className="register-form-input"
                              placeholder="Enter driver name"
                              value={route.driverName}
                              onChange={(e) =>
                                handleRouteChange(
                                  routeIndex,
                                  "driverName",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="register-form-group">
                            <label className="register-form-label">
                              Nationality
                            </label>
                            <input
                              type="text"
                              className="register-form-input"
                              placeholder="e.g. Indian"
                              value={route.nationality}
                              onChange={(e) =>
                                handleRouteChange(
                                  routeIndex,
                                  "nationality",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="register-form-row">
                          <div className="register-form-group">
                            <label className="register-form-label">
                              License Number
                            </label>
                            <input
                              type="text"
                              className="register-form-input"
                              placeholder="License ID"
                              value={route.licenseNumber}
                              onChange={(e) =>
                                handleRouteChange(
                                  routeIndex,
                                  "licenseNumber",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="register-form-group">
                            <label className="register-form-label">
                              Experience (Years)
                            </label>
                            <input
                              type="number"
                              className="register-form-input"
                              placeholder="0"
                              value={route.experience}
                              onChange={(e) =>
                                handleRouteChange(
                                  routeIndex,
                                  "experience",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="register-form-row register-full">
                          <div className="register-form-group">
                            <label className="register-form-label">
                              Driver Image
                              <span className="register-section-subtitle">
                                (Only 1 image)
                              </span>
                            </label>

                            <div className="register-image-gallery">
                              {route.driverImage ? (
                                <div className="register-image-grid">
                                  <div className="register-image-card">
                                    <img
                                      src={
                                        route.driverImage.preview ||
                                        "/placeholder.svg"
                                      }
                                      alt="Driver Image"
                                      className="register-image-thumbnail"
                                    />
                                    <button
                                      type="button"
                                      className="register-remove-image-btn"
                                      onClick={() =>
                                        removeDriverImage(routeIndex)
                                      }
                                    >
                                      ✕
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <label
                                  className="register-image-upload-box register-first"
                                  htmlFor={`driverImage_${routeIndex}`}
                                >
                                  <input
                                    type="file"
                                    id={`driverImage_${routeIndex}`}
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleDriverImageChange(
                                        routeIndex,
                                        e.target.files[0]
                                      )
                                    }
                                    style={{ display: "none" }}
                                  />
                                  <span className="register-plus-icon">+</span>
                                </label>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="register-form-divider"></div>

                        <div className="register-corp-section-header">
                          <span className="register-section-icon">🚗</span>
                          <span>Vehicle Information</span>
                        </div>

                        <div className="register-form-row">
                          <div className="register-form-group">
                            <label className="register-form-label">
                              Vehicle Model
                            </label>
                            <input
                              type="text"
                              className="register-form-input"
                              placeholder="e.g. Toyota Hiace"
                              value={route.vehicleModel}
                              onChange={(e) =>
                                handleRouteChange(
                                  routeIndex,
                                  "vehicleModel",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="register-form-group">
                            <label className="register-form-label">
                              Vehicle Plate
                            </label>
                            <input
                              type="text"
                              className="register-form-input"
                              placeholder="e.g. ABC-1234"
                              value={route.vehiclePlate}
                              onChange={(e) =>
                                handleRouteChange(
                                  routeIndex,
                                  "vehiclePlate",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="register-form-row register-full">
                          <div className="register-form-group">
                            <label className="register-form-label">
                              Vehicle Images
                              <span className="register-section-subtitle">
                                (Min 1, Max 10)
                              </span>
                            </label>
                            <div className="register-image-gallery">
                              {route.images && route.images.length > 0 ? (
                                <>
                                  <div className="register-image-grid">
                                    {route.images.map((image, imgIdx) => (
                                      <div
                                        key={imgIdx}
                                        className="register-image-card"
                                      >
                                        <img
                                          src={
                                            image.preview || "/placeholder.svg"
                                          }
                                          alt={`Route ${imgIdx + 1}`}
                                          className="register-image-thumbnail"
                                        />
                                        <button
                                          type="button"
                                          className="register-remove-image-btn"
                                          onClick={() =>
                                            removeRouteImage(routeIndex, imgIdx)
                                          }
                                        >
                                          ✕
                                        </button>
                                      </div>
                                    ))}
                                    {canAddMoreRouteImages(routeIndex) && (
                                      <label
                                        className="register-image-upload-box add-more"
                                        htmlFor={`routeImage_${routeIndex}_${route.images.length}`}
                                      >
                                        <input
                                          type="file"
                                          id={`routeImage_${routeIndex}_${route.images.length}`}
                                          accept="image/*"
                                          onChange={(e) =>
                                            handleRouteImageChange(
                                              routeIndex,
                                              route.images.length,
                                              e.target.files[0]
                                            )
                                          }
                                          style={{ display: "none" }}
                                        />
                                        <span className="register-plus-icon">
                                          +
                                        </span>
                                      </label>
                                    )}
                                  </div>
                                  {route.images.length < 10 && (
                                    <p className="register-image-count-text">
                                      {route.images.length}/10 images uploaded
                                    </p>
                                  )}
                                </>
                              ) : (
                                <label
                                  className="register-image-upload-box register-first"
                                  htmlFor={`routeImage_${routeIndex}_0`}
                                >
                                  <input
                                    type="file"
                                    id={`routeImage_${routeIndex}_0`}
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleRouteImageChange(
                                        routeIndex,
                                        0,
                                        e.target.files[0]
                                      )
                                    }
                                    style={{ display: "none" }}
                                  />
                                  <span className="register-plus-icon">+</span>
                                </label>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {/* Payment Methods */}
            {(selectedRole === "B2B_PARTNER" ||
              selectedRole === "B2C_PARTNER") && (
              <>
                <div className="register-form-divider"></div>
                <div className="register-corp-section-header">
                  <span className="register-section-icon">💳</span>
                  <span>Payment Methods</span>
                </div>
                <div className="register-payment-methods">
                  {[
                    "Cash",
                    "Credit Card",
                    "Bank Transfer",
                    "Mobile Wallet",
                  ].map((method) => (
                    <button
                      key={method}
                      type="button"
                      className={`register-payment-option ${
                        formData.acceptedPaymentMethods.includes(method)
                          ? "register-selected"
                          : ""
                      }`}
                      onClick={() => handlePaymentMethodChange(method)}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </>
            )}

            <button
              type="submit"
              className="register-submit-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="register-signin-link">
            Already have an account? <Link to="/login">Sign in here</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;

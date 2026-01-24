import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { SocketProvider } from "./context/SocketContext";
import HomePage from "./Pages/HomePage/index";
import SearchFleet from "./Pages/SearchFleetPage/SearchFleet";
import CommuterProfilePage from "./Pages/CommuterPages/CommuterProfilePage/CommuterProfilePage";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ProtectedRoleBasedRoute from "./Components/ProtectedRoleBasedRoute/ProtectedRoleBasedRoute";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProtectedAdminRoleBasedRoute from "./Components/ProtectedAdminRoleBasedRoute/ProtectedAdminRoleBasedRoute";
import PublicRoute from "./Components/PublicRoute/PublicRoute";
import CommuterContractPage from "./Pages/CommuterPages/CommuterContractPage/CommuterContractPage";
import B2C_PartnerProfilePage from "./Pages/B2C_PartnerPages/B2C_PartnerProfilePage/B2C_PartnerProfilePage";
import B2C_PartnerContractPage from "./Pages/B2C_PartnerPages/B2C_ParnterContractPage/B2C_PartnerContractPage";
import B2B_PartnerProfilePage from "./Pages/B2B_PartnerPages/B2B_PartnerProfilePage/B2B_PartnerProfilePage";
import B2B_PartnerContractPage from "./Pages/B2B_PartnerPages/B2B_ParnterContractPage/B2B_PartnerContractPage";
import CorporateProfilePage from "./Pages/CorporatePages/CorporateProfilePage/CorporateProfilePage";
import CorporateContractPage from "./Pages/CorporatePages/CorporateContractPage/CorporateContractPage";
import PublicAdminRoute from "./Components/PublicAdminRoute/PublicAdminRoute";
import AdminLoginPage from "./Pages/AdminPages/AdminLoginPage/AdminLoginPage";
import AdminDashboardPage from "./Pages/AdminPages/AdminDashboardPage/AdminDashboardPage";
import PaymentVerification from "./Pages/AdminPages/AdminPaymentVerification/PaymentVerification";
import Corporate from "./Pages/CorporatePages/Corporate/Corporate";
import ServiceSelection from "./Pages/CorporatePages/ServiceSelection/ServiceSelection";
import SearchResults from "./Pages/CorporatePages/SearchResults/SearchResults";
import VehicleDetails from "./Pages/CorporatePages/VehicleDetails/VehicleDetails";
import FleetOwnerPortfolio from "./Pages/CorporatePages/FleetOwnerPortfolio/FleetOwnerPortfolio";
import SingleVehicleOwnerDetails from "./Pages/CorporatePages/SingleVehicleOwnerDetails/SingleVehicleOwnerDetails";
import MyQuotations from "./Pages/CorporatePages/MyQuotations/MyQuotations";
import QuotationDetails from "./Pages/CorporatePages/QuotationDetails/QuotationDetails";
import CorporateContractDetails from "./Pages/CorporatePages/CorporateContractDetails/CorporateContractDetails";
import B2B_PartnerContractDetails from "./Pages/B2B_PartnerPages/B2B_PartnerContractDetails/B2B_PartnerContractDetails";
import PaymentCallback from "./Pages/PaymentCallback/PaymentCallback";
import B2B_PartnerAssignmentUI from "./Pages/B2B_PartnerPages/B2B_PartnerAssignmentUI/B2B_PartnerAssignmentUI";
import B2B_PartnerVehicleAssignmentList from "./Pages/B2B_PartnerPages/B2B_PartnerVehicleAssignment/B2B_PartnerVehicleAssignmentList";
import B2B_PartnerVehicleAssignmentForm from "./Pages/B2B_PartnerPages/B2B_PartnerVehicleAssignmentForm/B2B_PartnerVehicleAssignmentForm";
import CorporateAssignedVehiclesPage from "./Pages/CorporatePages/CorporateAssignedVehiclesPage/CorporateAssignedVehiclesPage";
import CorporateEmployeeBookingsPage from "./Pages/CorporatePages/CorporateEmployeeBookingsPage/CorporateEmployeeBookingsPage";
import B2C_PartnerBookingsPage from "./Pages/B2C_PartnerPages/B2C_PartnerBookingsPage/B2C_PartnerBookingsPage";
import CommuterMyBookingsPage from "./Pages/CommuterPages/CommuterMyBookingsPage/CommuterMyBookingsPage";

function App() {
  return (
    <Provider store={store}>
      <SocketProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/search-fleet" element={<SearchFleet />} />
          <Route
            path="/commuter-profile"
            element={
              <ProtectedRoleBasedRoute allowedRoles={["COMMUTER"]}>
                <CommuterProfilePage />
              </ProtectedRoleBasedRoute>
            }
          />
          <Route
            path="/commuter/mybookings"
            element={
              <ProtectedRoleBasedRoute allowedRoles={["COMMUTER"]}>
                <CommuterMyBookingsPage />
              </ProtectedRoleBasedRoute>
            }
          />

          {/* <Route
          path="/service-selection"
          element={
            <ProtectedRoleBasedRoute allowedRoles={["CORPORATE"]}>
              <ServiceSelection />
            </ProtectedRoleBasedRoute>
          }
        /> */}
          <Route
            path="/corporate"
            element={
              <ProtectedRoleBasedRoute allowedRoles={["CORPORATE"]}>
                <Corporate />
              </ProtectedRoleBasedRoute>
            }
          />
          <Route
            path="/search-results"
            element={
              <ProtectedRoleBasedRoute allowedRoles={["CORPORATE"]}>
                <SearchResults />
              </ProtectedRoleBasedRoute>
            }
          />
          <Route
            path="/view-single-vehicle-owner"
            element={
              <ProtectedRoleBasedRoute allowedRoles={["CORPORATE"]}>
                <SingleVehicleOwnerDetails />
              </ProtectedRoleBasedRoute>
            }
          />
          <Route
            path="/my-quotations"
            element={
              <ProtectedRoute allowedRoles={["CORPORATE"]}>
                <MyQuotations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quotation/:id"
            element={
              <ProtectedRoute allowedRoles={["CORPORATE"]}>
                <QuotationDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/corporate/contracts"
            element={
              <ProtectedRoute allowedRoles={["CORPORATE"]}>
                <CorporateContractPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/corporate/contracts/:id"
            element={
              <ProtectedRoute allowedRoles={["CORPORATE"]}>
                <CorporateContractDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicle/:id"
            element={
              <ProtectedRoleBasedRoute allowedRoles={["CORPORATE"]}>
                <VehicleDetails />
              </ProtectedRoleBasedRoute>
            }
          />
          <Route
            path="/fleet-portfolio/:id"
            element={
              <ProtectedRoleBasedRoute allowedRoles={["CORPORATE"]}>
                <FleetOwnerPortfolio />
              </ProtectedRoleBasedRoute>
            }
          />
          <Route
            path="/commuter-profile/contract"
            element={
              <ProtectedRoleBasedRoute allowedRoles={["COMMUTER"]}>
                <CommuterContractPage />
              </ProtectedRoleBasedRoute>
            }
          />
          <Route
            path="/b2c-partner/bookings"
            element={
              <ProtectedRoute allowedRoles={["B2C_PARTNER"]}>
                <B2C_PartnerBookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/b2c-partner-profile/contract"
            element={
              <ProtectedRoute allowedRoles={["B2C_PARTNER"]}>
                <B2C_PartnerContractPage />
              </ProtectedRoute>
            }
          />
          {/* <Route
          path="/b2b-partner-profile"
          element={
            <ProtectedRoute allowedRoles={["B2B_PARTNER"]}>
              <B2B_PartnerProfilePage />
            </ProtectedRoute>
          }
        /> */}
          <Route
            path="/b2b-partner/contracts"
            element={
              <ProtectedRoute allowedRoles={["B2B_PARTNER"]}>
                <B2B_PartnerContractPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/b2b-partner/contracts/:id"
            element={
              <ProtectedRoute allowedRoles={["B2B_PARTNER"]}>
                <B2B_PartnerContractDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/corporate-profile"
            element={
              <ProtectedRoute allowedRoles={["CORPORATE"]}>
                <CorporateProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/corporate/assigned-vehicles"
            element={
              <ProtectedRoute allowedRoles={["CORPORATE"]}>
                <CorporateAssignedVehiclesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/corporate/bookings"
            element={
              <ProtectedRoute allowedRoles={["CORPORATE"]}>
                <CorporateEmployeeBookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />{" "}
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />{" "}
              </PublicRoute>
            }
          />
          <Route
            path="/admin-login"
            element={
              <PublicAdminRoute>
                <AdminLoginPage />{" "}
              </PublicAdminRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedAdminRoleBasedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboardPage />
              </ProtectedAdminRoleBasedRoute>
            }
          />
          <Route
            path="/admin-payment-verification"
            element={
              <ProtectedAdminRoleBasedRoute allowedRoles={["ADMIN"]}>
                <PaymentVerification />
              </ProtectedAdminRoleBasedRoute>
            }
          />
          <Route
            path="/b2b-partner/vehicle-assignment"
            element={
              <ProtectedAdminRoleBasedRoute allowedRoles={["B2B_PARTNER"]}>
                <B2B_PartnerAssignmentUI />
              </ProtectedAdminRoleBasedRoute>
            }
          />
          <Route
            path="/b2b-partner/vehicle-assignmentlist"
            element={
              <ProtectedAdminRoleBasedRoute allowedRoles={["B2B_PARTNER"]}>
                <B2B_PartnerVehicleAssignmentList />
              </ProtectedAdminRoleBasedRoute>
            }
          />
          <Route
            path="/b2b-partner/vehicle-assignmentform"
            element={
              <ProtectedAdminRoleBasedRoute allowedRoles={["B2B_PARTNER"]}>
                <B2B_PartnerVehicleAssignmentForm />
              </ProtectedAdminRoleBasedRoute>
            }
          />
          <Route path="/payment/callback" element={<PaymentCallback />} />
        </Routes>
      </SocketProvider>
    </Provider>
  );
}

export default App;

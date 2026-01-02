"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../Redux/selectors/authSelectors";

import ServiceSelection from "../CorporatePages/ServiceSelection/ServiceSelection";
import CommuterHomePage from "../CommuterPages/CommuterHomePage/CommuteHomePage";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import B2B_PartnerProfilePage from "../B2B_PartnerPages/B2B_PartnerProfilePage/B2B_PartnerProfilePage";
import B2C_PartnerProfilePage from "../B2C_PartnerPages/B2C_PartnerProfilePage/B2C_PartnerProfilePage";


export default function HomePage() {
  const userRole = useSelector(selectUserRole);
  const [activeTab, setActiveTab] = useState("commuters");

  return (
    <>
      {/* ✅ Navbar MUST be rendered */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* CORPORATE USER */}
      {userRole === "CORPORATE" && <ServiceSelection />}

      {/* COMMUTER / GUEST */}
      {userRole === "COMMUTER" && <CommuterHomePage />}

      {/* B2B_PARTNER */}
      {userRole === "B2B_PARTNER" && <B2B_PartnerProfilePage />}

      {/* B2C_PARTNER */}
      {userRole === "B2C_PARTNER" && <B2C_PartnerProfilePage />}

      <Footer />
    </>
  );
}

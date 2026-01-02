"use client";

import { useState } from "react";
import RideCard from "../RideCard/RideCard";
import "./my-rides.css";

export default function MyRides() {
  const [activeSubTab, setActiveSubTab] = useState("all");

  const allRides = [
    {
      id: 1,
      route: "Salmiya to Mahboula Express",
      company: "Careem Bus",
      bookingId: "BKG-2024003",
      date: "Mar 26, 2024",
      time: "16:00 AM",
      price: "3.353",
      status: "ongoing",
      borderColor: "#4B9EFF",
    },
    {
      id: 2,
      route: "Salwa to Mahboula Express",
      company: "Gulf Transport",
      bookingId: "BKG-2024007",
      date: "Mar 09, 2024",
      time: "12:00 PM",
      price: "1.631",
      status: "ongoing",
      borderColor: "#4B9EFF",
    },
    {
      id: 3,
      route: "Mahboula to Kuwait City Express",
      company: "Gulf Transport",
      bookingId: "BKG-2024005",
      date: "Feb 29, 2024",
      time: "6:00 AM",
      price: "5.173",
      status: "upcoming",
      borderColor: "#FFB800",
      showViewTicket: true,
    },
    {
      id: 4,
      route: "Hawally to Kuwait City Express",
      company: "City Bus",
      bookingId: "BKG-2024012",
      date: "Feb 28, 2024",
      time: "14:00 PM",
      price: "3.578",
      status: "upcoming",
      borderColor: "#FFB800",
      showViewTicket: true,
    },
    {
      id: 5,
      route: "Mahboula to Mangaf Express",
      company: "Royal Fleets",
      bookingId: "BKG-2024010",
      date: "Feb 19, 2024",
      time: "6:00 PM",
      price: "4.646",
      status: "upcoming",
      borderColor: "#FFB800",
      showViewTicket: true,
    },
    {
      id: 6,
      route: "Salwa to Khaitan Express",
      company: "Raha Logistics",
      bookingId: "BKG-2024001",
      date: "Dec 02, 2023",
      time: "17:00 AM",
      price: "1.875",
      status: "upcoming",
      borderColor: "#FFB800",
      showViewTicket: true,
    },
    {
      id: 7,
      route: "Mahboula to Fahaheel Express",
      company: "Gulf Transport",
      bookingId: "BKG-2024006",
      date: "Nov 16, 2023",
      time: "8:00 PM",
      price: "1.581",
      status: "upcoming",
      borderColor: "#FFB800",
      showViewTicket: true,
    },
    {
      id: 8,
      route: "Salwa to Hawally Express",
      company: "Raha Logistics",
      bookingId: "BKG-2024011",
      date: "Feb 17, 2024",
      time: "12:00 PM",
      price: "3.095",
      status: "completed",
      borderColor: "#00B074",
      showRateButton: true,
    },
    {
      id: 9,
      route: "Kuwait City to Salwa Express",
      company: "KGL Transport",
      bookingId: "BKG-2024002",
      date: "Jan 27, 2024",
      time: "17:00 PM",
      price: "5.072",
      status: "cancelled",
      borderColor: "#D1D5DB",
    },
    {
      id: 10,
      route: "Kuwait City to Farwaniya Express",
      company: "City Bus",
      bookingId: "BKG-2024000",
      date: "Jan 14, 2024",
      time: "17:00 AM",
      price: "0.648",
      status: "ongoing",
      borderColor: "#4B9EFF",
    },
    {
      id: 11,
      route: "Mahboula to Mahboula Express",
      company: "City Bus",
      bookingId: "BKG-2024009",
      date: "Jan 05, 2024",
      time: "13:00 PM",
      price: "2.743",
      status: "ongoing",
      borderColor: "#4B9EFF",
    },
    {
      id: 12,
      route: "Fahaheel to Khaitan Express",
      company: "Careem Bus",
      bookingId: "BKG-2024014",
      date: "Dec 08, 2023",
      time: "8:00 PM",
      price: "0.584",
      status: "cancelled",
      borderColor: "#D1D5DB",
    },
    {
      id: 13,
      route: "Khaitan to Kuwait City Express",
      company: "Gulf Transport",
      bookingId: "BKG-2024008",
      date: "Dec 07, 2023",
      time: "6:00 PM",
      price: "3.664",
      status: "ongoing",
      borderColor: "#4B9EFF",
    },
    {
      id: 14,
      route: "Farwaniya to Kuwait City Express",
      company: "Careem Bus",
      bookingId: "BKG-2024004",
      date: "Dec 04, 2023",
      time: "6:00 PM",
      price: "3.871",
      status: "cancelled",
      borderColor: "#D1D5DB",
    },
    {
      id: 15,
      route: "Salwa to Khaitan Express",
      company: "Raha Logistics",
      bookingId: "BKG-2024001",
      date: "Dec 02, 2023",
      time: "17:00 AM",
      price: "1.875",
      status: "upcoming",
      borderColor: "#FFB800",
      showViewTicket: true,
    },
    {
      id: 16,
      route: "Farwaniya to Kuwait City Express",
      company: "Careem Bus",
      bookingId: "BKG-2024013",
      date: "Nov 26, 2023",
      time: "8:00 AM",
      price: "2.913",
      status: "ongoing",
      borderColor: "#4B9EFF",
    },
    {
      id: 17,
      route: "Mahboula to Fahaheel Express",
      company: "Gulf Transport",
      bookingId: "BKG-2024008",
      date: "Nov 16, 2023",
      time: "8:00 PM",
      price: "1.581",
      status: "upcoming",
      borderColor: "#FFB800",
      showViewTicket: true,
    },
  ];

  const filteredRides = allRides.filter((ride) => {
    if (activeSubTab === "all") return true;
    return ride.status === activeSubTab;
  });

  return (
    <div className="my-rides-section">
      <div className="section-header">
        <div>
          <h2>My Rides</h2>
          <p>Manage and view your travel history</p>
        </div>
        <div className="sub-tabs">
          <button
            className={`sub-tab ${activeSubTab === "all" ? "active" : ""}`}
            onClick={() => setActiveSubTab("all")}
          >
            All
          </button>
          <button
            className={`sub-tab ${activeSubTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveSubTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`sub-tab ${
              activeSubTab === "completed" ? "active" : ""
            }`}
            onClick={() => setActiveSubTab("completed")}
          >
            Completed
          </button>
          <button
            className={`sub-tab ${
              activeSubTab === "cancelled" ? "active" : ""
            }`}
            onClick={() => setActiveSubTab("cancelled")}
          >
            Cancelled
          </button>
        </div>
      </div>

      <div className="rides-list">
        {filteredRides.map((ride) => (
          <RideCard key={ride.id} ride={ride} />
        ))}
      </div>
    </div>
  );
}

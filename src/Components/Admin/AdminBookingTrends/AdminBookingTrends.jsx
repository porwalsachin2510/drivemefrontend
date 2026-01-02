"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import "./AdminBookingTrends.css"

function AdminBookingTrends() {
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    setAnimationKey((prev) => prev + 1)
  }, [])

  const data = [
    { month: "Jan", bookings: 720 },
    { month: "Feb", bookings: 550 },
    { month: "Mar", bookings: 210 },
    { month: "Apr", bookings: 650 },
    { month: "May", bookings: 630 },
    { month: "Jun", bookings: 480 },
    { month: "Jul", bookings: 560 },
    { month: "Aug", bookings: 540 },
    { month: "Sep", bookings: 500 },
    { month: "Oct", bookings: 420 },
    { month: "Nov", bookings: 310 },
    { month: "Dec", bookings: 640 },
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="ad-dash-custom-tooltip">
          <p className="ad-dash-tooltip-month">{payload[0].payload.month}</p>
          <p style={{ color: "#d4a574", fontWeight: "600" }}>Bookings: {payload[0].value}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="ad-dash-booking-trends">
      <div className="ad-dash-booking-header">
        <h3 className="ad-dash-chart-title">Monthly Booking Trends</h3>
        <select className="ad-dash-period-select">
          <option>Last 12 Months</option>
          <option>Last 6 Months</option>
          <option>Last 3 Months</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} key={animationKey}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: "12px" }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(212, 165, 116, 0.1)" }} />
          <Bar dataKey="bookings" fill="#d4a574" radius={[8, 8, 0, 0]} animationDuration={1000} animationBegin={0} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AdminBookingTrends

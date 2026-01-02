"use client"

import { useState, useEffect } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import "./AdminRevenueChart.css"

function AdminRevenueChart() {
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    setAnimationKey((prev) => prev + 1)
  }, [])

  const data = [
    { month: "Jan", total: 6500, corporate: 4000 },
    { month: "Feb", total: 3500, corporate: 2500 },
    { month: "Mar", total: 5800, corporate: 3800 },
    { month: "Apr", total: 4200, corporate: 3200 },
    { month: "May", total: 5200, corporate: 3500 },
    { month: "Jun", total: 4800, corporate: 3200 },
    { month: "Jul", total: 5500, corporate: 3600 },
    { month: "Aug", total: 5200, corporate: 3400 },
    { month: "Sep", total: 4500, corporate: 3000 },
    { month: "Oct", total: 5800, corporate: 3800 },
    { month: "Nov", total: 5200, corporate: 3400 },
    { month: "Dec", total: 4200, corporate: 3000 },
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="ad-dash-custom-tooltip">
          <p className="ad-dash-tooltip-month">{payload[0].payload.month}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()} KWD
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="ad-dash-revenue-chart">
      <h3 className="ad-dash-chart-title">Revenue Performance (YTD)</h3>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} key={animationKey}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00A699" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00A699" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCorporate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#374151" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#374151" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: "12px" }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} tickFormatter={(value) => `${value / 1000}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#00A699"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorTotal)"
            name="Total Revenue"
            animationDuration={1500}
            animationBegin={0}
          />
          <Area
            type="monotone"
            dataKey="corporate"
            stroke="#374151"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorCorporate)"
            name="Corporate Revenue"
            animationDuration={1500}
            animationBegin={200}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AdminRevenueChart

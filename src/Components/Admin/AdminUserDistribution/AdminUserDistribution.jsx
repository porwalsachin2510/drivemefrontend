"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import "./AdminUserDistribution.css"

function AdminUserDistribution() {
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    setAnimationKey((prev) => prev + 1)
  }, [])

  const data = [
    { name: "Commuters", value: 50, color: "#00A699" },
    { name: "Corporates", value: 50, color: "#1e293b" },
    { name: "Providers", value: 50, color: "#d4a574" },
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="ad-dash-custom-tooltip">
          <p style={{ color: payload[0].payload.color, fontWeight: "600" }}>
            {payload[0].name}: {payload[0].value} Users
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="ad-dash-user-distribution">
      <h3 className="ad-dash-chart-title">User Distribution</h3>
      <div className="ad-dash-donut-container">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart key={animationKey}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              animationDuration={1500}
              animationBegin={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="ad-dash-donut-center">
          <div className="ad-dash-donut-value">150</div>
          <div className="ad-dash-donut-label">Total Users</div>
        </div>
      </div>
      <div className="ad-dash-legend">
        {data.map((item, index) => (
          <div key={index} className="ad-dash-legend-item">
            <div className="ad-dash-legend-color" style={{ backgroundColor: item.color }}></div>
            <div className="ad-dash-legend-info">
              <span className="ad-dash-legend-name">{item.name}</span>
              <span className="ad-dash-legend-value">{item.value} Users</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminUserDistribution

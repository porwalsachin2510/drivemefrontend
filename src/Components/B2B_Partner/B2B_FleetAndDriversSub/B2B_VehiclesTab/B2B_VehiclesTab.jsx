import "./b2b_vehiclestab.css";

function B2B_VehiclesTab() {
  const vehicles = [
    {
      id: 1,
      name: "Lexus ES",
      plate: "50-1000",
      year: "2022",
      type: "Sedan (4 seats)",
      driver: "Mariam",
      status: "Maintenance",
      statusColor: "warning",
    },
    {
      id: 2,
      name: "Mercedes Minibus",
      plate: "50-1001",
      year: "2022",
      type: "Minibus (22 seats)",
      driver: "Fahad",
      status: "Active",
      statusColor: "success",
    },
    {
      id: 3,
      name: "Mercedes Coach Bus",
      plate: "50-1002",
      year: "2021",
      type: "Coach Bus (50 seats)",
      driver: "Unassigned",
      status: "Active",
      statusColor: "success",
    },
    {
      id: 4,
      name: "Mercedes Van",
      plate: "50-1003",
      year: "2022",
      type: "Van (12 seats)",
      driver: "Abdullah",
      status: "Active",
      statusColor: "success",
    },
    {
      id: 5,
      name: "Lexus ES",
      plate: "50-1004",
      year: "2020",
      type: "Sedan (4 seats)",
      driver: "Unassigned",
      status: "Active",
      statusColor: "success",
    },
    {
      id: 6,
      name: "Mercedes Van",
      plate: "50-1005",
      year: "2023",
      type: "Van (12 seats)",
      driver: "Yousef",
      status: "Active",
      statusColor: "success",
    },
    {
      id: 7,
      name: "Mercedes Van",
      plate: "50-1006",
      year: "2023",
      type: "Van (12 seats)",
      driver: "Mohammed",
      status: "Maintenance",
      statusColor: "warning",
    },
    {
      id: 8,
      name: "Lexus ES",
      plate: "50-1007",
      year: "2021",
      type: "Sedan (4 seats)",
      driver: "Fatima",
      status: "Maintenance",
      statusColor: "warning",
    },
  ];

  return (
    <div className="vehicles-grid">
      {vehicles.map((vehicle) => (
        <div key={vehicle.id} className="vehicle-card">
          <div className="vehicle-header">
            <div className="vehicle-icon">🚗</div>
            <span className={`status-badge ${vehicle.statusColor}`}>
              {vehicle.status}
            </span>
          </div>
          <h3 className="vehicle-name">{vehicle.name}</h3>
          <p className="vehicle-plate">
            {vehicle.plate} • {vehicle.year}
          </p>

          <div className="vehicle-details">
            <div className="detail-row">
              <span className="detail-label">Type</span>
              <span className="detail-value">{vehicle.type}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Driver</span>
              <span className="detail-value">{vehicle.driver}</span>
            </div>
          </div>

          <div className="vehicle-actions">
            {vehicle.status === "Maintenance" ? (
              <button className="action-btn activate">Activate</button>
            ) : (
              <button className="action-btn maintenance">⚡ Maintenance</button>
            )}
            <button className="action-btn-more">⋯</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default B2B_VehiclesTab;

import "./b2b_driverstab.css";

function B2B_DriversTab() {
  const drivers = [
    {
      id: 1,
      initial: "Z",
      name: "Zainab Al-Otaibi",
      driverId: "DRV-7000",
      status: "On Trip",
      rating: 5.0,
      phone: "+965 58934325",
      trips: 440,
    },
    {
      id: 2,
      initial: "M",
      name: "Mariam Al-Ali",
      driverId: "DRV-7001",
      status: "Off Duty",
      rating: 4.5,
      phone: "+965 51641821",
      trips: 145,
    },
    {
      id: 3,
      initial: "M",
      name: "Mohammed Al-Ali",
      driverId: "DRV-7002",
      status: "On Trip",
      rating: 4.6,
      phone: "+965 57459542",
      trips: 57,
    },
    {
      id: 4,
      initial: "S",
      name: "Sarah Al-Otaibi",
      driverId: "DRV-7003",
      status: "Available",
      rating: 4.1,
      phone: "+965 55539941",
      trips: 60,
    },
    {
      id: 5,
      initial: "S",
      name: "Sarah Al-Mutairi",
      driverId: "DRV-7004",
      status: "On Trip",
      rating: 4.3,
      phone: "+965 56267490",
      trips: 482,
    },
    {
      id: 6,
      initial: "A",
      name: "Ahmed Al-Enezi",
      driverId: "DRV-7005",
      status: "Available",
      rating: 4.2,
      phone: "+965 58183395",
      trips: 283,
    },
  ];

  const getStatusColor = (status) => {
    if (status === "On Trip") return "on-trip";
    if (status === "Available") return "available";
    return "off-duty";
  };

  return (
    <div className="drivers-grid">
      {drivers.map((driver) => (
        <div key={driver.id} className="driver-card">
          <div className="driver-avatar">{driver.initial}</div>
          <h3 className="driver-name">{driver.name}</h3>
          <p className="driver-id">ID: {driver.driverId}</p>
          <span className={`driver-status ${getStatusColor(driver.status)}`}>
            {driver.status}
          </span>

          <div className="driver-details">
            <div className="rating-row">
              <span className="label">Rating</span>
              <span className="value">{driver.rating} ⭐</span>
            </div>
            <div className="detail-row">
              <span className="label">Phone</span>
              <span className="value">{driver.phone}</span>
            </div>
            <div className="detail-row">
              <span className="label">Trips</span>
              <span className="value">{driver.trips}</span>
            </div>
          </div>

          <button className="view-profile-btn">View Profile & Logs</button>
        </div>
      ))}
    </div>
  );
}

export default B2B_DriversTab;

import "./b2b_contractcard.css";

function B2B_ContractCard({
  name,
  organization,
  value,
  duration,
  requirements,
  status,
  payment,
}) {
  const getStatusColor = (status) => {
    if (status === "Active") return "active";
    if (status === "Completed") return "completed";
    return "cancelled";
  };

  return (
    <div className="contract-card">
      <div className="contract-top">
        <div>
          <h4 className="contract-title">{name}</h4>
          <p className="contract-org">{organization}</p>
        </div>
        <span className={`status ${getStatusColor(status)}`}>{status}</span>
      </div>

      <div className="contract-details">
        <div>
          <span className="detail-label">CONTRACT VALUE</span>
          <span className="detail-text">{value}</span>
        </div>
        <div>
          <span className="detail-label">DURATION</span>
          <span className="detail-text">📅 {duration}</span>
        </div>
        <div>
          <span className="detail-label">REQUIREMENTS</span>
          <span className="detail-text">{requirements}</span>
        </div>
      </div>

      <div className="contract-bottom">
        <div className="payment">
          <span className={`dot ${payment === "Paid" ? "paid" : ""}`}></span>
          <span>Payment: {payment}</span>
        </div>
        <button className="manage-link">Manage Contract</button>
      </div>
    </div>
  );
}

export default B2B_ContractCard;

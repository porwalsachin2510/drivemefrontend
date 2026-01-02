import "./earnings.css";

function Earnings() {
  const earningsData = {
    total: "2130.779 KWD",
    thisWeek: "70.257 KWD",
    thisWeekChange: "+12%",
    today: "20.164 KWD",
  };

  const transactions = [
    { date: "2025-11-04", trips: 5, amount: "+8.766 KWD", status: "Paid" },
    { date: "2025-10-09", trips: 2, amount: "+13.200 KWD", status: "Paid" },
    { date: "2025-09-16", trips: 2, amount: "+9.808 KWD", status: "Paid" },
    { date: "2025-09-02", trips: 1, amount: "+6.725 KWD", status: "Paid" },
    { date: "2025-08-24", trips: 1, amount: "+10.780 KWD", status: "Paid" },
    { date: "2025-07-15", trips: 5, amount: "+17.146 KWD", status: "Paid" },
    { date: "2025-05-21", trips: 2, amount: "+6.853 KWD", status: "Paid" },
    { date: "2025-05-01", trips: 5, amount: "+23.200 KWD", status: "Paid" },
    { date: "2025-03-13", trips: 2, amount: "+14.396 KWD", status: "Paid" },
    { date: "2024-08-23", trips: 4, amount: "+13.375 KWD", status: "Paid" },
    { date: "2024-05-25", trips: 3, amount: "+8.225 KWD", status: "Paid" },
    { date: "2024-05-10", trips: 4, amount: "+22.901 KWD", status: "Paid" },
    { date: "2024-04-30", trips: 3, amount: "+7.154 KWD", status: "Paid" },
    { date: "2024-01-16", trips: 1, amount: "+13.850 KWD", status: "Paid" },
    { date: "2024-01-11", trips: 2, amount: "+9.062 KWD", status: "Paid" },
  ];

  return (
    <div className="earnings">
      <div className="earnings-cards">
        <div className="earnings-card total">
          <div className="card-label">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1C4.13 1 1 4.13 1 8C1 11.87 4.13 15 8 15C11.87 15 15 11.87 15 8C15 4.13 11.87 1 8 1Z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M8 4V8"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M8 8H11"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            TOTAL EARNINGS
          </div>
          <div className="card-amount">{earningsData.total}</div>
          <div className="card-subtitle">Lifetime earnings</div>
        </div>

        <div className="earnings-card week">
          <div className="card-label">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M1 8L4 11L14 2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            THIS WEEK
          </div>
          <div className="card-amount">{earningsData.thisWeek}</div>
          <div className="card-change positive">
            {earningsData.thisWeekChange} from last week
          </div>
        </div>

        <div className="earnings-card today">
          <div className="card-label">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect
                x="2"
                y="3"
                width="12"
                height="11"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path d="M2 6H14" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            TODAY
          </div>
          <div className="card-amount">{earningsData.today}</div>
          <button className="request-payout">Request Payout</button>
        </div>
      </div>

      <div className="transaction-section">
        <div className="section-header">
          <h2 className="section-title">Transaction History</h2>
          <button className="export-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1V8"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M10 5L7 8L4 5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 10V12.5C1 13.33 1.67 14 2.5 14H11.5C12.33 14 13 13.33 13 12.5V10"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            Export CSV
          </button>
        </div>

        <div className="transactions-list">
          {transactions.map((tx, idx) => (
            <div key={idx} className="transaction-item">
              <div className="tx-date-info">
                <div className="tx-date">{tx.date}</div>
                <div className="tx-trips">{tx.trips} Trip(s) Completed</div>
              </div>
              <div className="tx-amount-status">
                <div className="tx-amount">{tx.amount}</div>
                <div className="tx-status">{tx.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Earnings;

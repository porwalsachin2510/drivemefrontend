"use client";
import "./wallet.css";

export default function Wallet() {
  const transactions = [
    {
      id: 1,
      type: "Ride Payment",
      date: "2025-11-03",
      time: "WTX-9001",
      amount: "-6.809",
      status: "Success",
      icon: "↗️",
    },
    {
      id: 2,
      type: "Wallet Top-up",
      date: "2025-10-13",
      time: "WTX-9009",
      amount: "+8.847",
      status: "Success",
      icon: "↙️",
    },
    {
      id: 3,
      type: "Ride Payment",
      date: "2025-09-17",
      time: "WTX-9007",
      amount: "-4.140",
      status: "Success",
      icon: "↗️",
    },
    {
      id: 4,
      type: "Ride Payment",
      date: "2025-09-16",
      time: "WTX-9002",
      amount: "-8.737",
      status: "Success",
      icon: "↗️",
    },
    {
      id: 5,
      type: "Wallet Top-up",
      date: "2025-09-09",
      time: "WTX-9005",
      amount: "-2.571",
      status: "Success",
      icon: "↗️",
    },
    {
      id: 6,
      type: "Ride Payment",
      date: "2025-08-25",
      time: "WTX-9003",
      amount: "-1.814",
      status: "Success",
      icon: "↗️",
    },
    {
      id: 7,
      type: "Ride Payment",
      date: "2025-04-25",
      time: "WTX-9004",
      amount: "+2.979",
      status: "Success",
      icon: "↙️",
    },
    {
      id: 8,
      type: "Ride Payment",
      date: "2025-04-22",
      time: "WTX-9000",
      amount: "-8.213",
      status: "Success",
      icon: "↗️",
    },
    {
      id: 9,
      type: "Ride Payment",
      date: "2024-08-28",
      time: "WTX-9008",
      amount: "-2.268",
      status: "Success",
      icon: "↗️",
    },
    {
      id: 10,
      type: "Ride Payment",
      date: "2024-08-10",
      time: "WTX-9006",
      amount: "-6.914",
      status: "Success",
      icon: "↗️",
    },
  ];

  return (
    <div className="wallet-section">
      <div className="wallet-container">
        <div className="balance-card">
          <p className="balance-label">Current Balance</p>
          <p className="balance-amount">
            14.500 <span>KWD</span>
          </p>
          <button className="copy-btn">📋</button>
        </div>

        <div className="payment-methods">
          <h3>Payment Methods</h3>
          <div className="payment-item">
            <div className="payment-icon">💳</div>
            <div className="payment-info">
              <p className="payment-name">Visa ending in 4242</p>
              <p className="payment-expire">Expires 12/25</p>
            </div>
            <button className="edit-btn">Edit</button>
          </div>
          <button className="add-card-btn">+ Add New Card</button>
        </div>
      </div>

      <div className="transaction-history">
        <h3>Transaction History</h3>
        <div className="transactions-list">
          {transactions.map((tx) => (
            <div key={tx.id} className="transaction-item">
              <div className="tx-icon">{tx.icon}</div>
              <div className="tx-info">
                <p className="tx-type">{tx.type}</p>
                <p className="tx-date">
                  {tx.date} • {tx.time}
                </p>
              </div>
              <div className="tx-amount">
                <p
                  className={`amount ${
                    tx.amount.startsWith("+") ? "positive" : "negative"
                  }`}
                >
                  {tx.amount} KWD
                </p>
                <p className="tx-status">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

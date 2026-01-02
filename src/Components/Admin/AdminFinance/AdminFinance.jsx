"use client"

import { useState } from "react"
import "./AdminFinance.css"

function AdminFinance() {
  const [activeTab, setActiveTab] = useState("payout")

  // Sample data for metrics
  const metrics = {
    totalRevenue: "12247.753",
    netEarnings: "594.573",
    pendingPayouts: "2217.307",
    activeProviders: 7,
  }

  // Sample payout requests data
  const payoutRequests = [
    {
      id: "TXN-B2C-1004",
      provider: "Royal Fleets",
      type: "B2C",
      totalAmount: "35.153 KWD",
      commDeducted: "-0.703 KWD",
      netPayable: "34.450 KWD",
    },
    {
      id: "TXN-B2C-1006",
      provider: "KGL Transport",
      type: "B2C",
      totalAmount: "26.523 KWD",
      commDeducted: "-0.530 KWD",
      netPayable: "25.993 KWD",
    },
    {
      id: "TXN-B2C-1017",
      provider: "KGL Transport",
      type: "B2C",
      totalAmount: "21.856 KWD",
      commDeducted: "-0.437 KWD",
      netPayable: "21.419 KWD",
    },
    {
      id: "TXN-B2C-1010",
      provider: "Raha Logistics",
      type: "B2C",
      totalAmount: "34.301 KWD",
      commDeducted: "-0.686 KWD",
      netPayable: "33.615 KWD",
    },
    {
      id: "TXN-B2B-5006",
      provider: "City Bus",
      type: "B2B",
      totalAmount: "1211.544 KWD",
      commDeducted: "-60.577 KWD",
      netPayable: "1150.967 KWD",
    },
    {
      id: "TXN-B2B-5008",
      provider: "Raha Logistics",
      type: "B2B",
      totalAmount: "978.591 KWD",
      commDeducted: "-48.930 KWD",
      netPayable: "929.661 KWD",
    },
    {
      id: "TXN-B2C-1014",
      provider: "Kuwait Express",
      type: "B2C",
      totalAmount: "21.635 KWD",
      commDeducted: "-0.433 KWD",
      netPayable: "21.202 KWD",
    },
  ]

  // Sample B2C earnings data
  const b2cEarnings = [
    {
      date: "2025-11-26",
      provider: "Gulf Transport",
      commuterInfo: "Yousef Al-Rashid",
      routeDetails: "Monthly Pass: Mangaf to Ma...",
      amount: "32.115 KWD",
      platform: "+0.642 KWD",
      status: "Paid",
    },
    {
      date: "2025-10-07",
      provider: "City Bus",
      commuterInfo: "Ahmed Al-Enezi",
      routeDetails: "Monthly Pass: Mahboula to S...",
      amount: "39.817 KWD",
      platform: "+0.796 KWD",
      status: "Paid",
    },
    {
      date: "2025-08-13",
      provider: "Royal Fleets",
      commuterInfo: "Hassan Al-Enezi",
      routeDetails: "Monthly Pass: Hawally to Ma...",
      amount: "24.081 KWD",
      platform: "+0.482 KWD",
      status: "Paid",
    },
    {
      date: "2025-07-03",
      provider: "Royal Fleets",
      commuterInfo: "Omar Singh",
      routeDetails: "Monthly Pass: Mahboula to M...",
      amount: "13.385 KWD",
      platform: "+0.268 KWD",
      status: "Paid",
    },
    {
      date: "2025-04-30",
      provider: "Kuwait Express",
      commuterInfo: "Zainab Al-Ali",
      routeDetails: "Monthly Pass: Farwaniya to S...",
      amount: "33.592 KWD",
      platform: "+0.672 KWD",
      status: "Paid",
    },
    {
      date: "2025-03-03",
      provider: "City Bus",
      commuterInfo: "Mohammed Al-Sabah",
      routeDetails: "Monthly Pass: Farwaniya to F...",
      amount: "38.189 KWD",
      platform: "+0.764 KWD",
      status: "Paid",
    },
    {
      date: "2025-02-23",
      provider: "Royal Fleets",
      commuterInfo: "Sarah Al-Enezi",
      routeDetails: "Monthly Pass: Mangaf to Jahra",
      amount: "39.936 KWD",
      platform: "+0.799 KWD",
      status: "Paid",
    },
    {
      date: "2025-01-24",
      provider: "Careem Bus",
      commuterInfo: "Fahad Al-Enezi",
      routeDetails: "Monthly Pass: Farwaniya to S...",
      amount: "28.616 KWD",
      platform: "+0.572 KWD",
      status: "Paid",
    },
    {
      date: "2024-12-29",
      provider: "Royal Fleets",
      commuterInfo: "Ahmed Singh",
      routeDetails: "Monthly Pass: Mahboula to K...",
      amount: "35.153 KWD",
      platform: "+0.703 KWD",
      status: "Pending",
    },
    {
      date: "2024-12-19",
      provider: "KGL Transport",
      commuterInfo: "Zainab Smith",
      routeDetails: "Monthly Pass: Khaitan to Sal...",
      amount: "26.523 KWD",
      platform: "+0.530 KWD",
      status: "Pending",
    },
    {
      date: "2024-11-06",
      provider: "KGL Transport",
      commuterInfo: "Hassan Al-Ali",
      routeDetails: "Monthly Pass: Kuwait City to ...",
      amount: "21.856 KWD",
      platform: "+0.437 KWD",
      status: "Pending",
    },
    {
      date: "2024-11-01",
      provider: "Raha Logistics",
      commuterInfo: "Omar Kumar",
      routeDetails: "Monthly Pass: Farwaniya to ...",
      amount: "23.325 KWD",
      platform: "+0.466 KWD",
      status: "Paid",
    },
    {
      date: "2024-10-03",
      provider: "Raha Logistics",
      commuterInfo: "Noura Al-Ali",
      routeDetails: "Monthly Pass: Fahaheel to Ja...",
      amount: "34.301 KWD",
      platform: "+0.686 KWD",
      status: "Pending",
    },
    {
      date: "2024-09-14",
      provider: "Raha Logistics",
      commuterInfo: "Omar Kumar",
      routeDetails: "Monthly Pass: Kuwait City to ...",
      amount: "16.030 KWD",
      platform: "+0.321 KWD",
      status: "Paid",
    },
    {
      date: "2024-06-08",
      provider: "Careem Bus",
      commuterInfo: "Zainab Smith",
      routeDetails: "Monthly Pass: Jahra to Fahah...",
      amount: "36.019 KWD",
      platform: "+0.720 KWD",
      status: "Paid",
    },
    {
      date: "2024-06-07",
      provider: "Kuwait Express",
      commuterInfo: "Layla Al-Enezi",
      routeDetails: "Monthly Pass: Jahra to Jahra",
      amount: "28.826 KWD",
      platform: "+0.577 KWD",
      status: "Paid",
    },
    {
      date: "2024-05-15",
      provider: "Raha Logistics",
      commuterInfo: "Noura Al-Rashid",
      routeDetails: "Monthly Pass: Salmiya to Ma...",
      amount: "37.462 KWD",
      platform: "+0.749 KWD",
      status: "Paid",
    },
    {
      date: "2023-11-25",
      provider: "City Bus",
      commuterInfo: "Layla Al-Sabah",
      routeDetails: "Monthly Pass: Kuwait City to ...",
      amount: "29.624 KWD",
      platform: "+0.592 KWD",
      status: "Paid",
    },
    {
      date: "2023-10-27",
      provider: "Careem Bus",
      commuterInfo: "Layla Al-Otaibi",
      routeDetails: "Monthly Pass: Salwa to Mang...",
      amount: "33.307 KWD",
      platform: "+0.666 KWD",
      status: "Paid",
    },
    {
      date: "2023-10-01",
      provider: "Kuwait Express",
      commuterInfo: "Fatima Al-Ali",
      routeDetails: "Monthly Pass: Jahra to Kuwai...",
      amount: "21.635 KWD",
      platform: "+0.433 KWD",
      status: "Pending",
    },
  ]

  // Sample B2B earnings data
  const b2bEarnings = [
    {
      date: "2025-10-17",
      provider: "Raha Logistics",
      corporateClient: "NBK",
      contractScope: "Contract Initiation (Month 1): Staff Transport",
      contractValue: "1345.623 KWD",
      platform: "+67.281 KWD",
      status: "Paid",
    },
    {
      date: "2025-09-17",
      provider: "KGL Transport",
      corporateClient: "Ooredoo",
      contractScope: "Contract Initiation (Month 1): Staff Transport",
      contractValue: "1496.565 KWD",
      platform: "+74.828 KWD",
      status: "Paid",
    },
    {
      date: "2025-08-09",
      provider: "Kuwait Express",
      corporateClient: "Boubyan Bank",
      contractScope: "Contract Initiation (Month 1): Staff Transport",
      contractValue: "527.071 KWD",
      platform: "+26.354 KWD",
      status: "Paid",
    },
    {
      date: "2025-04-17",
      provider: "Gulf Transport",
      corporateClient: "Agility",
      contractScope: "Contract Initiation (Month 1): Staff Transport",
      contractValue: "1614.164 KWD",
      platform: "+80.708 KWD",
      status: "Paid",
    },
    {
      date: "2025-03-14",
      provider: "Careem Bus",
      corporateClient: "KOC",
      contractScope: "Contract Initiation (Month 1): Staff Transport",
      contractValue: "1122.249 KWD",
      platform: "+56.112 KWD",
      status: "Paid",
    },
    {
      date: "2025-01-05",
      provider: "Careem Bus",
      corporateClient: "Equate",
      contractScope: "Contract Initiation (Month 1): Staff Transport",
      contractValue: "984.165 KWD",
      platform: "+49.208 KWD",
      status: "Paid",
    },
    {
      date: "2024-12-28",
      provider: "City Bus",
      corporateClient: "KNPC",
      contractScope: "Contract Initiation (Month 1): Staff Transport",
      contractValue: "888.355 KWD",
      platform: "+44.418 KWD",
      status: "Paid",
    },
    {
      date: "2024-08-24",
      provider: "City Bus",
      corporateClient: "Agility",
      contractScope: "Contract Initiation (Month 1): Staff Transport",
      contractValue: "1211.544 KWD",
      platform: "+60.577 KWD",
      status: "Pending",
    },
    {
      date: "2024-05-09",
      provider: "Careem Bus",
      corporateClient: "KOC",
      contractScope: "Contract Initiation (Month 1): Staff Transport",
      contractValue: "1485.634 KWD",
      platform: "+74.282 KWD",
      status: "Paid",
    },
    {
      date: "2023-11-07",
      provider: "Raha Logistics",
      corporateClient: "KGL",
      contractScope: "Contract Initiation (Month 1): Staff Transport",
      contractValue: "978.591 KWD",
      platform: "+48.930 KWD",
      status: "Pending",
    },
  ]

  // Sample provider performance data
  const providerPerformance = [
    {
      name: "Gulf Transport",
      transactions: 2,
      netEarnings: "1564.929 KWD",
      platformFees: "81.350 KWD",
      pendingPayout: "0.000 KWD",
    },
    {
      name: "Raha Logistics",
      transactions: 6,
      netEarnings: "2316.899 KWD",
      platformFees: "118.433 KWD",
      pendingPayout: "963.276 KWD",
    },
    {
      name: "City Bus",
      transactions: 5,
      netEarnings: "2100.382 KWD",
      platformFees: "107.147 KWD",
      pendingPayout: "1150.967 KWD",
    },
    {
      name: "KGL Transport",
      transactions: 3,
      netEarnings: "1469.149 KWD",
      platformFees: "75.795 KWD",
      pendingPayout: "47.412 KWD",
    },
    {
      name: "Royal Fleets",
      transactions: 4,
      netEarnings: "110.303 KWD",
      platformFees: "2.252 KWD",
      pendingPayout: "34.450 KWD",
    },
    {
      name: "Kuwait Express",
      transactions: 4,
      netEarnings: "583.088 KWD",
      platformFees: "28.036 KWD",
      pendingPayout: "21.202 KWD",
    },
    {
      name: "Careem Bus",
      transactions: 6,
      netEarnings: "3508.430 KWD",
      platformFees: "181.560 KWD",
      pendingPayout: "0.000 KWD",
    },
  ]

  return (
    <div className="my-admin-finance">
      {/* Metrics Cards */}
      <div className="my-finance-metrics">
        <div className="my-metric-card">
          <div className="my-metric-label">Total Revenue Collected</div>
          <div className="my-metric-value">{metrics.totalRevenue} KWD</div>
          <div className="my-metric-subtitle">Gross transaction volume</div>
        </div>
        <div className="my-metric-card my-metric-highlight">
          <div className="my-metric-label">Platform Net Earnings</div>
          <div className="my-metric-value">{metrics.netEarnings} KWD</div>
          <div className="my-metric-subtitle">
            Commissions (2% B2C / 5% B2B)
          </div>
        </div>
        <div className="my-metric-card my-metric-pending">
          <div className="my-metric-label">Pending Payouts</div>
          <div className="my-metric-value">{metrics.pendingPayouts} KWD</div>
          <div className="my-metric-subtitle">Needs approval</div>
        </div>
        <div className="my-metric-card">
          <div className="my-metric-label">Active Providers</div>
          <div className="my-metric-value">{metrics.activeProviders}</div>
          <div className="my-metric-subtitle">Generating revenue</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="finance-tabs-container">
        <div className="finance-tabs">
          <button
            className={`finance-tab ${activeTab === "payout" ? "active" : ""}`}
            onClick={() => setActiveTab("payout")}
          >
            Payout Management
          </button>
          <button
            className={`finance-tab ${activeTab === "b2c" ? "active" : ""}`}
            onClick={() => setActiveTab("b2c")}
          >
            B2C Earnings
          </button>
          <button
            className={`finance-tab ${activeTab === "b2b" ? "active" : ""}`}
            onClick={() => setActiveTab("b2b")}
          >
            B2B Earnings
          </button>
          <button
            className={`finance-tab ${
              activeTab === "provider" ? "active" : ""
            }`}
            onClick={() => setActiveTab("provider")}
          >
            Provider Performance
          </button>
        </div>
        <button className="export-button">
          <span className="export-icon">↓</span> Export Report
        </button>
      </div>

      {/* Tab Content */}
      <div className="finance-tab-content">
        {activeTab === "payout" && (
          <div className="payout-management">
            <div className="section-header">
              <div className="section-icon">💳</div>
              <div>
                <h3>Pending Payout Requests</h3>
                <p>
                  Approve provider earnings release after verifying service
                  delivery.
                </p>
              </div>
            </div>
            <div className="payout-table-container">
              <table className="payout-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Provider</th>
                    <th>Type</th>
                    <th>Total Amount</th>
                    <th>Comm. Deducted</th>
                    <th>Net Payable</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.id}</td>
                      <td>{request.provider}</td>
                      <td>
                        <span
                          className={`type-badge type-${request.type.toLowerCase()}`}
                        >
                          {request.type}
                        </span>
                      </td>
                      <td>{request.totalAmount}</td>
                      <td className="negative-amount">
                        {request.commDeducted}
                      </td>
                      <td className="positive-amount">{request.netPayable}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="approve-btn">Approve</button>
                          <button className="reject-btn">Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "b2c" && (
          <div className="b2c-earnings">
            <div className="section-header">
              <div className="section-icon">👥</div>
              <div>
                <h3>B2C Bookings & Commission</h3>
                <p>Standard 2% commission on monthly commuter passes.</p>
              </div>
              <span className="commission-badge">Rate: 2%</span>
            </div>
            <div className="earnings-table-container">
              <table className="earnings-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Provider</th>
                    <th>Commuter Info</th>
                    <th>Route Details</th>
                    <th>Amount</th>
                    <th>Platform (2%)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {b2cEarnings.map((earning, index) => (
                    <tr key={index}>
                      <td>{earning.date}</td>
                      <td>{earning.provider}</td>
                      <td>{earning.commuterInfo}</td>
                      <td>{earning.routeDetails}</td>
                      <td>{earning.amount}</td>
                      <td className="positive-amount">{earning.platform}</td>
                      <td>
                        <span
                          className={`status-badge status-${earning.status.toLowerCase()}`}
                        >
                          {earning.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "b2b" && (
          <div className="b2b-earnings">
            <div className="section-header">
              <div className="section-icon">🏢</div>
              <div>
                <h3>Corporate Contracts (B2B)</h3>
                <p>
                  5% commission applied to the FIRST month of contract only.
                </p>
              </div>
              <span className="commission-badge commission-b2b">
                Rate: 5% (Month 1)
              </span>
            </div>
            <div className="earnings-table-container">
              <table className="earnings-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Provider</th>
                    <th>Corporate Client</th>
                    <th>Contract Scope</th>
                    <th>Contract Value</th>
                    <th>Platform (5%)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {b2bEarnings.map((earning, index) => (
                    <tr key={index}>
                      <td>{earning.date}</td>
                      <td>{earning.provider}</td>
                      <td className="corporate-client">
                        {earning.corporateClient}
                      </td>
                      <td>{earning.contractScope}</td>
                      <td>{earning.contractValue}</td>
                      <td className="positive-amount">{earning.platform}</td>
                      <td>
                        <span
                          className={`status-badge status-${earning.status.toLowerCase()}`}
                        >
                          {earning.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "provider" && (
          <div className="provider-performance">
            <div className="provider-grid">
              {providerPerformance.map((provider, index) => (
                <div key={index} className="provider-card">
                  <div className="provider-card-header">
                    <h3>{provider.name}</h3>
                    <button className="time-icon">🕐</button>
                  </div>
                  <div className="provider-transactions">
                    {provider.transactions} Transactions processed
                  </div>
                  <div className="provider-stats">
                    <div className="stat-row">
                      <span className="stat-label">Net Earnings</span>
                      <span className="stat-value">{provider.netEarnings}</span>
                    </div>
                    <div className="stat-row stat-paid">
                      <span className="stat-label">Platform Fees Paid</span>
                      <span className="stat-value">
                        {provider.platformFees}
                      </span>
                    </div>
                    <div className="stat-row stat-pending">
                      <span className="stat-label">Pending Payout</span>
                      <span className="stat-value">
                        {provider.pendingPayout}
                      </span>
                    </div>
                  </div>
                  <button className="view-history-btn">
                    View Full History
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminFinance

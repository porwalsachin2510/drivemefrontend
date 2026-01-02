import B2B_MetricsCard from "../B2B_Common/B2B_MetricsCard/B2B_MetricsCard";
import B2B_ContractCard from "../B2B_Common/B2B_ContractCard/B2B_ContractCard";
import B2B_BarChart from "../B2B_Common/B2B_BarChart/B2B_BarChart";
import "./b2b_overview.css";
import B2B_LineChart from "../B2B_Common/B2B_LineChart/B2B_LineChart";

function B2B_Overview() {
  const metrics = [
    { label: "ACTIVE VEHICLES", value: "8/12", icon: "🚗" },
    { label: "ACTIVE CONTRACTS", value: "3", icon: "📄" },
    { label: "REVENUE (MO)", value: "4.2k KWD", icon: "$" },
    { label: "FLEET HEALTH", value: "92%", icon: "✓" },
  ];

  const profitData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    profit: [2000, 6000, 2000, 2500, 2000, 1800],
  };

  const contracts = [
    {
      id: 1,
      name: "Employee Transport - Mangaf",
      organization: "KOC",
      value: "3,246 KWD",
      duration: "4/23/2023 - 2/27/2024",
      requirements: "1 x Bus",
      status: "Active",
      payment: "Paid",
    },
    {
      id: 2,
      name: "Employee Transport - Kuwait City",
      organization: "Zain",
      value: "4,549 KWD",
      duration: "11/19/2023 - 2/26/2024",
      requirements: "1 x Bus",
      status: "Active",
      payment: "Paid",
    },
    {
      id: 3,
      name: "Employee Transport - Hawally",
      organization: "NBK",
      value: "5,288 KWD",
      duration: "4/22/2023 - 6/23/2024",
      requirements: "4 x Van",
      status: "Active",
      payment: "Paid",
    },
  ];

  const chartData = {
    labels: ["Feb", "Apr", "Jun"],
    revenue: [7000, 3500, 4000],
    expenses: [1500, 800, 2000],
  };

  return (
    <div className="b2b-overview">
      <div className="b2b-metrics-grid">
        {metrics.map((metric, index) => (
          <B2B_MetricsCard key={index} {...metric} />
        ))}
      </div>

      <div className="b2b-overview-sections">
        <div className="b2b-financial-section">
          <h2 className="b2b-section-title">Financial Performance</h2>
          <div className="b2b-financial-cards">
            <div className="b2b-financial-card">
              <div
                className="b2b-financial-icon"
                style={{ backgroundColor: "#e8f5e9" }}
              >
                💰
              </div>
              <div className="b2b-financial-content">
                <p className="b2b-financial-label">Total Revenue (YTD)</p>
                <p className="b2b-financial-value">24,295 KWD</p>
              </div>
            </div>
            <div className="b2b-financial-card">
              <div
                className="b2b-financial-icon"
                style={{ backgroundColor: "#e3f2fd" }}
              >
                📈
              </div>
              <div className="b2b-financial-content">
                <p className="b2b-financial-label">Net Profit (YTD)</p>
                <p className="b2b-financial-value">17,974 KWD</p>
                <p className="b2b-financial-change">+12% vs last year</p>
              </div>
            </div>
            <div className="b2b-financial-card">
              <div
                className="b2b-financial-icon"
                style={{ backgroundColor: "#f3e5f5" }}
              >
                ⏱
              </div>
              <div className="b2b-financial-content">
                <p className="b2b-financial-label">Profit Margin</p>
                <p className="b2b-financial-value">74.0%</p>
              </div>
            </div>
          </div>

          <div className="b2b-charts-container">
            <div className="b2b-chart-wrapper">
              <h3>Revenue vs Expenses</h3>
              <B2B_BarChart data={chartData} />
            </div>

            <div className="b2b-chart-wrapper">
              <h3>Profit Trend</h3>
              <B2B_LineChart data={profitData} />
            </div>
          </div>
        </div>

        <div className="b2b-contracts-section">
          <h2 className="b2b-section-title">B2B Contracts</h2>
          <div className="b2b-contracts-list">
            {contracts.map((contract) => (
              <B2B_ContractCard key={contract.id} {...contract} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default B2B_Overview;

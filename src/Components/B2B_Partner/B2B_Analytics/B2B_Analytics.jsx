import B2B_BarChart from "../B2B_Common/B2B_BarChart/B2B_BarChart";
import B2B_LineChart from "../B2B_Common/B2B_LineChart/B2B_LineChart";
import "./b2b_analytics.css";

function B2B_Analytics() {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    revenue: [3500, 7000, 3500, 3800, 3500, 4000],
    expenses: [1500, 1000, 800, 600, 800, 2000],
  };

  const profitData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    profit: [2000, 6000, 2000, 2500, 2000, 1800],
  };

  return (
    <div className="analytics">
      <div className="financial-performance">
        <h2 className="section-title">Financial Performance</h2>
        <div className="metric-cards">
          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: "#e8f5e9" }}>
              $
            </div>
            <div className="metric-content">
              <p className="metric-label">Total Revenue (YTD)</p>
              <p className="metric-value">24,295 KWD</p>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: "#e3f2fd" }}>
              📈
            </div>
            <div className="metric-content">
              <p className="metric-label">Net Profit (YTD)</p>
              <p className="metric-value">17,974 KWD</p>
              <p className="metric-change">+12% vs last year</p>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: "#f3e5f5" }}>
              ⏱
            </div>
            <div className="metric-content">
              <p className="metric-label">Profit Margin</p>
              <p className="metric-value">74.0%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="b2b-charts-section">
        <div className="b2b-chart-container">
          <h3>Revenue vs Expenses</h3>
          <B2B_BarChart data={chartData} />
        </div>
        <div className="b2b-chart-container">
          <h3>Profit Trend</h3>
          <B2B_LineChart data={profitData} />
        </div>
      </div>
    </div>
  );
}

export default B2B_Analytics;

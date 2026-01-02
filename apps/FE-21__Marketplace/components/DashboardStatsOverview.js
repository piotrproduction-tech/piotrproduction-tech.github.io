// FE-21__Marketplace - components/DashboardStatsOverview.js

export default function DashboardStatsOverview({ stats }) {
  if (!stats) return null;

  return (
    <div className="dashboard-stats-overview">
      <h2>Marketplace Overview</h2>
      <div className="stats-grid">
        <div className="stat-box">
          <strong>Total Sales</strong>
          <div>{stats.totalSales}</div>
        </div>
        <div className="stat-box">
          <strong>Total Revenue</strong>
          <div>{stats.totalRevenue}</div>
        </div>
        <div className="stat-box">
          <strong>Reviews</strong>
          <div>{stats.totalReviews}</div>
        </div>
        <div className="stat-box">
          <strong>Reputation</strong>
          <div>{stats.reputation}</div>
        </div>
      </div>
    </div>
  );
}

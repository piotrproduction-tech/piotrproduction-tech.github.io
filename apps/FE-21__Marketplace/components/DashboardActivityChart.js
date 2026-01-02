// FE-21__Marketplace - components/DashboardActivityChart.js

export default function DashboardActivityChart({ activity }) {
  if (!activity) return null;

  return (
    <div className="dashboard-activity-chart">
      <h3>Activity Chart</h3>
      <div className="chart-placeholder">
        {/* Placeholder for chart library */}
        {activity.map((point, i) => (
          <div key={i} className="chart-point">
            {point.value}
          </div>
        ))}
      </div>
    </div>
  );
}

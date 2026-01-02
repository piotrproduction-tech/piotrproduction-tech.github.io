// FE-21__Marketplace - components/DashboardCreatorProgressHistory.js

export default function DashboardCreatorProgressHistory({ progress }) {
  if (!progress) return null;

  return (
    <div className="dashboard-creator-progress-history">
      <h3>Creator Progress</h3>
      <ul>
        {progress.map((p, i) => (
          <li key={i}>
            <strong>{p.level}</strong> — {p.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

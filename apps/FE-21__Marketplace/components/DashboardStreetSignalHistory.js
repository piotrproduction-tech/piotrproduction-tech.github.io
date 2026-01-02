// FE-21__Marketplace - components/DashboardStreetSignalHistory.js

export default function DashboardStreetSignalHistory({ signals }) {
  if (!signals) return null;

  return (
    <div className="dashboard-street-signal-history">
      <h3>Street Signals</h3>
      <ul>
        {signals.map((s, i) => (
          <li key={i}>
            <strong>{s.type}</strong> — {s.description} ({s.date})
          </li>
        ))}
      </ul>
    </div>
  );
}

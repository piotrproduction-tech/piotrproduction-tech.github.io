// FE-21__Marketplace - components/CreatorStatsPanel.js

export default function CreatorStatsPanel({ stats }) {
  if (!stats) return null;

  return (
    <div className="creator-stats-panel">
      <h3>Creator Stats</h3>
      <div className="stats-grid">
        <div className="stat-box">
          <strong>Creations</strong>
          <div>{stats.creations}</div>
        </div>
        <div className="stat-box">
          <strong>Sales</strong>
          <div>{stats.sales}</div>
        </div>
        <div className="stat-box">
          <strong>Reputation</strong>
          <div>{stats.reputation}</div>
        </div>
        <div className="stat-box">
          <strong>Festival Entries</strong>
          <div>{stats.festivalEntries}</div>
        </div>
      </div>
    </div>
  );
}

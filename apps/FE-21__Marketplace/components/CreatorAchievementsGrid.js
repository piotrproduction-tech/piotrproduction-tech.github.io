// FE-21__Marketplace - components/CreatorAchievementsGrid.js

export default function CreatorAchievementsGrid({ achievements }) {
  if (!achievements) return null;

  return (
    <div className="creator-achievements-grid">
      <h3>Achievements</h3>
      <div className="achievements-grid">
        {achievements.map((a, i) => (
          <div key={i} className="achievement-card">
            <div className="achievement-icon">{a.icon}</div>
            <div className="achievement-title">{a.title}</div>
            <div className="achievement-desc">{a.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

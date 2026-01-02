// FE-21__Marketplace - components/CreatorAchievements.js

export default function CreatorAchievements({ achievements }) {
  if (!achievements) return null;

  return (
    <div className="creator-achievements">
      <h3>Achievements</h3>
      <ul>
        {achievements.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </div>
  );
}

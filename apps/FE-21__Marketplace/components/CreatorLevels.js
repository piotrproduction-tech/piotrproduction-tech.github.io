// FE-21__Marketplace - components/CreatorLevels.js

export default function CreatorLevels({ progress }) {
  if (!progress) return null;

  return (
    <div className="creator-levels">
      <h3>Creator Level</h3>
      <div>Current: {progress.level}</div>
      {progress.badge && <div>Badge: {progress.badge}</div>}
      {progress.nextLevel && <div>Next: {progress.nextLevel}</div>}
    </div>
  );
}

// FE-21__Marketplace - components/CreatorProgress.js

export default function CreatorProgress({ progress }) {
  if (!progress) return null;

  return (
    <div className="creator-progress">
      <h3>Creator Level: {progress.level}</h3>
      {progress.badge && <div className="creator-badge">{progress.badge}</div>}
      {progress.nextLevel && (
        <div className="next-level">
          Next: {progress.nextLevel}
        </div>
      )}
    </div>
  );
}

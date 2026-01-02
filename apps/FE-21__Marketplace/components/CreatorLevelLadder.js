// FE-21__Marketplace - components/CreatorLevelLadder.js

export default function CreatorLevelLadder({ ladder }) {
  if (!ladder) return null;

  return (
    <div className="creator-level-ladder">
      <h3>Level Ladder</h3>
      <ul>
        {ladder.map((step, i) => (
          <li key={i} className={step.completed ? "completed" : ""}>
            <strong>{step.level}</strong> — {step.requirement}
          </li>
        ))}
      </ul>
    </div>
  );
}

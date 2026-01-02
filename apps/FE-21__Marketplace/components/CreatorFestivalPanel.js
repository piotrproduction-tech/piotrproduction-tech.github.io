// FE-21__Marketplace - components/CreatorFestivalPanel.js

export default function CreatorFestivalPanel({ festival }) {
  if (!festival) return null;

  return (
    <div className="creator-festival-panel">
      <h3>Festival Hub</h3>
      <ul>
        {festival.map((f, i) => (
          <li key={i}>
            <strong>{f.project}</strong> — {f.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

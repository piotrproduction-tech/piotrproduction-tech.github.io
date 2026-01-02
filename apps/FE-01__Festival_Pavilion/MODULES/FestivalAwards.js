export default function FestivalAwards({ awards }) {
  return (
    <div>
      <h3>Nagrody</h3>
      <ul>
        {(awards || []).map((a, i) => (
          <li key={i}>{a.categoryId} → {a.submissionId}</li>
        ))}
      </ul>
    </div>
  );
}
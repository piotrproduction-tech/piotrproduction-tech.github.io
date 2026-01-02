export default function CreatorFestivalRelations({ relations }) {
  return (
    <div>
      <h3>Relacje twórca ↔ festiwal</h3>
      <ul>
        {(relations || []).map((r, i) => (
          <li key={i}>{r.creatorId} → {r.submissionId}</li>
        ))}
      </ul>
    </div>
  );
}
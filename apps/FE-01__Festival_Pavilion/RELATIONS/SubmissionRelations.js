export default function SubmissionRelations({ relations }) {
  return (
    <div>
      <h3>Relacje zgłoszenie ↔ jury / nagrody</h3>
      <ul>
        {(relations || []).map((r, i) => (
          <li key={i}>{r.submissionId} → {r.targetId} ({r.type})</li>
        ))}
      </ul>
    </div>
  );
}
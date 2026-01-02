export default function JuryReviewList({ reviews }) {
  return (
    <div>
      <h3>Oceny jury</h3>
      <ul>
        {(reviews || []).map((r, i) => (
          <li key={i}>
            {r.submissionId} — {r.score} / {r.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}
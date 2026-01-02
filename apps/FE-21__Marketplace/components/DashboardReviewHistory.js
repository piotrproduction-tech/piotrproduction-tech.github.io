// FE-21__Marketplace - components/DashboardReviewHistory.js

export default function DashboardReviewHistory({ reviews }) {
  if (!reviews) return null;

  return (
    <div className="dashboard-review-history">
      <h3>Review History</h3>
      <ul>
        {reviews.map((r, i) => (
          <li key={i}>
            <strong>{r.reviewer}</strong>: {r.rating}/5 — "{r.comment}"
          </li>
        ))}
      </ul>
    </div>
  );
}

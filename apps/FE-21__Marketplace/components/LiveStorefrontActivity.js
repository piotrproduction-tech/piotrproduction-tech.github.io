// FE-21__Marketplace - components/LiveStorefrontActivity.js

export default function LiveStorefrontActivity({ activity }) {
  if (!activity) return null;

  return (
    <div className="live-storefront-activity">
      <h4>Storefront Activity</h4>
      {activity.map((a, i) => (
        <div key={i} className="activity-item">
          <strong>{a.action}</strong>
          <div>{a.details}</div>
        </div>
      ))}
    </div>
  );
}

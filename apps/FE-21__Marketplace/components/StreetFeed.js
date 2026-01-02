// FE-21__Marketplace - components/StreetFeed.js

export default function StreetFeed({ events }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="street-feed">
      <h2>Marketplace Street</h2>
      {events.map((e, i) => (
        <div key={i} className="street-event">
          <strong>{e.type}</strong>
          <div>{JSON.stringify(e.payload)}</div>
        </div>
      ))}
    </div>
  );
}

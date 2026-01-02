// FE-21__Marketplace - components/CreatorTimeline.js

export default function CreatorTimeline({ timeline }) {
  if (!timeline) return null;

  return (
    <div className="creator-timeline">
      <h3>Creator Timeline</h3>
      <ul>
        {timeline.map((event, i) => (
          <li key={i}>
            <strong>{event.title}</strong> — {event.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

// FE-21__Marketplace - components/CreatorTimelineAdvanced.js

export default function CreatorTimelineAdvanced({ timeline }) {
  if (!timeline) return null;

  return (
    <div className="creator-timeline-advanced">
      <h3>Creator Timeline</h3>
      <div className="timeline">
        {timeline.map((event, i) => (
          <div key={i} className="timeline-event">
            <div className="timeline-icon">{event.icon}</div>
            <div className="timeline-content">
              <strong>{event.title}</strong>
              <div>{event.description}</div>
              <div className="timeline-date">{event.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

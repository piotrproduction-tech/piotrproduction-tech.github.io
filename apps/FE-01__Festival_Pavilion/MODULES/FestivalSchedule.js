export default function FestivalSchedule({ schedule }) {
  return (
    <div>
      <h3>Harmonogram</h3>
      <ul>
        {(schedule || []).map((s, i) => (
          <li key={i}>{s.eventId} — {s.slot}</li>
        ))}
      </ul>
    </div>
  );
}
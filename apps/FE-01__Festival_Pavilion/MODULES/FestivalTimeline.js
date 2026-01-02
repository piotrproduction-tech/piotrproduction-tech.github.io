export default function FestivalTimeline({ events }) {
  return (
    <div>
      <h3>Oś czasu festiwalu</h3>
      <ul>
        {(events || []).map(e => (
          <li key={e.id}>{e.name} — {new Date(e.startsAt).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}
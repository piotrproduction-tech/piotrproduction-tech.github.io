export default function FestivalStats({ stats }) {
  return (
    <div>
      <h3>Festival Stats</h3>
      <div>Zgłoszenia: {stats?.submissions ?? 0}</div>
      <div>Jurorzy: {stats?.jury ?? 0}</div>
      <div>Kategorie nagród: {stats?.awardCategories ?? 0}</div>
    </div>
  );
}
export default function JuryVoteCard({ submission }) {
  return (
    <div>
      <h4>Ocena: {submission?.title || submission?.id}</h4>
      {/* TODO: formularz głosowania */}
    </div>
  );
}
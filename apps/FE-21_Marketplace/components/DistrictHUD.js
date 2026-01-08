export default function DistrictHUD({ live }) {
  return (
    <div className="district-hud">
      <span>PULSE: {live.pulse?.value}</span>
      <span>MOOD: {live.pulse?.mood}</span>
      <span>REPUTATION: {live.reputation?.score}</span>
    </div>
  );
}

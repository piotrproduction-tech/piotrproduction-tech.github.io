export function useDistrictHUD(live) {
  return {
    pulse: live.pulse?.value,
    mood: live.pulse?.mood,
    reputation: live.reputation?.score
  };
}

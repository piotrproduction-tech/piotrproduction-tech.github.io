export function useDistrictLive() {
  return {
    pulse: useDistrictPulseMoodLive(),
    simulation: useDistrictSimulationLive(),
    reputation: useDistrictReputationLive(),
    governance: useDistrictGovernanceLive(),
    security: useDistrictSecurityLive(),
    identity: useDistrictIdentityLive(),
    economy: useDistrictEconomyLive(),
    narrative: useDistrictNarrativeLive()
  };
}

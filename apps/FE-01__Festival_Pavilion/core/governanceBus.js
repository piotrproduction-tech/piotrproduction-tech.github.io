


// FE_FESTIVAL_GOVERNANCE_BUS
// Frontend wrapper for CityGovernanceEngine

let governanceBus = null;

export function registerCityGovernanceBus(bus) {
  governanceBus = bus;
}

export function onGovernanceEvent(handler) {
  if (!governanceBus) return;
  governanceBus.on("CITY_GOVERNANCE_UPDATE", handler);
}

export function offGovernanceEvent(handler) {
  if (!governanceBus) return;
  governanceBus.off("CITY_GOVERNANCE_UPDATE", handler);
}

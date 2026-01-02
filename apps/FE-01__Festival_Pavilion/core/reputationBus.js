


// FE_FESTIVAL_REPUTATION_BUS
// Frontend wrapper for CityReputationEngine

let reputationBus = null;

export function registerCityReputationBus(bus) {
  reputationBus = bus;
}

export function onReputationEvent(handler) {
  if (!reputationBus) return;
  reputationBus.on("CITY_REPUTATION_UPDATE", handler);
}

export function offReputationEvent(handler) {
  if (!reputationBus) return;
  reputationBus.off("CITY_REPUTATION_UPDATE", handler);
}

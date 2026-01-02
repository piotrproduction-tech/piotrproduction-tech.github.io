


// FE_FESTIVAL_SIMULATION_BUS
// Frontend wrapper for CitySimulationEngine & CityEmergenceEngine

let simulationBus = null;
let emergenceBus = null;

export function registerCitySimulationBus(bus) {
  simulationBus = bus;
}

export function registerCityEmergenceBus(bus) {
  emergenceBus = bus;
}

export function onSimulationEvent(handler) {
  if (!simulationBus) return;
  simulationBus.on("CITY_SIMULATION_WAVE", handler);
}

export function onEmergenceEvent(handler) {
  if (!emergenceBus) return;
  emergenceBus.on("CITY_EMERGENCE_PATTERN", handler);
}

export function offSimulationEvent(handler) {
  if (!simulationBus) return;
  simulationBus.off("CITY_SIMULATION_WAVE", handler);
}

export function offEmergenceEvent(handler) {
  if (!emergenceBus) return;
  emergenceBus.off("CITY_EMERGENCE_PATTERN", handler);
}

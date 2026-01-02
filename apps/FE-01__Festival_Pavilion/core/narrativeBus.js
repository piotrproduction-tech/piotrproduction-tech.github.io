


// FE_FESTIVAL_NARRATIVE_BUS
// Frontend wrapper for CityNarrativeEngine event bus

let narrativeBus = null;

export function registerCityNarrativeBus(bus) {
  narrativeBus = bus;
}

export function onNarrativeEvent(handler) {
  if (!narrativeBus) return;
  narrativeBus.on("CITY_NARRATIVE_EVENT", handler);
}

export function offNarrativeEvent(handler) {
  if (!narrativeBus) return;
  narrativeBus.off("CITY_NARRATIVE_EVENT", handler);
}

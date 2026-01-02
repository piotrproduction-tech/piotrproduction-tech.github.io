


// FE_FESTIVAL_PULSE_MOOD_BUS
// Frontend wrapper for CityPulseEngine & CityMoodEngine

let pulseBus = null;
let moodBus = null;

export function registerCityPulseBus(bus) {
  pulseBus = bus;
}

export function registerCityMoodBus(bus) {
  moodBus = bus;
}

export function onPulseEvent(handler) {
  if (!pulseBus) return;
  pulseBus.on("CITY_PULSE_UPDATE", handler);
}

export function onMoodEvent(handler) {
  if (!moodBus) return;
  moodBus.on("CITY_MOOD_UPDATE", handler);
}

export function offPulseEvent(handler) {
  if (!pulseBus) return;
  pulseBus.off("CITY_PULSE_UPDATE", handler);
}

export function offMoodEvent(handler) {
  if (!moodBus) return;
  moodBus.off("CITY_MOOD_UPDATE", handler);
}

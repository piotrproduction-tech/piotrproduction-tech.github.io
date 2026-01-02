


// FE_FESTIVAL_EVENTBUS_CORE
// Frontend wrapper for global CityEventBus

let cityEventBus = null;

export function registerCityEventBus(bus) {
  cityEventBus = bus;
}

export function getCityEventBus() {
  return cityEventBus;
}

export function onCityEvent(type, handler) {
  if (!cityEventBus) return;
  cityEventBus.on(type, handler);
}

export function offCityEvent(type, handler) {
  if (!cityEventBus) return;
  cityEventBus.off(type, handler);
}

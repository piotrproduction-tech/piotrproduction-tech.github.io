


// FE_FESTIVAL_IDENTITY_BUS
// Frontend wrapper for CityIdentityEngine

let identityBus = null;

export function registerCityIdentityBus(bus) {
  identityBus = bus;
}

export function onIdentityEvent(handler) {
  if (!identityBus) return;
  identityBus.on("CITY_IDENTITY_UPDATE", handler);
}

export function offIdentityEvent(handler) {
  if (!identityBus) return;
  identityBus.off("CITY_IDENTITY_UPDATE", handler);
}

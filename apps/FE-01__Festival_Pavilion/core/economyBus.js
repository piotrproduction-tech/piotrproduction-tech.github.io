


// FE_FESTIVAL_ECONOMY_BUS
// Frontend wrapper for CityEconomyEngine

let economyBus = null;

export function registerCityEconomyBus(bus) {
  economyBus = bus;
}

export function onEconomyEvent(handler) {
  if (!economyBus) return;
  economyBus.on("CITY_ECONOMY_UPDATE", handler);
}

export function offEconomyEvent(handler) {
  if (!economyBus) return;
  economyBus.off("CITY_ECONOMY_UPDATE", handler);
}

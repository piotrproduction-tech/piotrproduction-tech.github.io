


// FE_FESTIVAL_SECURITY_BUS
// Frontend wrapper for CitySecurityEngine

let securityBus = null;

export function registerCitySecurityBus(bus) {
  securityBus = bus;
}

export function onSecurityEvent(handler) {
  if (!securityBus) return;
  securityBus.on("CITY_SECURITY_UPDATE", handler);
}

export function offSecurityEvent(handler) {
  if (!securityBus) return;
  securityBus.off("CITY_SECURITY_UPDATE", handler);
}

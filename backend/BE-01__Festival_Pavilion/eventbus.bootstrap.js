


// FESTIVAL_EVENTBUS_BOOTSTRAP
// Bootstrap file to attach Festival Pavilion to the global CityEventBus

import { registerFestivalWithCityEventBus } from "./core/index.js";

export function bootstrapFestivalEventBus(cityEventBus) {
  registerFestivalWithCityEventBus(cityEventBus);
  console.log("[FESTIVAL] Festival Pavilion connected to CityEventBus");
}

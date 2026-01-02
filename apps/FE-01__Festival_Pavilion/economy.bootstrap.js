


// FE_FESTIVAL_ECONOMY_BOOTSTRAP
// Attach Festival Pavilion to CityEconomyEngine on FE side

import { registerCityEconomyBus } from "./core/economyBus";

export function bootstrapFestivalEconomy(cityEconomyBus) {
  registerCityEconomyBus(cityEconomyBus);
  console.log("[FESTIVAL] Economy connected to CityEconomyEngine");
}

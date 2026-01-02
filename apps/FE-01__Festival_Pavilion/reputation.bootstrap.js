


// FE_FESTIVAL_REPUTATION_BOOTSTRAP
// Attach Festival Pavilion to CityReputationEngine on FE side

import { registerCityReputationBus } from "./core/reputationBus";

export function bootstrapFestivalReputation(cityReputationBus) {
  registerCityReputationBus(cityReputationBus);
  console.log("[FESTIVAL] Reputation connected to CityReputationEngine");
}

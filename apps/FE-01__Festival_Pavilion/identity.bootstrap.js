


// FE_FESTIVAL_IDENTITY_BOOTSTRAP
// Attach Festival Pavilion to CityIdentityEngine on FE side

import { registerCityIdentityBus } from "./core/identityBus";

export function bootstrapFestivalIdentity(cityIdentityBus) {
  registerCityIdentityBus(cityIdentityBus);
  console.log("[FESTIVAL] Identity connected to CityIdentityEngine");
}

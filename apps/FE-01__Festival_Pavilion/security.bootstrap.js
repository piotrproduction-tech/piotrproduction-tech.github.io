


// FE_FESTIVAL_SECURITY_BOOTSTRAP
// Attach Festival Pavilion to CitySecurityEngine on FE side

import { registerCitySecurityBus } from "./core/securityBus";

export function bootstrapFestivalSecurity(citySecurityBus) {
  registerCitySecurityBus(citySecurityBus);
  console.log("[FESTIVAL] Security connected to CitySecurityEngine");
}




// FE_FESTIVAL_GOVERNANCE_BOOTSTRAP
// Attach Festival Pavilion to CityGovernanceEngine on FE side

import { registerCityGovernanceBus } from "./core/governanceBus";

export function bootstrapFestivalGovernance(cityGovernanceBus) {
  registerCityGovernanceBus(cityGovernanceBus);
  console.log("[FESTIVAL] Governance connected to CityGovernanceEngine");
}

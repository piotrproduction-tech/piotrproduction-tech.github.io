


// FE_FESTIVAL_NARRATIVE_BOOTSTRAP
// Attach Festival Pavilion to CityNarrativeEngine on FE side

import { registerCityNarrativeBus } from "./core/narrativeBus";

export function bootstrapFestivalNarrative(cityNarrativeBus) {
  registerCityNarrativeBus(cityNarrativeBus);
  console.log("[FESTIVAL] Narrative feed connected to CityNarrativeEngine");
}

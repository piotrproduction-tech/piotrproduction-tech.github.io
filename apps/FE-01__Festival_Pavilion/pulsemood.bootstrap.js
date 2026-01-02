


// FE_FESTIVAL_PULSE_MOOD_BOOTSTRAP
// Attach Festival Pavilion to CityPulseEngine & CityMoodEngine on FE side

import { registerCityPulseBus, registerCityMoodBus } from "./core/pulseMoodBus";

export function bootstrapFestivalPulseMood(cityPulseBus, cityMoodBus) {
  registerCityPulseBus(cityPulseBus);
  registerCityMoodBus(cityMoodBus);
  console.log("[FESTIVAL] Pulse & Mood connected to CityPulseEngine + CityMoodEngine");
}

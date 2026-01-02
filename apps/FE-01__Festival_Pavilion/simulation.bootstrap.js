


// FE_FESTIVAL_SIMULATION_BOOTSTRAP
// Attach Festival Pavilion to CitySimulationEngine & CityEmergenceEngine on FE side

import { registerCitySimulationBus, registerCityEmergenceBus } from "./core/simulationBus";

export function bootstrapFestivalSimulation(citySimulationBus, cityEmergenceBus) {
  registerCitySimulationBus(citySimulationBus);
  registerCityEmergenceBus(cityEmergenceBus);
  console.log("[FESTIVAL] Simulation & Emergence connected to CitySimulationEngine + CityEmergenceEngine");
}

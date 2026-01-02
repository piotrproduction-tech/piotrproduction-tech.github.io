


// FE_FESTIVAL_SIMULATION_LIVE_SYNC
// Live sync for Festival Pavilion — activity waves + emergent patterns

import { onSimulationEvent, onEmergenceEvent } from "../core/simulationBus";

export function attachFestivalSimulationLiveSync(onWave, onPattern) {
  // Fale aktywności (np. "peak", "low", "surge")
  onSimulationEvent((event) => {
    if (event?.payload?.module === "CITY") {
      onWave({
        intensity: event.payload.intensity,
        trend: event.payload.trend,
        label: event.payload.label
      });
    }
  });

  // Wzorce emergentne (np. "cluster", "burst", "silence")
  onEmergenceEvent((event) => {
    if (event?.payload?.module === "CITY") {
      onPattern({
        type: event.payload.type,
        strength: event.payload.strength,
        description: event.payload.description
      });
    }
  });
}

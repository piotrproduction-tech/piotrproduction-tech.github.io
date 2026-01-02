


// FE_FESTIVAL_SIMULATION_HOOK
// React hook for live simulation/emergence updates

import { useEffect } from "react";
import { attachFestivalSimulationLiveSync } from "../live/festivalSimulationLiveSync";

export function useFestivalSimulationLive(onWave, onPattern) {
  useEffect(() => {
    attachFestivalSimulationLiveSync(onWave, onPattern);
  }, []);
}

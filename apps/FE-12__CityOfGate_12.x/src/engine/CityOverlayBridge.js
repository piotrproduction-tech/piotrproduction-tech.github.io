// apps/FE-12__CityOfGate_12.x/src/engine/CityOverlayBridge.js

import { useEffect, useState } from "react";
import { createCityOverlayState } from "./CityOverlayState.js";
import { createCityOverlayEngine } from "./CityOverlayEngine.js";

export function useCityOverlay(heartbeat, activeDistrict) {
  const [state] = useState(() => createCityOverlayState());
  const [engine] = useState(() => createCityOverlayEngine(state));

  useEffect(() => {
    engine.onHeartbeat(heartbeat);
  }, [heartbeat]);

  useEffect(() => {
    if (activeDistrict) {
      engine.onDistrictChange(activeDistrict);
    }
  }, [activeDistrict]);

  return { state, engine };
}

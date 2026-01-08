// apps/FE-12__CityOfGate_12.x/src/actionbar/CityActionBarBridge.js

import { useEffect, useState } from "react";
import { createCityActionBarState } from "./CityActionBarState.js";
import { createCityActionBarEngine } from "./CityActionBarEngine.js";

export function useCityActionBar(heartbeat, activeDistrict) {
  const [state] = useState(() => createCityActionBarState());
  const [engine] = useState(() => createCityActionBarEngine(state));

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

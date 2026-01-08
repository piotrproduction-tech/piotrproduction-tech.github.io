// apps/FE-12__CityOfGate_12.x/src/district-hud/DistrictHUDBridge.js

import { useEffect, useState } from "react";
import { createDistrictHUDState } from "./DistrictHUDState.js";
import { createDistrictHUDEngine } from "./DistrictHUDEngine.js";

export function useDistrictHUD(heartbeat, district) {
  const [state] = useState(() => createDistrictHUDState());
  const [engine] = useState(() => createDistrictHUDEngine(state));

  useEffect(() => {
    if (district) {
      engine.onInit(district);
    }
  }, [district]);

  useEffect(() => {
    engine.onHeartbeat(heartbeat);
  }, [heartbeat]);

  return { state, engine };
}

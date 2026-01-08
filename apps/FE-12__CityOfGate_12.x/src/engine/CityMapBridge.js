// apps/FE-12__CityOfGate_12.x/src/engine/CityMapBridge.js

import { useEffect, useState } from "react";
import { createCityMapState } from "./CityMapState.js";
import { createCityMapEngine } from "./CityMapEngine.js";

export function useCityMap(heartbeat, activeDistrict) {
  const [mapState] = useState(() => createCityMapState());
  const [mapEngine] = useState(() => createCityMapEngine(mapState));

  useEffect(() => {
    mapEngine.onHeartbeat(heartbeat);
  }, [heartbeat]);

  useEffect(() => {
    if (activeDistrict) {
      mapEngine.onDistrictChange(activeDistrict);
    }
  }, [activeDistrict]);

  return mapState;
}

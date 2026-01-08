// apps/FE-12__CityOfGate_12.x/src/district-panels/DistrictPanelBridge.js

import { useEffect, useState } from "react";
import { loadPanelsForDistrict } from "./DistrictPanelLoader.js";

export function useDistrictPanels(activeDistrictId) {
  const [panels, setPanels] = useState([]);

  useEffect(() => {
    if (!activeDistrictId) {
      setPanels([]);
      return;
    }

    loadPanelsForDistrict(activeDistrictId).then(setPanels);
  }, [activeDistrictId]);

  return panels;
}

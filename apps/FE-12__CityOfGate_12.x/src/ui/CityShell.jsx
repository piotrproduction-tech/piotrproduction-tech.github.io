// apps/FE-12__CityOfGate_12.x/src/ui/CityShell.jsx
import React, { useEffect, useMemo } from "react";
import CityMenu from "./CityMenu.jsx";
import CityRouter from "./CityRouter.jsx";
import CityStatusBar from "./CityStatusBar.jsx";
import CityMapPanel from "./CityMapPanel.jsx";
import { useHeartbeat } from "./CityHeartbeat.js";
import { useCityEngine } from "./CityEngineBridge.js";
import { createCityLifecycle } from "../engine/CityLifecycle.js";
import { useCityMap } from "../engine/CityMapBridge.js";
import { useDistrictPanels } from "../district-panels/DistrictPanelBridge.js";
import DistrictPanelHost from "../district-panels/DistrictPanelHost.jsx";
import { useCityOverlay } from "../engine/CityOverlayBridge.js";
import CityOverlayHost from "../engine/CityOverlayHost.jsx";
import { useDistrictHUD } from "../district-hud/DistrictHUDBridge.js";
import DistrictHUDHost from "../district-hud/DistrictHUDHost.jsx";
import { useCityActionBar } from "../actionbar/CityActionBarBridge.js";
import CityActionBarHost from "../actionbar/CityActionBarHost.jsx";

export default function CityShell() {
  const heartbeat = useHeartbeat();
  const engine = useCityEngine();
  const lifecycle = useMemo(() => createCityLifecycle(), []);

  const mapState = useCityMap(heartbeat, engine?.currentDistrict?.id);
  const panels = useDistrictPanels(engine?.currentDistrict?.id);

  const { state: overlayState } =
    useCityOverlay(heartbeat, engine?.currentDistrict?.id);

  const { state: hudState } =
    useDistrictHUD(heartbeat, engine?.currentDistrict);

  const { state: actionBarState } =
    useCityActionBar(heartbeat, engine?.currentDistrict?.id);

  useEffect(() => {
    if (engine?.currentDistrict) {
      lifecycle.start({
        district: engine.currentDistrict,
        heartbeat
      });
    }

    return () => {
      lifecycle.stop();
    };
  }, [engine?.currentDistrict, heartbeat, lifecycle]);

  return (
    <div className="city-shell">
      <CityStatusBar heartbeat={heartbeat} />

      <div className="city-layout">
        <CityMenu engine={engine} />

        <div className="city-content">
          <CityRouter engine={engine} />
          <DistrictHUDHost hud={hudState} />
          <DistrictPanelHost panels={panels} />
        </div>

        <CityMapPanel engine={engine} mapState={mapState} />
      </div>

      <CityOverlayHost overlay={overlayState} />
      <CityActionBarHost bar={actionBarState} />
    </div>
  );
}

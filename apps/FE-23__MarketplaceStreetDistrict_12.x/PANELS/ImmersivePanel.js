// PANELS/ImmersivePanel.js

import { createHUDPanel } from "./HUDPanel.js";
import { createOverlayPanel } from "./OverlayPanel.js";

export function createPanels({ engine, store, eventBus }) {
  const hud = createHUDPanel({ store, eventBus });
  const overlay = createOverlayPanel({ eventBus });

  // 🔥 NEW — panels react to district lifecycle
  eventBus.on("engine:init", () => {
    hud.refresh?.();
    overlay.refresh?.();
  });

  eventBus.on("engine:heartbeat", () => {
    hud.refresh?.();
    overlay.refresh?.();
  });

  eventBus.on("engine:tick", () => {
    hud.refresh?.();
    overlay.refresh?.();
  });

  eventBus.on("engine:destroy", () => {
    hud.reset?.();
    overlay.reset?.();
  });

  function getImmersiveState() {
    return {
      engine: engine.getState(),
      hud: hud.getHUDState(),
      overlay: overlay.list()
    };
  }

  return {
    hud,
    overlay,
    getImmersiveState
  };
}

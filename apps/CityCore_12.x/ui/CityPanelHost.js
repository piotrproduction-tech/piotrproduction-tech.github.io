// CityCore_12.x/ui/CityPanelHost.js

import { renderUIElement } from "./renderUIElement.js";

export function createCityPanelHost() {
  return function panelHost(immersive) {
    return {
      component: "CityPanels",
      hud: immersive.hud || {},
      overlay: (immersive.overlay || []).map((msg) => ({
        component: "OverlayMessage",
        id: msg.id,
        message: msg.message,
        at: msg.at
      })),
      engine: immersive.engine || {},
      raw: immersive
    };
  };
}


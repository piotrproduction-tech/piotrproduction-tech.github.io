// ui/renderPanel.js

import { renderUIElement } from "./renderUIElement.js";

export function renderPanel(panelState) {
  if (!panelState) {
    return { component: "EmptyPanel" };
  }

  return {
    component: "Panel",
    hud: panelState.hud || {},
    overlay: (panelState.overlay || []).map((msg) => ({
      component: "OverlayMessage",
      id: msg.id,
      message: msg.message,
      at: msg.at
    })),
    engine: panelState.engine || {},
    raw: panelState
  };
}


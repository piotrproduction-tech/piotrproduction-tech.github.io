// ui/renderView.js

import { renderUIElement } from "./renderUIElement.js";
import { renderPanel } from "./renderPanel.js";

export function renderView(viewObject) {
  if (!viewObject || typeof viewObject !== "object") {
    return { component: "InvalidView", raw: viewObject };
  }

  const { view, user, snapshot, immersive, card, engine } = viewObject;

  return {
    component: view || "UnknownView",
    user,
    engine,
    snapshot,
    immersive: immersive ? renderPanel(immersive) : null,
    card: card ? renderUIElement(card) : null,
    raw: viewObject
  };
}


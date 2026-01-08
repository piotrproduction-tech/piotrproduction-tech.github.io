// CityCore_12.x/shell/CityShell.js

import { renderView } from "../ui/renderView.js";
import { renderPanel } from "../ui/renderPanel.js";

export function createCityShell({ router, panelHost }) {
  function render(cityState) {
    const { activeDistrict, viewObject, immersive } = cityState;

    return {
      component: "CityShell",
      district: activeDistrict?.id || null,
      view: viewObject ? renderView(viewObject) : null,
      panels: immersive ? panelHost(immersive) : null
    };
  }

  return {
    render
  };
}


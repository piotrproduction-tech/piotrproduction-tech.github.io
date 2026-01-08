import { eventBus } from "./eventBus.js";
import { initPulse } from "./pulse.js";
import { initRhythm } from "./rhythm.js";
import { initPersonality } from "./personality.js";
import { initHeatmap } from "./heatmap.js";
import { initEconomy } from "./economy.js";
import { initGovernance } from "./governance.js";
import { initMemory } from "./memory.js";
import { initBroadcast } from "./broadcast.js";
import { initSimulation } from "./simulation.js";
import { initMap } from "./map.js";
import { initDistricts } from "./districts.js";

export function initDistrictEngine() {
  console.log("🚂 DistrictEngine_12.x: initializing…");
  console.log("📡 MAPA EVENTÓW (FE):");
  console.log("  ui:view:show → odbiera FE → zmienia activeView");
  console.log("  ui:panel:show → odbiera FE → otwiera panel");
  console.log("  city:*:init → odbiera FE → aktualizuje heartbeat");

  // 🔥 HEARTBEAT MODULES
  initPulse();
  initRhythm();
  initPersonality();
  initHeatmap();
  initEconomy();
  initGovernance();
  initMemory();
  initBroadcast();
  initSimulation();

  // 🗺️ MAPA
  initMap();

  // ⭐ TU BYŁ BRAK — routing UI
  eventBus.on("ui:menu:click", (id) => {
    console.log("🛰 DistrictEngine: ui:menu:click →", id);
    eventBus.emit("ui:view:show", { view: id });
  });

  // ⭐ TU BYŁ BRAK — generowanie dzielnic po mapie
  eventBus.on("city:map:init", (mapData) => {
    initDistricts(mapData);
  });

  console.log("🚂 DistrictEngine_12.x: ready.");
}

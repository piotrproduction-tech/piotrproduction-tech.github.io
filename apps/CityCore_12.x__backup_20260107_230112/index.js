// ------------------------------------------------------------
//  CITY CORE 12.x - ORGAN ENGINES
// ------------------------------------------------------------

// MAP
import { init as initMAP } from "./core/MAP/CityMapEngine.js";

// MEMORY
import { init as initMEMORY } from "./core/MEMORY/CityMemoryEngine.js";

// HEALTH
import { init as initHEALTH } from "./core/HEALTH/CityHealthMonitorEngine.js";

// PULSE
import { init as initPULSE } from "./core/PULSE/CityPulseEngine.js";

// AI
import { init as initAI } from "./core/AI/CityAIEngine.js";

// HEATMAP
import { init as initHEATMAP } from "./core/HEATMAP/CityHeatmapEngine.js";

// NARRATIVE
import { init as initNARRATIVE } from "./core/NARRATIVE/CityNarrativeEngine.js";

// RHYTHM
import { init as initRHYTHM } from "./core/RHYTHM/CityRhythmEngine.js";

// PERSONALITY
import { init as initPERSONALITY } from "./core/PERSONALITY/CityPersonalityEngine.js";

// GOVERNANCE
import { init as initGOVERNANCE } from "./core/GOVERNANCE/CityGovernanceEngine.js";

// ECONOMY
import { init as initECONOMY } from "./core/ECONOMY/CityEconomyEngine.js";

// SIMULATION
import { init as initSIMULATION } from "./core/SIMULATION/CitySimulationEngine.js";

// BROADCAST
import { init as initBROADCAST } from "./core/BROADCAST/CityBroadcastEngine.js";

// SYNC
import { init as initSYNC } from "./core/SYNC/CitySyncEngine.js";

// UI LAYERS
import { init as initMENU } from "./core/MENU/CityMenuEngine.js";
import { init as initPANELS } from "./core/PANELS/CityPanelsEngine.js";
import { init as initVIEWS } from "./core/VIEWS/CityViewsEngine.js";

// DISTRICT ENGINE (12.x)
import { initDistrictEngine } from "../DistrictEngine_12.x/engine.js";


// ------------------------------------------------------------
//  CITY CORE INITIALIZATION
// ------------------------------------------------------------

export function initCityCore(engine) {
  console.log("CityCore_12.x: initializing...");

  // ORGANS
  initMAP(engine);
  initMEMORY(engine);
  initHEALTH(engine);
  initPULSE(engine);
  initAI(engine);
  initHEATMAP(engine);
  initNARRATIVE(engine);
  initRHYTHM(engine);
  initPERSONALITY(engine);
  initGOVERNANCE(engine);
  initECONOMY(engine);
  initSIMULATION(engine);
  initBROADCAST(engine);
  initSYNC(engine);

  // UI LAYERS
  initMENU(engine);
  initPANELS(engine);
  initVIEWS(engine);

  // DISTRICTS (runtime)
  initDistrictEngine(engine);

  console.log("CityCore_12.x: ready.");
}


// ------------------------------------------------------------
//  META-LAYER EXPORTS (required by tests)
// ------------------------------------------------------------

export const districts = [
  {
    id: "core",
    name: "CoreDistrict",
    enabled: true
  }
];

export function createEngine() {
  return {
    state: {},
    eventBus: new EventTarget()
  };
}

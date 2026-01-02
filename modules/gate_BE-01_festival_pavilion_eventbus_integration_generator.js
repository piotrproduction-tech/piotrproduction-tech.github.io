const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BE01 = path.join(ROOT, "backend", "BE-01__Festival_Pavilion");
const EVENTS = path.join(BE01, "events");
const CORE = path.join(BE01, "core");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function ensureFile(filePath, baseContent = "") {
  if (!fs.existsSync(filePath)) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, baseContent, "utf8");
    console.log("[CREATE]", filePath);
  }
}

function appendIfMissing(filePath, marker, block) {
  ensureFile(filePath);
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.includes(marker)) {
    fs.writeFileSync(filePath, content + "\n\n" + block, "utf8");
    console.log("[UPDATED]", filePath, "→ added:", marker);
  } else {
    console.log("[SKIP]", filePath, "already has:", marker);
  }
}

//
// 1. Integracja listeners.js z globalnym eventBus
//
function integrateListeners() {
  const file = path.join(EVENTS, "listeners.js");
  const marker = "// FESTIVAL_GLOBAL_EVENTBUS_INTEGRATION";

  const block = `
// FESTIVAL_GLOBAL_EVENTBUS_INTEGRATION
// Attach Festival Pavilion listeners to the global CityEventBus

import { getFestivalEngine } from "../core/index.js";

export function attachFestivalToCityEventBus(cityEventBus) {
  const engine = getFestivalEngine();

  const festivalEvents = [
    "FESTIVAL_SUBMISSION_CREATED",
    "FESTIVAL_JURY_ASSIGNED",
    "FESTIVAL_JURY_VOTED",
    "FESTIVAL_AWARD_CATEGORY_CREATED",
    "FESTIVAL_AWARD_GRANTED",
    "FESTIVAL_EVENT_CREATED",
    "FESTIVAL_EVENT_UPDATED",
    "FESTIVAL_SCHEDULE_ENTRY_ADDED"
  ];

  for (const type of festivalEvents) {
    cityEventBus.on(type, (event) => {
      const result = engine.dispatch({
        type: event.type.replace("FESTIVAL_", ""),
        payload: event.payload
      });

      engine.narrative.record(engine.state, event);
    });
  }

  return true;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. Integracja core/index.js z globalnym eventBus
//
function integrateCore() {
  const file = path.join(CORE, "index.js");
  const marker = "// FESTIVAL_ENGINE_EVENTBUS_EXPORT";

  const block = `
// FESTIVAL_ENGINE_EVENTBUS_EXPORT
// Export helper for attaching Festival Pavilion to CityEventBus

import { attachFestivalToCityEventBus } from "../events/listeners.js";

export function registerFestivalWithCityEventBus(cityEventBus) {
  return attachFestivalToCityEventBus(cityEventBus);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. Dodanie routera eventów FESTIVAL → CityEventBus
//
function integrateRouter() {
  const file = path.join(EVENTS, "router.js");
  const marker = "// FESTIVAL_ROUTER_TO_CITY_EVENTBUS";

  const block = `
// FESTIVAL_ROUTER_TO_CITY_EVENTBUS
// Forward Festival Pavilion events into the CityEventBus

export function forwardFestivalEventToCity(eventBus, event) {
  eventBus.emit(event.type, event);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Dodanie bootstrapu integracji (opcjonalny, ale przydatny)
//
function createBootstrap() {
  const file = path.join(BE01, "eventbus.bootstrap.js");
  const marker = "// FESTIVAL_EVENTBUS_BOOTSTRAP";

  const block = `
// FESTIVAL_EVENTBUS_BOOTSTRAP
// Bootstrap file to attach Festival Pavilion to the global CityEventBus

import { registerFestivalWithCityEventBus } from "./core/index.js";

export function bootstrapFestivalEventBus(cityEventBus) {
  registerFestivalWithCityEventBus(cityEventBus);
  console.log("[FESTIVAL] Festival Pavilion connected to CityEventBus");
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== Festival Pavilion EventBus Integration Generator ===");

  ensureDir(EVENTS);
  ensureDir(CORE);

  integrateListeners();
  integrateCore();
  integrateRouter();
  createBootstrap();

  console.log("=== DONE ===");
}

main();

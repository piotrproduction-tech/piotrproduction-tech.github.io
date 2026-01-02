const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
const LIVE = path.join(FE01, "live");

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
// 1. core/simulationBus.js — wrapper na CitySimulationEngine + CityEmergenceEngine
//
function coreSimulationBus() {
  const file = path.join(CORE, "simulationBus.js");
  const marker = "// FE_FESTIVAL_SIMULATION_BUS";

  const block = `
// FE_FESTIVAL_SIMULATION_BUS
// Frontend wrapper for CitySimulationEngine & CityEmergenceEngine

let simulationBus = null;
let emergenceBus = null;

export function registerCitySimulationBus(bus) {
  simulationBus = bus;
}

export function registerCityEmergenceBus(bus) {
  emergenceBus = bus;
}

export function onSimulationEvent(handler) {
  if (!simulationBus) return;
  simulationBus.on("CITY_SIMULATION_WAVE", handler);
}

export function onEmergenceEvent(handler) {
  if (!emergenceBus) return;
  emergenceBus.on("CITY_EMERGENCE_PATTERN", handler);
}

export function offSimulationEvent(handler) {
  if (!simulationBus) return;
  simulationBus.off("CITY_SIMULATION_WAVE", handler);
}

export function offEmergenceEvent(handler) {
  if (!emergenceBus) return;
  emergenceBus.off("CITY_EMERGENCE_PATTERN", handler);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. live/festivalSimulationLiveSync.js — listener
//
function liveSimulationSync() {
  const file = path.join(LIVE, "festivalSimulationLiveSync.js");
  const marker = "// FE_FESTIVAL_SIMULATION_LIVE_SYNC";

  const block = `
// FE_FESTIVAL_SIMULATION_LIVE_SYNC
// Live sync for Festival Pavilion — activity waves + emergent patterns

import { onSimulationEvent, onEmergenceEvent } from "../core/simulationBus";

export function attachFestivalSimulationLiveSync(onWave, onPattern) {
  // Fale aktywności (np. "peak", "low", "surge")
  onSimulationEvent((event) => {
    if (event?.payload?.module === "CITY") {
      onWave({
        intensity: event.payload.intensity,
        trend: event.payload.trend,
        label: event.payload.label
      });
    }
  });

  // Wzorce emergentne (np. "cluster", "burst", "silence")
  onEmergenceEvent((event) => {
    if (event?.payload?.module === "CITY") {
      onPattern({
        type: event.payload.type,
        strength: event.payload.strength,
        description: event.payload.description
      });
    }
  });
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. core/useFestivalSimulationLive.js — hook Reactowy
//
function liveSimulationHook() {
  const file = path.join(CORE, "useFestivalSimulationLive.js");
  const marker = "// FE_FESTIVAL_SIMULATION_HOOK";

  const block = `
// FE_FESTIVAL_SIMULATION_HOOK
// React hook for live simulation/emergence updates

import { useEffect } from "react";
import { attachFestivalSimulationLiveSync } from "../live/festivalSimulationLiveSync";

export function useFestivalSimulationLive(onWave, onPattern) {
  useEffect(() => {
    attachFestivalSimulationLiveSync(onWave, onPattern);
  }, []);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Integracja z panelami FE
//
function integratePanels() {
  const panels = [
    path.join(FE01, "ADMIN", "AdminDashboard.js"),
    path.join(FE01, "ANALYTICS", "FestivalCharts.js"),
    path.join(FE01, "ANALYTICS", "FestivalHeatmap.js"),
    path.join(FE01, "ADMIN", "AdminSchedulePanel.js")
  ];

  const marker = "// FE_FESTIVAL_SIMULATION_INTEGRATION";

  const block = `
// FE_FESTIVAL_SIMULATION_INTEGRATION
import { useFestivalSimulationLive } from "../core/useFestivalSimulationLive";

useFestivalSimulationLive(
  (wave) => {
    if (typeof setWave === "function") setWave(wave);
    if (typeof load === "function") load(); // refresh panel
  },
  (pattern) => {
    if (typeof setPattern === "function") setPattern(pattern);
    if (typeof load === "function") load();
  }
);
`;

  for (const file of panels) {
    appendIfMissing(file, marker, block);
  }
}

//
// 5. Bootstrap integracji z FE-00__City
//
function createBootstrap() {
  const file = path.join(FE01, "simulation.bootstrap.js");
  const marker = "// FE_FESTIVAL_SIMULATION_BOOTSTRAP";

  const block = `
// FE_FESTIVAL_SIMULATION_BOOTSTRAP
// Attach Festival Pavilion to CitySimulationEngine & CityEmergenceEngine on FE side

import { registerCitySimulationBus, registerCityEmergenceBus } from "./core/simulationBus";

export function bootstrapFestivalSimulation(citySimulationBus, cityEmergenceBus) {
  registerCitySimulationBus(citySimulationBus);
  registerCityEmergenceBus(cityEmergenceBus);
  console.log("[FESTIVAL] Simulation & Emergence connected to CitySimulationEngine + CityEmergenceEngine");
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== Festival Pavilion FE Simulation/Emergence Integration Generator ===");

  ensureDir(CORE);
  ensureDir(LIVE);

  coreSimulationBus();
  liveSimulationSync();
  liveSimulationHook();
  integratePanels();
  createBootstrap();

  console.log("=== DONE ===");
}

main();

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
// 1. core/reputationBus.js — wrapper na CityReputationEngine
//
function coreReputationBus() {
  const file = path.join(CORE, "reputationBus.js");
  const marker = "// FE_FESTIVAL_REPUTATION_BUS";

  const block = `
// FE_FESTIVAL_REPUTATION_BUS
// Frontend wrapper for CityReputationEngine

let reputationBus = null;

export function registerCityReputationBus(bus) {
  reputationBus = bus;
}

export function onReputationEvent(handler) {
  if (!reputationBus) return;
  reputationBus.on("CITY_REPUTATION_UPDATE", handler);
}

export function offReputationEvent(handler) {
  if (!reputationBus) return;
  reputationBus.off("CITY_REPUTATION_UPDATE", handler);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. live/festivalReputationLiveSync.js — listener
//
function liveReputationSync() {
  const file = path.join(LIVE, "festivalReputationLiveSync.js");
  const marker = "// FE_FESTIVAL_REPUTATION_LIVE_SYNC";

  const block = `
// FE_FESTIVAL_REPUTATION_LIVE_SYNC
// Live sync for Festival Pavilion — reputation, prestige, levels

import { onReputationEvent } from "../core/reputationBus";

export function attachFestivalReputationLiveSync(callback) {
  // callback({ userId, points, level, prestige }) → FE should update UI
  onReputationEvent((event) => {
    if (event?.payload?.module === "CITY") {
      callback({
        userId: event.payload.userId,
        points: event.payload.points,
        level: event.payload.level,
        prestige: event.payload.prestige
      });
    }
  });
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. core/useFestivalReputationLive.js — hook Reactowy
//
function liveReputationHook() {
  const file = path.join(CORE, "useFestivalReputationLive.js");
  const marker = "// FE_FESTIVAL_REPUTATION_HOOK";

  const block = `
// FE_FESTIVAL_REPUTATION_HOOK
// React hook for live reputation updates

import { useEffect } from "react";
import { attachFestivalReputationLiveSync } from "../live/festivalReputationLiveSync";

export function useFestivalReputationLive(onReputation) {
  useEffect(() => {
    attachFestivalReputationLiveSync((rep) => {
      onReputation(rep);
    });
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
    path.join(FE01, "ADMIN", "AdminAwardsPanel.js"),
    path.join(FE01, "JURY", "JuryPanel.js"),
    path.join(FE01, "ANALYTICS", "FestivalCharts.js")
  ];

  const marker = "// FE_FESTIVAL_REPUTATION_INTEGRATION";

  const block = `
// FE_FESTIVAL_REPUTATION_INTEGRATION
import { useFestivalReputationLive } from "../core/useFestivalReputationLive";

useFestivalReputationLive((rep) => {
  if (typeof setReputation === "function") setReputation(rep);
  if (typeof load === "function") load(); // refresh panel
});
`;

  for (const file of panels) {
    appendIfMissing(file, marker, block);
  }
}

//
// 5. Bootstrap integracji z FE-00__City
//
function createBootstrap() {
  const file = path.join(FE01, "reputation.bootstrap.js");
  const marker = "// FE_FESTIVAL_REPUTATION_BOOTSTRAP";

  const block = `
// FE_FESTIVAL_REPUTATION_BOOTSTRAP
// Attach Festival Pavilion to CityReputationEngine on FE side

import { registerCityReputationBus } from "./core/reputationBus";

export function bootstrapFestivalReputation(cityReputationBus) {
  registerCityReputationBus(cityReputationBus);
  console.log("[FESTIVAL] Reputation connected to CityReputationEngine");
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== Festival Pavilion FE Reputation Integration Generator ===");

  ensureDir(CORE);
  ensureDir(LIVE);

  coreReputationBus();
  liveReputationSync();
  liveReputationHook();
  integratePanels();
  createBootstrap();

  console.log("=== DONE ===");
}

main();

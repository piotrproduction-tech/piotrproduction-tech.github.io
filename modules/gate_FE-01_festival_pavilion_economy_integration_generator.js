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
// 1. core/economyBus.js — wrapper na CityEconomyEngine
//
function coreEconomyBus() {
  const file = path.join(CORE, "economyBus.js");
  const marker = "// FE_FESTIVAL_ECONOMY_BUS";

  const block = `
// FE_FESTIVAL_ECONOMY_BUS
// Frontend wrapper for CityEconomyEngine

let economyBus = null;

export function registerCityEconomyBus(bus) {
  economyBus = bus;
}

export function onEconomyEvent(handler) {
  if (!economyBus) return;
  economyBus.on("CITY_ECONOMY_UPDATE", handler);
}

export function offEconomyEvent(handler) {
  if (!economyBus) return;
  economyBus.off("CITY_ECONOMY_UPDATE", handler);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. live/festivalEconomyLiveSync.js — listener
//
function liveEconomySync() {
  const file = path.join(LIVE, "festivalEconomyLiveSync.js");
  const marker = "// FE_FESTIVAL_ECONOMY_LIVE_SYNC";

  const block = `
// FE_FESTIVAL_ECONOMY_LIVE_SYNC
// Live sync for Festival Pavilion — tokens, transactions, marketplace synergy

import { onEconomyEvent } from "../core/economyBus";

export function attachFestivalEconomyLiveSync(callback) {
  // callback({ userId, tokens, delta, reason, transaction }) → FE should update UI
  onEconomyEvent((event) => {
    if (event?.payload?.module === "CITY") {
      callback({
        userId: event.payload.userId,
        tokens: event.payload.tokens,
        delta: event.payload.delta,
        reason: event.payload.reason,
        transaction: event.payload.transaction
      });
    }
  });
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. core/useFestivalEconomyLive.js — hook Reactowy
//
function liveEconomyHook() {
  const file = path.join(CORE, "useFestivalEconomyLive.js");
  const marker = "// FE_FESTIVAL_ECONOMY_HOOK";

  const block = `
// FE_FESTIVAL_ECONOMY_HOOK
// React hook for live economy updates

import { useEffect } from "react";
import { attachFestivalEconomyLiveSync } from "../live/festivalEconomyLiveSync";

export function useFestivalEconomyLive(onEconomy) {
  useEffect(() => {
    attachFestivalEconomyLiveSync((eco) => {
      onEconomy(eco);
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
    path.join(FE01, "ANALYTICS", "FestivalCharts.js"),
    path.join(FE01, "ANALYTICS", "FestivalHeatmap.js")
  ];

  const marker = "// FE_FESTIVAL_ECONOMY_INTEGRATION";

  const block = `
// FE_FESTIVAL_ECONOMY_INTEGRATION
import { useFestivalEconomyLive } from "../core/useFestivalEconomyLive";

useFestivalEconomyLive((eco) => {
  if (typeof setEconomy === "function") setEconomy(eco);
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
  const file = path.join(FE01, "economy.bootstrap.js");
  const marker = "// FE_FESTIVAL_ECONOMY_BOOTSTRAP";

  const block = `
// FE_FESTIVAL_ECONOMY_BOOTSTRAP
// Attach Festival Pavilion to CityEconomyEngine on FE side

import { registerCityEconomyBus } from "./core/economyBus";

export function bootstrapFestivalEconomy(cityEconomyBus) {
  registerCityEconomyBus(cityEconomyBus);
  console.log("[FESTIVAL] Economy connected to CityEconomyEngine");
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== Festival Pavilion FE Economy Integration Generator ===");

  ensureDir(CORE);
  ensureDir(LIVE);

  coreEconomyBus();
  liveEconomySync();
  liveEconomyHook();
  integratePanels();
  createBootstrap();

  console.log("=== DONE ===");
}

main();

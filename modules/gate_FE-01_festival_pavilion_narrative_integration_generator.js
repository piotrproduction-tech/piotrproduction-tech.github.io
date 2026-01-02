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
// 1. core/narrativeBus.js — frontend wrapper na CityNarrativeEngine
//
function coreNarrativeBus() {
  const file = path.join(CORE, "narrativeBus.js");
  const marker = "// FE_FESTIVAL_NARRATIVE_BUS";

  const block = `
// FE_FESTIVAL_NARRATIVE_BUS
// Frontend wrapper for CityNarrativeEngine event bus

let narrativeBus = null;

export function registerCityNarrativeBus(bus) {
  narrativeBus = bus;
}

export function onNarrativeEvent(handler) {
  if (!narrativeBus) return;
  narrativeBus.on("CITY_NARRATIVE_EVENT", handler);
}

export function offNarrativeEvent(handler) {
  if (!narrativeBus) return;
  narrativeBus.off("CITY_NARRATIVE_EVENT", handler);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. live/festivalNarrativeLiveSync.js — listener narracji
//
function liveNarrativeSync() {
  const file = path.join(LIVE, "festivalNarrativeLiveSync.js");
  const marker = "// FE_FESTIVAL_NARRATIVE_LIVE_SYNC";

  const block = `
// FE_FESTIVAL_NARRATIVE_LIVE_SYNC
// Live sync for Festival Pavilion narrative feed

import { onNarrativeEvent } from "../core/narrativeBus";

export function attachFestivalNarrativeLiveSync(callback) {
  // callback(story) → FE should update narrative feed
  onNarrativeEvent((event) => {
    if (event?.payload?.module === "FESTIVAL") {
      callback(event.payload.story);
    }
  });
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. core/useFestivalNarrativeLive.js — hook Reactowy
//
function liveNarrativeHook() {
  const file = path.join(CORE, "useFestivalNarrativeLive.js");
  const marker = "// FE_FESTIVAL_NARRATIVE_HOOK";

  const block = `
// FE_FESTIVAL_NARRATIVE_HOOK
// React hook for live narrative updates in Festival Pavilion

import { useEffect } from "react";
import { attachFestivalNarrativeLiveSync } from "../live/festivalNarrativeLiveSync";

export function useFestivalNarrativeLive(onStory) {
  useEffect(() => {
    attachFestivalNarrativeLiveSync((story) => {
      onStory(story);
    });
  }, []);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Integracja z panelami FE (AdminDashboard, JuryPanel itd.)
//
function integratePanels() {
  const panels = [
    path.join(FE01, "ADMIN", "AdminDashboard.js"),
    path.join(FE01, "JURY", "JuryPanel.js"),
    path.join(FE01, "ADMIN", "AdminAwardsPanel.js"),
    path.join(FE01, "ADMIN", "AdminJuryPanel.js"),
    path.join(FE01, "ADMIN", "AdminSchedulePanel.js")
  ];

  const marker = "// FE_FESTIVAL_NARRATIVE_INTEGRATION";

  const block = `
// FE_FESTIVAL_NARRATIVE_INTEGRATION
import { useFestivalNarrativeLive } from "../core/useFestivalNarrativeLive";

useFestivalNarrativeLive((story) => {
  if (typeof load === "function") load(); // refresh panel
});
`;

  for (const file of panels) {
    appendIfMissing(file, marker, block);
  }
}

//
// 5. Integracja z FE-00__City (opcjonalny bootstrap)
//
function createBootstrap() {
  const file = path.join(FE01, "narrative.bootstrap.js");
  const marker = "// FE_FESTIVAL_NARRATIVE_BOOTSTRAP";

  const block = `
// FE_FESTIVAL_NARRATIVE_BOOTSTRAP
// Attach Festival Pavilion to CityNarrativeEngine on FE side

import { registerCityNarrativeBus } from "./core/narrativeBus";

export function bootstrapFestivalNarrative(cityNarrativeBus) {
  registerCityNarrativeBus(cityNarrativeBus);
  console.log("[FESTIVAL] Narrative feed connected to CityNarrativeEngine");
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== Festival Pavilion FE Narrative Integration Generator ===");

  ensureDir(CORE);
  ensureDir(LIVE);

  coreNarrativeBus();
  liveNarrativeSync();
  liveNarrativeHook();
  integratePanels();
  createBootstrap();

  console.log("=== DONE ===");
}

main();

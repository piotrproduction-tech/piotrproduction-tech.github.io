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
// 1. core/eventBus.js — frontend eventBus wrapper
//
function coreEventBus() {
  const file = path.join(CORE, "eventBus.js");
  const marker = "// FE_FESTIVAL_EVENTBUS_CORE";

  const block = `
// FE_FESTIVAL_EVENTBUS_CORE
// Frontend wrapper for global CityEventBus

let cityEventBus = null;

export function registerCityEventBus(bus) {
  cityEventBus = bus;
}

export function getCityEventBus() {
  return cityEventBus;
}

export function onCityEvent(type, handler) {
  if (!cityEventBus) return;
  cityEventBus.on(type, handler);
}

export function offCityEvent(type, handler) {
  if (!cityEventBus) return;
  cityEventBus.off(type, handler);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. live/festivalLiveSync.js — główny listener FE‑01
//
function liveSync() {
  const file = path.join(LIVE, "festivalLiveSync.js");
  const marker = "// FE_FESTIVAL_LIVE_SYNC";

  const block = `
// FE_FESTIVAL_LIVE_SYNC
// Live sync for Festival Pavilion — listens to CityEventBus and updates FE state

import { onCityEvent } from "../core/eventBus";

const FESTIVAL_EVENTS = [
  "FESTIVAL_SUBMISSION_CREATED",
  "FESTIVAL_JURY_ASSIGNED",
  "FESTIVAL_JURY_VOTED",
  "FESTIVAL_AWARD_CATEGORY_CREATED",
  "FESTIVAL_AWARD_GRANTED",
  "FESTIVAL_EVENT_CREATED",
  "FESTIVAL_EVENT_UPDATED",
  "FESTIVAL_SCHEDULE_ENTRY_ADDED"
];

export function attachFestivalLiveSync(callback) {
  // callback(event) → FE should refresh its data
  FESTIVAL_EVENTS.forEach(type => {
    onCityEvent(type, (event) => {
      callback(event);
    });
  });
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. core/useFestivalLive.js — hook do użycia w panelach FE
//
function liveHook() {
  const file = path.join(CORE, "useFestivalLive.js");
  const marker = "// FE_FESTIVAL_LIVE_HOOK";

  const block = `
// FE_FESTIVAL_LIVE_HOOK
// React hook for live updates in Festival Pavilion

import { useEffect } from "react";
import { attachFestivalLiveSync } from "../live/festivalLiveSync";

export function useFestivalLive(onEvent) {
  useEffect(() => {
    attachFestivalLiveSync((ev) => {
      onEvent(ev);
    });
  }, []);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Integracja w AdminDashboard.js, JuryPanel.js itd.
//    Doklejamy marker, który pozwala panelom reagować na live updates.
//
function integratePanels() {
  const panels = [
    path.join(FE01, "ADMIN", "AdminDashboard.js"),
    path.join(FE01, "ADMIN", "AdminAwardsPanel.js"),
    path.join(FE01, "ADMIN", "AdminJuryPanel.js"),
    path.join(FE01, "ADMIN", "AdminSchedulePanel.js"),
    path.join(FE01, "ANALYTICS", "FestivalCharts.js"),
    path.join(FE01, "ANALYTICS", "FestivalHeatmap.js"),
    path.join(FE01, "JURY", "JuryPanel.js")
  ];

  const marker = "// FE_FESTIVAL_LIVE_INTEGRATION";

  const block = `
// FE_FESTIVAL_LIVE_INTEGRATION
import { useFestivalLive } from "../core/useFestivalLive";

useFestivalLive(() => {
  if (typeof load === "function") load();
});
`;

  for (const file of panels) {
    appendIfMissing(file, marker, block);
  }
}

function main() {
  console.log("=== Festival Pavilion FE EventBus Integration Generator ===");

  ensureDir(CORE);
  ensureDir(LIVE);

  coreEventBus();
  liveSync();
  liveHook();
  integratePanels();

  console.log("=== DONE ===");
}

main();

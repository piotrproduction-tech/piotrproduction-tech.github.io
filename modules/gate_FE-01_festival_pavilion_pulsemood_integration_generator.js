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
// 1. core/pulseMoodBus.js — wrapper na CityPulseEngine & CityMoodEngine
//
function corePulseMoodBus() {
  const file = path.join(CORE, "pulseMoodBus.js");
  const marker = "// FE_FESTIVAL_PULSE_MOOD_BUS";

  const block = `
// FE_FESTIVAL_PULSE_MOOD_BUS
// Frontend wrapper for CityPulseEngine & CityMoodEngine

let pulseBus = null;
let moodBus = null;

export function registerCityPulseBus(bus) {
  pulseBus = bus;
}

export function registerCityMoodBus(bus) {
  moodBus = bus;
}

export function onPulseEvent(handler) {
  if (!pulseBus) return;
  pulseBus.on("CITY_PULSE_UPDATE", handler);
}

export function onMoodEvent(handler) {
  if (!moodBus) return;
  moodBus.on("CITY_MOOD_UPDATE", handler);
}

export function offPulseEvent(handler) {
  if (!pulseBus) return;
  pulseBus.off("CITY_PULSE_UPDATE", handler);
}

export function offMoodEvent(handler) {
  if (!moodBus) return;
  moodBus.off("CITY_MOOD_UPDATE", handler);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. live/festivalPulseMoodLiveSync.js — listener
//
function livePulseMoodSync() {
  const file = path.join(LIVE, "festivalPulseMoodLiveSync.js");
  const marker = "// FE_FESTIVAL_PULSE_MOOD_LIVE_SYNC";

  const block = `
// FE_FESTIVAL_PULSE_MOOD_LIVE_SYNC
// Live sync for Festival Pavilion — BPM + Mood updates

import { onPulseEvent, onMoodEvent } from "../core/pulseMoodBus";

export function attachFestivalPulseMoodLiveSync(onPulse, onMood) {
  onPulseEvent((event) => {
    if (event?.payload?.module === "CITY") {
      onPulse(event.payload.bpm);
    }
  });

  onMoodEvent((event) => {
    if (event?.payload?.module === "CITY") {
      onMood(event.payload.mood);
    }
  });
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. core/useFestivalPulseMoodLive.js — hook Reactowy
//
function livePulseMoodHook() {
  const file = path.join(CORE, "useFestivalPulseMoodLive.js");
  const marker = "// FE_FESTIVAL_PULSE_MOOD_HOOK";

  const block = `
// FE_FESTIVAL_PULSE_MOOD_HOOK
// React hook for live BPM + Mood updates

import { useEffect } from "react";
import { attachFestivalPulseMoodLiveSync } from "../live/festivalPulseMoodLiveSync";

export function useFestivalPulseMoodLive(onPulse, onMood) {
  useEffect(() => {
    attachFestivalPulseMoodLiveSync(onPulse, onMood);
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
    path.join(FE01, "JURY", "JuryPanel.js")
  ];

  const marker = "// FE_FESTIVAL_PULSE_MOOD_INTEGRATION";

  const block = `
// FE_FESTIVAL_PULSE_MOOD_INTEGRATION
import { useFestivalPulseMoodLive } from "../core/useFestivalPulseMoodLive";

useFestivalPulseMoodLive(
  (bpm) => {
    if (typeof setPulse === "function") setPulse(bpm);
  },
  (mood) => {
    if (typeof setMood === "function") setMood(mood);
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
  const file = path.join(FE01, "pulsemood.bootstrap.js");
  const marker = "// FE_FESTIVAL_PULSE_MOOD_BOOTSTRAP";

  const block = `
// FE_FESTIVAL_PULSE_MOOD_BOOTSTRAP
// Attach Festival Pavilion to CityPulseEngine & CityMoodEngine on FE side

import { registerCityPulseBus, registerCityMoodBus } from "./core/pulseMoodBus";

export function bootstrapFestivalPulseMood(cityPulseBus, cityMoodBus) {
  registerCityPulseBus(cityPulseBus);
  registerCityMoodBus(cityMoodBus);
  console.log("[FESTIVAL] Pulse & Mood connected to CityPulseEngine + CityMoodEngine");
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== Festival Pavilion FE Pulse/Mood Integration Generator ===");

  ensureDir(CORE);
  ensureDir(LIVE);

  corePulseMoodBus();
  livePulseMoodSync();
  livePulseMoodHook();
  integratePanels();
  createBootstrap();

  console.log("=== DONE ===");
}

main();

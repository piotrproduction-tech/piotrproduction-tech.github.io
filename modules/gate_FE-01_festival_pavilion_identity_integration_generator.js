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
// 1. core/identityBus.js — wrapper na CityIdentityEngine
//
function coreIdentityBus() {
  const file = path.join(CORE, "identityBus.js");
  const marker = "// FE_FESTIVAL_IDENTITY_BUS";

  const block = `
// FE_FESTIVAL_IDENTITY_BUS
// Frontend wrapper for CityIdentityEngine

let identityBus = null;

export function registerCityIdentityBus(bus) {
  identityBus = bus;
}

export function onIdentityEvent(handler) {
  if (!identityBus) return;
  identityBus.on("CITY_IDENTITY_UPDATE", handler);
}

export function offIdentityEvent(handler) {
  if (!identityBus) return;
  identityBus.off("CITY_IDENTITY_UPDATE", handler);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. live/festivalIdentityLiveSync.js — listener
//
function liveIdentitySync() {
  const file = path.join(LIVE, "festivalIdentityLiveSync.js");
  const marker = "// FE_FESTIVAL_IDENTITY_LIVE_SYNC";

  const block = `
// FE_FESTIVAL_IDENTITY_LIVE_SYNC
// Live sync for Festival Pavilion — profile, avatar, badges

import { onIdentityEvent } from "../core/identityBus";

export function attachFestivalIdentityLiveSync(callback) {
  // callback({ userId, profile, avatar, badges }) → FE should update UI
  onIdentityEvent((event) => {
    if (event?.payload?.module === "CITY") {
      callback({
        userId: event.payload.userId,
        profile: event.payload.profile,
        avatar: event.payload.avatar,
        badges: event.payload.badges
      });
    }
  });
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. core/useFestivalIdentityLive.js — hook Reactowy
//
function liveIdentityHook() {
  const file = path.join(CORE, "useFestivalIdentityLive.js");
  const marker = "// FE_FESTIVAL_IDENTITY_HOOK";

  const block = `
// FE_FESTIVAL_IDENTITY_HOOK
// React hook for live identity updates

import { useEffect } from "react";
import { attachFestivalIdentityLiveSync } from "../live/festivalIdentityLiveSync";

export function useFestivalIdentityLive(onIdentity) {
  useEffect(() => {
    attachFestivalIdentityLiveSync((id) => {
      onIdentity(id);
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
    path.join(FE01, "JURY", "JuryPanel.js"),
    path.join(FE01, "ADMIN", "AdminAwardsPanel.js"),
    path.join(FE01, "ADMIN", "AdminJuryPanel.js"),
    path.join(FE01, "ADMIN", "AdminSchedulePanel.js"),
    path.join(FE01, "ANALYTICS", "FestivalCharts.js")
  ];

  const marker = "// FE_FESTIVAL_IDENTITY_INTEGRATION";

  const block = `
// FE_FESTIVAL_IDENTITY_INTEGRATION
import { useFestivalIdentityLive } from "../core/useFestivalIdentityLive";

useFestivalIdentityLive((id) => {
  if (typeof setIdentity === "function") setIdentity(id);
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
  const file = path.join(FE01, "identity.bootstrap.js");
  const marker = "// FE_FESTIVAL_IDENTITY_BOOTSTRAP";

  const block = `
// FE_FESTIVAL_IDENTITY_BOOTSTRAP
// Attach Festival Pavilion to CityIdentityEngine on FE side

import { registerCityIdentityBus } from "./core/identityBus";

export function bootstrapFestivalIdentity(cityIdentityBus) {
  registerCityIdentityBus(cityIdentityBus);
  console.log("[FESTIVAL] Identity connected to CityIdentityEngine");
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== Festival Pavilion FE Identity Integration Generator ===");

  ensureDir(CORE);
  ensureDir(LIVE);

  coreIdentityBus();
  liveIdentitySync();
  liveIdentityHook();
  integratePanels();
  createBootstrap();

  console.log("=== DONE ===");
}

main();

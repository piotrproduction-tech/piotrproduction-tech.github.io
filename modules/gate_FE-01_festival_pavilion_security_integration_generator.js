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
// 1. core/securityBus.js — wrapper na CitySecurityEngine
//
function coreSecurityBus() {
  const file = path.join(CORE, "securityBus.js");
  const marker = "// FE_FESTIVAL_SECURITY_BUS";

  const block = `
// FE_FESTIVAL_SECURITY_BUS
// Frontend wrapper for CitySecurityEngine

let securityBus = null;

export function registerCitySecurityBus(bus) {
  securityBus = bus;
}

export function onSecurityEvent(handler) {
  if (!securityBus) return;
  securityBus.on("CITY_SECURITY_UPDATE", handler);
}

export function offSecurityEvent(handler) {
  if (!securityBus) return;
  securityBus.off("CITY_SECURITY_UPDATE", handler);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. live/festivalSecurityLiveSync.js — listener
//
function liveSecuritySync() {
  const file = path.join(LIVE, "festivalSecurityLiveSync.js");
  const marker = "// FE_FESTIVAL_SECURITY_LIVE_SYNC";

  const block = `
// FE_FESTIVAL_SECURITY_LIVE_SYNC
// Live sync for Festival Pavilion — anti-abuse, throttling, trust-levels

import { onSecurityEvent } from "../core/securityBus";

export function attachFestivalSecurityLiveSync(callback) {
  // callback({ userId, trustLevel, flags, throttling }) → FE should update UI
  onSecurityEvent((event) => {
    if (event?.payload?.module === "CITY") {
      callback({
        userId: event.payload.userId,
        trustLevel: event.payload.trustLevel,
        flags: event.payload.flags,
        throttling: event.payload.throttling
      });
    }
  });
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. core/useFestivalSecurityLive.js — hook Reactowy
//
function liveSecurityHook() {
  const file = path.join(CORE, "useFestivalSecurityLive.js");
  const marker = "// FE_FESTIVAL_SECURITY_HOOK";

  const block = `
// FE_FESTIVAL_SECURITY_HOOK
// React hook for live security updates

import { useEffect } from "react";
import { attachFestivalSecurityLiveSync } from "../live/festivalSecurityLiveSync";

export function useFestivalSecurityLive(onSecurity) {
  useEffect(() => {
    attachFestivalSecurityLiveSync((sec) => {
      onSecurity(sec);
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
    path.join(FE01, "ADMIN", "AdminJuryPanel.js"),
    path.join(FE01, "ADMIN", "AdminAwardsPanel.js"),
    path.join(FE01, "JURY", "JuryPanel.js"),
    path.join(FE01, "ANALYTICS", "FestivalCharts.js")
  ];

  const marker = "// FE_FESTIVAL_SECURITY_INTEGRATION";

  const block = `
// FE_FESTIVAL_SECURITY_INTEGRATION
import { useFestivalSecurityLive } from "../core/useFestivalSecurityLive";

useFestivalSecurityLive((sec) => {
  if (typeof setSecurity === "function") setSecurity(sec);
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
  const file = path.join(FE01, "security.bootstrap.js");
  const marker = "// FE_FESTIVAL_SECURITY_BOOTSTRAP";

  const block = `
// FE_FESTIVAL_SECURITY_BOOTSTRAP
// Attach Festival Pavilion to CitySecurityEngine on FE side

import { registerCitySecurityBus } from "./core/securityBus";

export function bootstrapFestivalSecurity(citySecurityBus) {
  registerCitySecurityBus(citySecurityBus);
  console.log("[FESTIVAL] Security connected to CitySecurityEngine");
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== Festival Pavilion FE Security Integration Generator ===");

  ensureDir(CORE);
  ensureDir(LIVE);

  coreSecurityBus();
  liveSecuritySync();
  liveSecurityHook();
  integratePanels();
  createBootstrap();

  console.log("=== DONE ===");
}

main();

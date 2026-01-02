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
// 1. core/governanceBus.js — wrapper na CityGovernanceEngine
//
function coreGovernanceBus() {
  const file = path.join(CORE, "governanceBus.js");
  const marker = "// FE_FESTIVAL_GOVERNANCE_BUS";

  const block = `
// FE_FESTIVAL_GOVERNANCE_BUS
// Frontend wrapper for CityGovernanceEngine

let governanceBus = null;

export function registerCityGovernanceBus(bus) {
  governanceBus = bus;
}

export function onGovernanceEvent(handler) {
  if (!governanceBus) return;
  governanceBus.on("CITY_GOVERNANCE_UPDATE", handler);
}

export function offGovernanceEvent(handler) {
  if (!governanceBus) return;
  governanceBus.off("CITY_GOVERNANCE_UPDATE", handler);
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. live/festivalGovernanceLiveSync.js — listener
//
function liveGovernanceSync() {
  const file = path.join(LIVE, "festivalGovernanceLiveSync.js");
  const marker = "// FE_FESTIVAL_GOVERNANCE_LIVE_SYNC";

  const block = `
// FE_FESTIVAL_GOVERNANCE_LIVE_SYNC
// Live sync for Festival Pavilion — roles, certifications, permissions

import { onGovernanceEvent } from "../core/governanceBus";

export function attachFestivalGovernanceLiveSync(callback) {
  // callback({ userId, roles, certifications, permissions }) → FE should update UI
  onGovernanceEvent((event) => {
    if (event?.payload?.module === "CITY") {
      callback({
        userId: event.payload.userId,
        roles: event.payload.roles,
        certifications: event.payload.certifications,
        permissions: event.payload.permissions
      });
    }
  });
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. core/useFestivalGovernanceLive.js — hook Reactowy
//
function liveGovernanceHook() {
  const file = path.join(CORE, "useFestivalGovernanceLive.js");
  const marker = "// FE_FESTIVAL_GOVERNANCE_HOOK";

  const block = `
// FE_FESTIVAL_GOVERNANCE_HOOK
// React hook for live governance updates

import { useEffect } from "react";
import { attachFestivalGovernanceLiveSync } from "../live/festivalGovernanceLiveSync";

export function useFestivalGovernanceLive(onGov) {
  useEffect(() => {
    attachFestivalGovernanceLiveSync((gov) => {
      onGov(gov);
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
    path.join(FE01, "ADMIN", "AdminJuryPanel.js"),
    path.join(FE01, "ADMIN", "AdminSchedulePanel.js"),
    path.join(FE01, "JURY", "JuryPanel.js"),
    path.join(FE01, "ANALYTICS", "FestivalCharts.js")
  ];

  const marker = "// FE_FESTIVAL_GOVERNANCE_INTEGRATION";

  const block = `
// FE_FESTIVAL_GOVERNANCE_INTEGRATION
import { useFestivalGovernanceLive } from "../core/useFestivalGovernanceLive";

useFestivalGovernanceLive((gov) => {
  if (typeof setGovernance === "function") setGovernance(gov);
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
  const file = path.join(FE01, "governance.bootstrap.js");
  const marker = "// FE_FESTIVAL_GOVERNANCE_BOOTSTRAP";

  const block = `
// FE_FESTIVAL_GOVERNANCE_BOOTSTRAP
// Attach Festival Pavilion to CityGovernanceEngine on FE side

import { registerCityGovernanceBus } from "./core/governanceBus";

export function bootstrapFestivalGovernance(cityGovernanceBus) {
  registerCityGovernanceBus(cityGovernanceBus);
  console.log("[FESTIVAL] Governance connected to CityGovernanceEngine");
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== Festival Pavilion FE Governance Integration Generator ===");

  ensureDir(CORE);
  ensureDir(LIVE);

  coreGovernanceBus();
  liveGovernanceSync();
  liveGovernanceHook();
  integratePanels();
  createBootstrap();

  console.log("=== DONE ===");
}

main();

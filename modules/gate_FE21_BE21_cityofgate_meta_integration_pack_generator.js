/**
 * CITYOF-GATE :: Meta‑Integration Pack Generator
 * Integruje Marketplace z:
 *  - City Clock
 *  - City Event Bus
 *  - City Reputation Engine
 *  - City Token Engine
 *  - City Role Engine
 *  - City Multi‑District Router
 *  - City AI Director (globalny)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log("📁 Utworzono:", dir);
  }
}

function writeFile(file) {
  const full = path.join(ROOT, file.path);
  if (fs.existsSync(full)) {
    console.log("⏭ Istnieje:", file.path);
    return;
  }
  ensureDir(full);
  fs.writeFileSync(full, file.content);
  console.log("📄 Utworzono:", file.path);
}

const FILES = [
  {
    path: "integration/city/cityClockBridge.js",
    content: `/**
 * CITY CLOCK BRIDGE
 * Globalny zegar miasta → Marketplace
 */

export const CityClockBridge = {
  syncTimeToMarketplace(state, cityClock) {
    state.globalTime = cityClock.now();
    return state;
  }
};`
  },
  {
    path: "integration/city/cityEventBusBridge.js",
    content: `/**
 * CITY EVENT BUS BRIDGE
 * Globalne eventy miasta → Marketplace
 */

export const CityEventBusBridge = {
  forwardEventToMarketplace(state, event) {
    if (!state.events) state.events = [];
    state.events.push({
      ...event,
      forwardedFromCity: true
    });
    return state;
  }
};`
  },
  {
    path: "integration/city/cityReputationBridge.js",
    content: `/**
 * CITY REPUTATION BRIDGE
 * Globalna reputacja użytkowników → Marketplace
 */

export const CityReputationBridge = {
  applyUserReputation(state, userId, reputationEngine) {
    const rep = reputationEngine.getReputation(userId);
    state.userReputation = { userId, value: rep };
    return state;
  }
};`
  },
  {
    path: "integration/city/cityTokenBridge.js",
    content: `/**
 * CITY TOKEN BRIDGE
 * Globalna ekonomia tokenów → Marketplace
 */

export const CityTokenBridge = {
  applyTokenBalance(state, userId, tokenEngine) {
    const balance = tokenEngine.getBalance(userId);
    state.tokenBalance = { userId, balance };
    return state;
  }
};`
  },
  {
    path: "integration/city/cityRoleBridge.js",
    content: `/**
 * CITY ROLE BRIDGE
 * Globalne role i progresja → Marketplace
 */

export const CityRoleBridge = {
  applyUserRole(state, userId, roleEngine) {
    const role = roleEngine.getRole(userId);
    state.userRole = { userId, role };
    return state;
  }
};`
  },
  {
    path: "integration/city/cityRouterBridge.js",
    content: `/**
 * CITY MULTI‑DISTRICT ROUTER BRIDGE
 * Routing między dzielnicami → Marketplace
 */

export const CityRouterBridge = {
  routeToMarketplace(request, router) {
    return router.route("marketplace", request);
  }
};`
  },
  {
    path: "integration/city/cityAIDirectorBridge.js",
    content: `/**
 * CITY AI DIRECTOR BRIDGE
 * Globalny AI Director → Marketplace
 */

export const CityAIDirectorBridge = {
  applyGlobalDirective(state, directive) {
    state.globalDirective = directive;
    return state;
  }
};`
  }
];

export function run() {
  console.log("🌐 CITYOF‑GATE Meta‑Integration Pack Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 CITYOF‑GATE Meta‑Integration Pack Generator — DONE");
}

run();

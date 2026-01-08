/**
 * CITYOF-GATE :: Marketplace 5.0 — Scenario Templates Generator (ESM)
 * FE21 / BE21 — Nowa Generacja
 *
 * Tworzy:
 *  - scenarios/marketplace/marketplaceScenarioTemplates.js
 *  - scenarios/marketplace/templates/dropScenario.js
 *  - scenarios/marketplace/templates/flashSaleScenario.js
 *  - scenarios/marketplace/templates/creatorEventScenario.js
 *  - scenarios/marketplace/templates/streetEventScenario.js
 *
 * Niczego nie nadpisuje.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

const FILES = [
  {
    path: "scenarios/marketplace/marketplaceScenarioTemplates.js",
    content: `/**
 * Marketplace Scenario Templates 5.0
 * Główna mapa scenariuszy Marketplace dla Scenario Engine.
 */

export const MarketplaceScenarioTemplates = {
  drop: "dropScenario",
  flashSale: "flashSaleScenario",
  creatorEvent: "creatorEventScenario",
  streetEvent: "streetEventScenario"
};`
  },

  {
    path: "scenarios/marketplace/templates/dropScenario.js",
    content: `/**
 * Drop Scenario Template 5.0
 */

export const dropScenario = {
  name: "Marketplace Drop Scenario",
  steps: [
    { action: "loadCreators" },
    { action: "loadItems" },
    { action: "prepareDrop" },
    { action: "triggerDrop" },
    { action: "syncStreet" },
    { action: "renderVisualizer" }
  ]
};`
  },

  {
    path: "scenarios/marketplace/templates/flashSaleScenario.js",
    content: `/**
 * Flash Sale Scenario Template 5.0
 */

export const flashSaleScenario = {
  name: "Marketplace Flash Sale Scenario",
  steps: [
    { action: "loadItems" },
    { action: "applyDiscounts" },
    { action: "triggerFlashSale" },
    { action: "syncStreet" },
    { action: "renderVisualizer" }
  ]
};`
  },

  {
    path: "scenarios/marketplace/templates/creatorEventScenario.js",
    content: `/**
 * Creator Event Scenario Template 5.0
 */

export const creatorEventScenario = {
  name: "Marketplace Creator Event Scenario",
  steps: [
    { action: "loadCreator" },
    { action: "loadCreatorItems" },
    { action: "triggerCreatorEvent" },
    { action: "syncStreet" },
    { action: "renderVisualizer" }
  ]
};`
  },

  {
    path: "scenarios/marketplace/templates/streetEventScenario.js",
    content: `/**
 * Street Event Scenario Template 5.0
 */

export const streetEventScenario = {
  name: "Marketplace Street Event Scenario",
  steps: [
    { action: "loadStreet" },
    { action: "prepareStreetEvent" },
    { action: "triggerStreetEvent" },
    { action: "syncStreet" },
    { action: "renderVisualizer" }
  ]
};`
  }
];

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

export function run() {
  console.log("🎬 Marketplace Scenario Templates Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Scenario Templates Generator — DONE");
}

run();

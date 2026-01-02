/**
 * FAZA 4C — CITY LEGACY REMAP GENERATOR
 *
 * Przenosi moduły z LEGACY do nowej architektury:
 *  - backend/BE-XX__Name/ (pełne warstwy)
 *  - apps/FE-XX__Name/    (pełne warstwy)
 *
 * Zasada: każdy moduł ma mieć wszystko na maxa (szkielet),
 * a charakter dzielnicy wynika z nazwy.
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BACKEND = path.join(ROOT, "backend");
const APPS = path.join(ROOT, "apps");

// Lista modułów z LEGACY (kanon miasta)
const MODULES = [
  { id: "BE-01", name: "Festival_Pavilion" },
  { id: "BE-02", name: "Finance_And_Admin" },
  { id: "BE-03", name: "Community_And_Social" },
  { id: "BE-04", name: "Innovation_And_Business" },
  { id: "BE-05", name: "Education_And_DAO" },
  { id: "BE-06", name: "DAO_Town_Hall" },
  { id: "BE-07", name: "Policy_Engine_RBAC" },
  { id: "BE-08", name: "Config_IDs_And_Flags" },
  { id: "BE-09", name: "Core_Audit" },
  { id: "BE-13", name: "Grants_Office" },
  { id: "BE-15", name: "Budget_Bank" },
  { id: "BE-16", name: "Admin_Tower" },
  { id: "BE-17", name: "City_Hall" },
  { id: "BE-18", name: "Media_Tower" },
  { id: "BE-19", name: "Knowledge_Hub" },
  { id: "BE-20", name: "Profile_Console" },
  { id: "BE-21", name: "Marketplace" },
  { id: "BE-22", name: "Stream_Square" },
  { id: "BE-23", name: "Culture_Gallery" },
  { id: "BE-24", name: "Innovation_Hub" },
  { id: "BE-25", name: "Treasure_Vault" },
  { id: "BE-26", name: "Wellness_Garden" },
  { id: "BE-27", name: "Sports_Arena" },
  { id: "BE-28", name: "Business_District" },
  { id: "BE-29", name: "Grants_Office" },
  { id: "BE-30", name: "DAO_Town_Hall" },
  { id: "BE-32", name: "Volunteer_Center" },
  { id: "BE-33", name: "Marketplace_Street" },
  { id: "BE-34", name: "Admin_Tower" },
  { id: "BE-35", name: "Governance_Dashboard" },
  { id: "BE-36", name: "Citizen_Console" },
  { id: "BE-37", name: "Immersive_VR_Layer" },
  { id: "BE-38", name: "AI_Companion" },
  { id: "BE-39", name: "Treasure_Vault" },
  { id: "BE-40", name: "Innovation_Hub" },
  { id: "BE-41", name: "Culture_Gallery" },
  { id: "BE-42", name: "Sports_Arena" },
  { id: "BE-43", name: "Wellness_Garden" },
  { id: "BE-44", name: "Volunteer_Center" },
  { id: "BE-45", name: "Community_House" },
  { id: "BE-46", name: "DAO_Town_Hall" },
  { id: "BE-47", name: "Grants_Office" },
  { id: "BE-48", name: "Business_District" },
  { id: "BE-49", name: "Budget_Bank" },
  { id: "BE-50", name: "Admin_Tower" },
  { id: "BE-51", name: "Education_And_DAO" },
  { id: "BE-52", name: "Festival_Hub" },
  { id: "BE-53", name: "Media_Tower" },
  { id: "BE-54", name: "Studio_Hub" }
];

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeIfMissing(file, content) {
  ensureDir(path.dirname(file));
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, content);
    console.log("📄 Utworzono:", path.relative(ROOT, file));
  } else {
    console.log("⏭  Istnieje:", path.relative(ROOT, file));
  }
}

function toTitle(name) {
  return name.replace(/_/g, " ");
}

function createBackendModule(mod) {
  const dirName = `${mod.id}__${mod.name}`;
  const base = path.join(BACKEND, dirName);

  // Główne foldery
  const apiDir = path.join(base, "api");
  const coreDir = path.join(base, "core");
  const eventsDir = path.join(base, "events");
  const lifeDir = path.join(base, "life");
  const configDir = path.join(base, "config");
  const diagDir = path.join(base, "diagnostics");

  ensureDir(base);
  ensureDir(apiDir);
  ensureDir(coreDir);
  ensureDir(eventsDir);
  ensureDir(lifeDir);
  ensureDir(configDir);
  ensureDir(diagDir);

  // index.js
  writeIfMissing(
    path.join(base, "index.js"),
    `import express from "express";
import { ${mod.id.replace("-", "_")}Api } from "./api/${mod.id}Api.js";

export const ${mod.id.replace("-", "_")}Module = express.Router();
${mod.id.replace("-", "_")}Module.use("/${mod.id.toLowerCase()}", ${mod.id.replace("-", "_")}Api);
`
  );

  // api/BE-XXApi.js
  writeIfMissing(
    path.join(apiDir, `${mod.id}Api.js`),
    `import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const ${mod.id.replace("-", "_")}Api = express.Router();

${mod.id.replace("-", "_")}Api.get("/status", (req, res) => {
  res.json(getStatus());
});
`
  );

  // core/index.js
  writeIfMissing(
    path.join(coreDir, "index.js"),
    `// Core logic for ${toTitle(mod.name)} (${mod.id})
// Tu wchodzi logika dzielnicy.
`
  );

  // events/emitters.js
  writeIfMissing(
    path.join(eventsDir, "emitters.js"),
    `// Emittery zdarzeń dla ${toTitle(mod.name)} (${mod.id})
// Przykład: emitEvent("event.type", payload);
`
  );

  // events/listeners.js
  writeIfMissing(
    path.join(eventsDir, "listeners.js"),
    `// Listener'y zdarzeń dla ${toTitle(mod.name)} (${mod.id})
// Tu podpinamy się pod EventBus / Life Engine.
`
  );

  // life/reactions.js
  writeIfMissing(
    path.join(lifeDir, "reactions.js"),
    `// Reakcje Life Engine na zdarzenia z ${toTitle(mod.name)} (${mod.id})
export function getReactions() {
  return [];
}
`
  );

  // life/notifications.js
  writeIfMissing(
    path.join(lifeDir, "notifications.js"),
    `// Powiadomienia dzielnicy ${toTitle(mod.name)} (${mod.id})
export function mapEventToNotification(event) {
  return null;
}
`
  );

  // life/mapSignals.js
  writeIfMissing(
    path.join(lifeDir, "mapSignals.js"),
    `// Mapowanie zdarzeń na glow kafli dla ${toTitle(mod.name)} (${mod.id})
export function mapEventToTileSignal(event) {
  return null;
}
`
  );

  // config/metadata.json
  writeIfMissing(
    path.join(configDir, "metadata.json"),
    JSON.stringify(
      {
        id: mod.id,
        name: mod.name,
        title: toTitle(mod.name),
        role: "district",
        districtType: inferDistrictType(mod),
        createdFrom: "LEGACY_2025-12-30",
        version: 1
      },
      null,
      2
    )
  );

  // diagnostics/status.js
  writeIfMissing(
    path.join(diagDir, "status.js"),
    `export function getStatus() {
  return {
    ok: true,
    module: "${mod.id}__${mod.name}",
    ts: Date.now()
  };
}
`
  );
}

function createFrontendModule(mod) {
  const dirName = `${mod.id}__${mod.name}`;
  const base = path.join(APPS, dirName);

  const hooksDir = path.join(base, "hooks");
  const stylesDir = path.join(base, "styles");

  ensureDir(base);
  ensureDir(hooksDir);
  ensureDir(stylesDir);

  // Panel.js
  writeIfMissing(
    path.join(base, "Panel.js"),
    `import React from "react";

export function ${mod.id.replace("-", "_")}Panel() {
  return (
    <div style={{ padding: 20 }}>
      <h2>${toTitle(mod.name)}</h2>
      <p>To jest główny panel dzielnicy ${toTitle(mod.name)} (${mod.id}).</p>
    </div>
  );
}
`
  );

  // List.js
  writeIfMissing(
    path.join(base, "List.js"),
    `import React from "react";

export function ${mod.id.replace("-", "_")}List() {
  return <div>Lista elementów w dzielnicy ${toTitle(mod.name)} (${mod.id}).</div>;
}
`
  );

  // Details.js
  writeIfMissing(
    path.join(base, "Details.js"),
    `import React from "react";

export function ${mod.id.replace("-", "_")}Details() {
  return <div>Szczegóły elementu w dzielnicy ${toTitle(mod.name)} (${mod.id}).</div>;
}
`
  );

  // Notifications.js
  writeIfMissing(
    path.join(base, "Notifications.js"),
    `import React from "react";

export function ${mod.id.replace("-", "_")}Notifications() {
  return null; // Tu można podpiąć powiadomienia dzielnicy.
}
`
  );

  // Glow.js
  writeIfMissing(
    path.join(base, "Glow.js"),
    `import { useTileGlow } from "../FE-00__City/MAP/CityMapAnimations";

// Hook / helper do glow dla kafla tej dzielnicy.
export function use${mod.id.replace("-", "_")}Glow(tileId) {
  return useTileGlow(tileId);
}
`
  );

  // hooks/useDistrictEvents.js
  writeIfMissing(
    path.join(hooksDir, "useDistrictEvents.js"),
    `// Hook do subskrypcji zdarzeń dzielnicy ${toTitle(mod.name)} (${mod.id})
export function useDistrictEvents() {
  return [];
}
`
  );

  // hooks/useDistrictData.js
  writeIfMissing(
    path.join(hooksDir, "useDistrictData.js"),
    `// Hook do danych dzielnicy ${toTitle(mod.name)} (${mod.id})
export function useDistrictData() {
  return { items: [] };
}
`
  );

  // styles/index.css
  writeIfMissing(
    path.join(stylesDir, "index.css"),
    `/* Style premium A1 dla dzielnicy ${toTitle(mod.name)} (${mod.id}) */
.${mod.id.toLowerCase()}-panel {
  background: rgba(255, 255, 255, 0.96);
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.04);
}
`
  );

  // metadata.json
  writeIfMissing(
    path.join(base, "metadata.json"),
    JSON.stringify(
      {
        id: mod.id,
        name: mod.name,
        title: toTitle(mod.name),
        districtType: inferDistrictType(mod),
        createdFrom: "LEGACY_2025-12-30",
        version: 1
      },
      null,
      2
    )
  );
}

function inferDistrictType(mod) {
  const n = mod.name.toLowerCase();
  if (n.includes("festival")) return "festival";
  if (n.includes("marketplace")) return "marketplace";
  if (n.includes("finance") || n.includes("budget") || n.includes("bank")) return "finance";
  if (n.includes("dao") || n.includes("governance") || n.includes("policy")) return "governance";
  if (n.includes("media") || n.includes("stream")) return "media";
  if (n.includes("culture") || n.includes("gallery")) return "culture";
  if (n.includes("sports")) return "sports";
  if (n.includes("wellness")) return "wellness";
  if (n.includes("innovation") || n.includes("business")) return "innovation";
  if (n.includes("treasure")) return "treasure";
  if (n.includes("education") || n.includes("knowledge")) return "education";
  if (n.includes("volunteer") || n.includes("community")) return "community";
  return "generic";
}

console.log("🏙️ FAZA 4C — CITY LEGACY REMAP START...");

ensureDir(BACKEND);
ensureDir(APPS);

for (const mod of MODULES) {
  console.log(`\n🔹 REMAP: ${mod.id}__${mod.name}`);
  createBackendModule(mod);
  createFrontendModule(mod);
}

console.log("\n🎉 FAZA 4C — CITY LEGACY REMAP ZAKOŃCZONY.");

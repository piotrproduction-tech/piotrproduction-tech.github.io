/**
 * CITYOF‑GATE :: CITY ENGINE PATCHER 5.1
 * Korekta: Governance → Autonomy
 *
 * Zmienia:
 *  - CityGovernanceEngine → CityAutonomyEngine
 *  - city.governance → city.autonomy
 *  - dashboard sekcję "CITY GOVERNANCE" → "CITY AUTONOMY"
 *
 * Patchuje:
 *  - cityIntelligenceEngines.js
 *  - cityGovernanceEngine.js → cityAutonomyEngine.js
 *  - cityofgate_ascii_dashboard.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

const FILES = {
  intelligence: "integration/city/cityIntelligenceEngines.js",
  dashboard: "tools/cityofgate_ascii_dashboard.js",
  governanceOld: "integration/city/cityGovernanceEngine.js",
  autonomyNew: "integration/city/cityAutonomyEngine.js"
};

function load(file) {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) return null;
  return { full, content: fs.readFileSync(full, "utf8") };
}

function save(file, content) {
  fs.writeFileSync(file, content, "utf8");
  console.log("✔ Zapisano:", file.replace(ROOT, ""));
}

// 1. Przeniesienie pliku governance → autonomy
{
  const oldPath = path.join(ROOT, FILES.governanceOld);
  const newPath = path.join(ROOT, FILES.autonomyNew);

  if (fs.existsSync(oldPath)) {
    const content = fs.readFileSync(oldPath, "utf8")
      .replace(/CityGovernanceEngine/g, "CityAutonomyEngine")
      .replace(/city\.governance/g, "city.autonomy");

    fs.writeFileSync(newPath, content, "utf8");
    fs.unlinkSync(oldPath);

    console.log("✔ Przeniesiono governance → autonomy");
  } else {
    console.log("⏭ Brak starego pliku governance — pomijam");
  }
}

// 2. Patch: cityIntelligenceEngines.js
{
  const file = load(FILES.intelligence);
  if (file) {
    let c = file.content;

    // Import
    c = c.replace(
      /import { CityGovernanceEngine } from ".\/cityGovernanceEngine.js";/g,
      `import { CityAutonomyEngine } from "./cityAutonomyEngine.js";`
    );

    // Wywołanie
    c = c.replace(
      /CityGovernanceEngine\.tick\(city, world\)/g,
      `CityAutonomyEngine.tick(city, world)`
    );

    // Zmiana pola
    c = c.replace(/city\.governance/g, "city.autonomy");

    save(file.full, c);
  }
}

// 3. Patch: dashboard
{
  const file = load(FILES.dashboard);
  if (file) {
    let c = file.content;

    // Nagłówek
    c = c.replace(/CITY GOVERNANCE/g, "CITY AUTONOMY");

    // Pola
    c = c.replace(/city\.governance/g, "city.autonomy");

    save(file.full, c);
  }
}

console.log("🏁 CITY ENGINE PATCHER 5.1 — ZAKOŃCZONO");

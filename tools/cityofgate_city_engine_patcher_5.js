/**
 * CITYOF‑GATE :: CITY ENGINE PATCHER 5.0
 * "Prawo, Etyka, Rządzenie i Przeznaczenie"
 * Hybryda: Światło • Agora • Labirynt • Echoes
 *
 * Dodaje:
 *  - CityEthicsEngine
 *  - CityLawEngine
 *  - CityGovernanceEngine
 *  - CityDestinyEngine
 *
 * Patchuje:
 *  - cityIntelligenceEngines.js
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
  ethics: "integration/city/cityEthicsEngine.js",
  law: "integration/city/cityLawEngine.js",
  governance: "integration/city/cityGovernanceEngine.js",
  destiny: "integration/city/cityDestinyEngine.js"
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

function ensure(file, template) {
  const full = path.join(ROOT, file);
  if (fs.existsSync(full)) {
    console.log("⏭ Silnik już istnieje:", file);
    return;
  }
  fs.writeFileSync(full, template, "utf8");
  console.log("✔ Utworzono silnik:", file);
}

// 1. Szablony silników
const TEMPLATES = {
  ethics: `
export const CityEthicsEngine = {
  tick(city, world) {
    const harmony = city.harmony?.index ?? 0;
    const conflict = city.conflict?.risk ?? 0;

    city.ethics = {
      virtue: Number((harmony * 0.7).toFixed(2)),
      corruption: Number((conflict * 0.6).toFixed(2)),
      balance: Number((harmony - conflict).toFixed(2))
    };

    return city;
  }
};
`,

  law: `
export const CityLawEngine = {
  tick(city) {
    const virtue = city.ethics?.virtue ?? 0;
    const corruption = city.ethics?.corruption ?? 0;

    let doctrine = "Neutral Code";

    if (virtue > corruption) doctrine = "Law of Harmony";
    if (city.archetype === "FESTIWAL") doctrine = "Law of Light";
    if (city.archetype === "AGORA") doctrine = "Law of Agora";
    if (city.archetype === "LABIRYNT") doctrine = "Law of Trials";
    if (city.archetype === "CYTADELA") doctrine = "Law of Echoes";

    city.law = {
      doctrine,
      stability: Number((virtue - corruption).toFixed(2))
    };

    return city;
  }
};
`,

  governance: `
export const CityGovernanceEngine = {
  tick(city, world) {
    const cohesion = city.socialNetwork?.cohesion ?? 0;
    const conflict = city.conflict?.risk ?? 0;

    let decision = "Observe";

    if (cohesion > 0.6) decision = "Empower Community";
    if (conflict > 0.5) decision = "Stabilize Districts";
    if (city.law?.doctrine === "Law of Light") decision = "Initiate Festival Cycle";
    if (city.law?.doctrine === "Law of Trials") decision = "Begin Transformation Rites";

    city.governance = {
      decision,
      authority: Number((cohesion - conflict).toFixed(2))
    };

    return city;
  }
};
`,

  destiny: `
export const CityDestinyEngine = {
  tick(city) {
    const vision = city.futureVision ?? "The city rests.";
    const doctrine = city.law?.doctrine ?? "Neutral Code";

    let destiny = "Undefined Path";

    if (vision.includes("Festival")) destiny = "Era of Light";
    if (vision.includes("Agora")) destiny = "Era of Community";
    if (doctrine === "Law of Trials") destiny = "Era of Transformation";
    if (doctrine === "Law of Echoes") destiny = "Era of Resonance";

    city.destiny = destiny;
    return city;
  }
};
`
};

// 2. Tworzenie silników
ensure(FILES.ethics, TEMPLATES.ethics);
ensure(FILES.law, TEMPLATES.law);
ensure(FILES.governance, TEMPLATES.governance);
ensure(FILES.destiny, TEMPLATES.destiny);

// 3. Patch: cityIntelligenceEngines.js
{
  const file = load(FILES.intelligence);
  if (file) {
    let c = file.content;

    // Importy
    if (!c.includes("CityEthicsEngine"))
      c = `import { CityEthicsEngine } from "./cityEthicsEngine.js";\n` + c;

    if (!c.includes("CityLawEngine"))
      c = `import { CityLawEngine } from "./cityLawEngine.js";\n` + c;

    if (!c.includes("CityGovernanceEngine"))
      c = `import { CityGovernanceEngine } from "./cityGovernanceEngine.js";\n` + c;

    if (!c.includes("CityDestinyEngine"))
      c = `import { CityDestinyEngine } from "./cityDestinyEngine.js";\n` + c;

    // Wstrzyknięcie do CityBrainEngine
    c = c.replace(
      /CityFutureVisionEngine\.tick\(city, world\);?/,
      `CityFutureVisionEngine.tick(city, world);
    city = CityEthicsEngine.tick(city, world);
    city = CityLawEngine.tick(city, world);
    city = CityGovernanceEngine.tick(city, world);
    city = CityDestinyEngine.tick(city, world);`
    );

    save(file.full, c);
  }
}

// 4. Patch: dashboard
{
  const file = load(FILES.dashboard);
  if (file) {
    let c = file.content;

    if (!c.includes("CITY ETHICS")) {
      c += `
\n⚖️ CITY ETHICS
────────────────────────────────────────────────────────────
Virtue:         \${fmt(city.ethics?.virtue)}
Corruption:     \${fmt(city.ethics?.corruption)}
Balance:        \${fmt(city.ethics?.balance)}

📘 CITY LAW
────────────────────────────────────────────────────────────
Doctrine:       \${city.law?.doctrine}
Stability:      \${fmt(city.law?.stability)}

🏛 CITY GOVERNANCE
────────────────────────────────────────────────────────────
Decision:       \${city.governance?.decision}
Authority:      \${fmt(city.governance?.authority)}

✨ CITY DESTINY
────────────────────────────────────────────────────────────
Destiny:        \${city.destiny}\n`;
    }

    save(file.full, c);
  }
}

console.log("🏁 CITY ENGINE PATCHER 5.0 — ZAKOŃCZONO");

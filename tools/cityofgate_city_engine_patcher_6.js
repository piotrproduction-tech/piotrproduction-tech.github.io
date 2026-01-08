/**
 * CITYOF‑GATE :: CITY ENGINE PATCHER 6.0
 * "Gospodarka, Handel, Migracje i Dyplomacja"
 * Hybryda: Światło • Agora • Labirynt • Echoes
 *
 * Dodaje:
 *  - CityMacroEconomyEngine
 *  - CityTradeEngine
 *  - CityMigrationEngine
 *  - CityDiplomacyEngine
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
  macro: "integration/city/cityMacroEconomyEngine.js",
  trade: "integration/city/cityTradeEngine.js",
  migration: "integration/city/cityMigrationEngine.js",
  diplomacy: "integration/city/cityDiplomacyEngine.js"
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
  macro: `
export const CityMacroEconomyEngine = {
  tick(city, world) {
    const mood = city.cityMood ?? 0;
    const cohesion = city.socialNetwork?.cohesion ?? 0;
    const memory = city.collectiveMemorySize ?? 0;

    const gdp = Number(((mood * 2 + cohesion * 3 + memory / 100) / 10).toFixed(2));

    let cycle = "Stable";
    if (gdp > 15) cycle = "Boom";
    if (gdp < 5) cycle = "Recession";

    city.macroEconomy = {
      gdp,
      cycle
    };

    return city;
  }
};
`,

  trade: `
export const CityTradeEngine = {
  tick(city) {
    const archetype = city.archetype ?? "UNKNOWN";

    let goods = ["Basic Goods"];
    if (archetype === "FESTIWAL") goods = ["Light Tokens", "Festival Artifacts"];
    if (archetype === "AGORA") goods = ["Social Services", "Reputation Contracts"];
    if (archetype === "LABIRYNT") goods = ["Trial Relics", "Transformation Shards"];
    if (archetype === "CYTADELA") goods = ["Echo Artifacts", "Memory Crystals"];

    city.trade = {
      goods,
      volume: Number((goods.length * 1.5).toFixed(2))
    };

    return city;
  }
};
`,

  migration: `
export const CityMigrationEngine = {
  tick(city) {
    const harmony = city.harmony?.index ?? 0;
    const conflict = city.conflict?.risk ?? 0;

    const flow = Number((harmony - conflict).toFixed(2));

    city.migration = {
      inflow: flow > 0 ? flow : 0,
      outflow: flow < 0 ? Math.abs(flow) : 0
    };

    return city;
  }
};
`,

  diplomacy: `
export const CityDiplomacyEngine = {
  tick(city) {
    const archetype = city.archetype ?? "UNKNOWN";
    const cycle = city.macroEconomy?.cycle ?? "Stable";

    let stance = "Neutral";

    if (archetype === "FESTIWAL") stance = "Cultural Outreach";
    if (archetype === "AGORA") stance = "Cooperation";
    if (archetype === "LABIRYNT") stance = "Strategic Isolation";
    if (archetype === "CYTADELA") stance = "Memory Exchange";

    if (cycle === "Recession") stance = "Seek Alliances";

    city.diplomacy = {
      stance
    };

    return city;
  }
};
`
};

// 2. Tworzenie silników
ensure(FILES.macro, TEMPLATES.macro);
ensure(FILES.trade, TEMPLATES.trade);
ensure(FILES.migration, TEMPLATES.migration);
ensure(FILES.diplomacy, TEMPLATES.diplomacy);

// 3. Patch: cityIntelligenceEngines.js
{
  const file = load(FILES.intelligence);
  if (file) {
    let c = file.content;

    if (!c.includes("CityMacroEconomyEngine"))
      c = `import { CityMacroEconomyEngine } from "./cityMacroEconomyEngine.js";\n` + c;

    if (!c.includes("CityTradeEngine"))
      c = `import { CityTradeEngine } from "./cityTradeEngine.js";\n` + c;

    if (!c.includes("CityMigrationEngine"))
      c = `import { CityMigrationEngine } from "./cityMigrationEngine.js";\n` + c;

    if (!c.includes("CityDiplomacyEngine"))
      c = `import { CityDiplomacyEngine } from "./cityDiplomacyEngine.js";\n` + c;

    c = c.replace(
      /CityDestinyEngine\.tick\(city, world\);?/,
      `CityDestinyEngine.tick(city, world);
    city = CityMacroEconomyEngine.tick(city, world);
    city = CityTradeEngine.tick(city, world);
    city = CityMigrationEngine.tick(city, world);
    city = CityDiplomacyEngine.tick(city, world);`
    );

    save(file.full, c);
  }
}

// 4. Patch: dashboard
{
  const file = load(FILES.dashboard);
  if (file) {
    let c = file.content;

    if (!c.includes("CITY ECONOMY")) {
      c += `
\n💰 CITY ECONOMY
────────────────────────────────────────────────────────────
GDP:            \${fmt(city.macroEconomy?.gdp)}
Cycle:          \${city.macroEconomy?.cycle}

📦 CITY TRADE
────────────────────────────────────────────────────────────
Goods:          \${city.trade?.goods?.join(", ")}
Volume:         \${fmt(city.trade?.volume)}

🚶 CITY MIGRATION
────────────────────────────────────────────────────────────
Inflow:         \${fmt(city.migration?.inflow)}
Outflow:        \${fmt(city.migration?.outflow)}

🌐 CITY DIPLOMACY
────────────────────────────────────────────────────────────
Stance:         \${city.diplomacy?.stance}\n`;
    }

    save(file.full, c);
  }
}

console.log("🏁 CITY ENGINE PATCHER 6.0 — ZAKOŃCZONO");

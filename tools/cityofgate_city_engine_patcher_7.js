/**
 * CITYOF‑GATE :: CITY ENGINE PATCHER 7.0
 * "Kultura, Sztuka i Rytuały 2.0"
 * Estetyka Hybrydowa: Światło • Agora • Labirynt • Echoes
 *
 * Dodaje:
 *  - CityArtEngine
 *  - CityRitualEvolutionEngine
 *  - CityCulturalWavesEngine
 *  - CitySymbolismEngine
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
  art: "integration/city/cityArtEngine.js",
  ritual: "integration/city/cityRitualEvolutionEngine.js",
  waves: "integration/city/cityCulturalWavesEngine.js",
  symbols: "integration/city/citySymbolismEngine.js"
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
  art: `
export const CityArtEngine = {
  tick(city) {
    const archetype = city.archetype ?? "UNKNOWN";
    const mood = city.cityMood ?? 0;

    let era = "Neutral Expression";

    if (archetype === "FESTIWAL") era = "Era of Radiant Light";
    if (archetype === "AGORA") era = "Era of Geometric Harmony";
    if (archetype === "LABIRYNT") era = "Era of Shadow Forms";
    if (archetype === "CYTADELA") era = "Era of Echo Abstraction";

    if (mood > 80) era += " — High Energy";
    if (mood < 20) era += " — Minimal Phase";

    city.art = { era };
    return city;
  }
};
`,

  ritual: `
export const CityRitualEvolutionEngine = {
  tick(city) {
    const memory = city.collectiveMemorySize ?? 0;

    let ritual = "Silent Gathering";

    if (memory > 500) ritual = "Rite of Echo Resonance";
    if (memory > 1500) ritual = "Festival of Light and Shadow";
    if (memory > 3000) ritual = "Grand Hybrid Ceremony";

    city.ritual = { ritual };
    return city;
  }
};
`,

  waves: `
export const CityCulturalWavesEngine = {
  tick(city) {
    const mood = city.cityMood ?? 0;
    const harmony = city.harmony?.index ?? 0;

    let wave = "Calm";

    if (mood > 70) wave = "Vibrant";
    if (harmony > 0.7) wave = "Unified";
    if (mood < 30) wave = "Introspective";

    city.culturalWave = wave;
    return city;
  }
};
`,

  symbols: `
export const CitySymbolismEngine = {
  tick(city) {
    const archetype = city.archetype ?? "UNKNOWN";

    let symbol = "Circle";

    if (archetype === "FESTIWAL") symbol = "Lantern";
    if (archetype === "AGORA") symbol = "Geometric Knot";
    if (archetype === "LABIRYNT") symbol = "Spiral Mask";
    if (archetype === "CYTADELA") symbol = "Echo Crystal";

    city.symbol = symbol;
    return city;
  }
};
`
};

// 2. Tworzenie silników
ensure(FILES.art, TEMPLATES.art);
ensure(FILES.ritual, TEMPLATES.ritual);
ensure(FILES.waves, TEMPLATES.waves);
ensure(FILES.symbols, TEMPLATES.symbols);

// 3. Patch: cityIntelligenceEngines.js
{
  const file = load(FILES.intelligence);
  if (file) {
    let c = file.content;

    if (!c.includes("CityArtEngine"))
      c = `import { CityArtEngine } from "./cityArtEngine.js";\n` + c;

    if (!c.includes("CityRitualEvolutionEngine"))
      c = `import { CityRitualEvolutionEngine } from "./cityRitualEvolutionEngine.js";\n` + c;

    if (!c.includes("CityCulturalWavesEngine"))
      c = `import { CityCulturalWavesEngine } from "./cityCulturalWavesEngine.js";\n` + c;

    if (!c.includes("CitySymbolismEngine"))
      c = `import { CitySymbolismEngine } from "./citySymbolismEngine.js";\n` + c;

    c = c.replace(
      /CityDiplomacyEngine\.tick\(city, world\);?/,
      `CityDiplomacyEngine.tick(city, world);
    city = CityArtEngine.tick(city, world);
    city = CityRitualEvolutionEngine.tick(city, world);
    city = CityCulturalWavesEngine.tick(city, world);
    city = CitySymbolismEngine.tick(city, world);`
    );

    save(file.full, c);
  }
}

// 4. Patch: dashboard
{
  const file = load(FILES.dashboard);
  if (file) {
    let c = file.content;

    if (!c.includes("CITY ART")) {
      c += `
\n🎨 CITY ART
────────────────────────────────────────────────────────────
Era:            \${city.art?.era}

🔔 CITY RITUALS
────────────────────────────────────────────────────────────
Ritual:         \${city.ritual?.ritual}

🌊 CULTURAL WAVES
────────────────────────────────────────────────────────────
Wave:           \${city.culturalWave}

🜁 CITY SYMBOLISM
────────────────────────────────────────────────────────────
Symbol:         \${city.symbol}\n`;
    }

    save(file.full, c);
  }
}

console.log("🏁 CITY ENGINE PATCHER 7.0 — ZAKOŃCZONO");

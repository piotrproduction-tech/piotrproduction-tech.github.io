/**
 * CITYOF‑GATE :: CITY ENGINE PATCHER 4.0
 * "Mitologia, Legendy i Wizje Przyszłości"
 *
 * Dodaje:
 *  - CityMythEngine
 *  - CityLegendsEngine
 *  - CityCollectiveMemoryEngine
 *  - CityFutureVisionEngine
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
  myth: "integration/city/cityMythEngine.js",
  legends: "integration/city/cityLegendsEngine.js",
  memory: "integration/city/cityCollectiveMemoryEngine.js",
  future: "integration/city/cityFutureVisionEngine.js"
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
  myth: `
export const CityMythEngine = {
  tick(city, world) {
    const mood = city.cityMood ?? 0;
    const archetype = city.archetype ?? "UNKNOWN";

    let myth = "The Silent Streets";
    if (archetype === "FESTIWAL") myth = "The Birth of Light";
    if (archetype === "AGORA") myth = "The First Gathering";
    if (archetype === "LABIRYNT") myth = "The Trial of Shadows";
    if (archetype === "CYTADELA") myth = "The Walls of Echoes";

    city.myth = {
      name: myth,
      moodStamp: mood
    };

    return city;
  }
};
`,

  legends: `
export const CityLegendsEngine = {
  tick(city, world) {
    const rep = city.userReputation?.value ?? 0;
    const events = world.events ?? 0;

    let legend = "A wanderer walks the streets.";
    if (rep > 500) legend = "U1, the Bearer of Light.";
    if (events > 10000) legend = "The Echoes return once more.";

    city.legend = legend;
    return city;
  }
};
`,

  memory: `
export const CityCollectiveMemoryEngine = {
  memory: [],
  tick(city, world) {
    const entry = {
      timestamp: Date.now(),
      archetype: city.archetype,
      mood: city.cityMood,
      events: world.events
    };

    this.memory.push(entry);
    if (this.memory.length > 2000) this.memory.shift();

    city.collectiveMemorySize = this.memory.length;
    return city;
  }
};
`,

  future: `
export const CityFutureVisionEngine = {
  tick(city) {
    const mood = city.cityMood ?? 0;
    const dream = city.dream?.type ?? "UNKNOWN";

    let vision = "The city rests.";
    if (mood > 80) vision = "A Great Festival approaches.";
    if (dream === "GRAND_AGORA") vision = "The Agora will rise again.";
    if (dream === "FESTIVAL_OF_LIGHTS") vision = "The Lantern Tide is coming.";

    city.futureVision = vision;
    return city;
  }
};
`
};

// 2. Tworzenie silników
ensure(FILES.myth, TEMPLATES.myth);
ensure(FILES.legends, TEMPLATES.legends);
ensure(FILES.memory, TEMPLATES.memory);
ensure(FILES.future, TEMPLATES.future);

// 3. Patch: cityIntelligenceEngines.js
{
  const file = load(FILES.intelligence);
  if (file) {
    let c = file.content;

    // Importy
    if (!c.includes("CityMythEngine"))
      c = `import { CityMythEngine } from "./cityMythEngine.js";\n` + c;

    if (!c.includes("CityLegendsEngine"))
      c = `import { CityLegendsEngine } from "./cityLegendsEngine.js";\n` + c;

    if (!c.includes("CityCollectiveMemoryEngine"))
      c = `import { CityCollectiveMemoryEngine } from "./cityCollectiveMemoryEngine.js";\n` + c;

    if (!c.includes("CityFutureVisionEngine"))
      c = `import { CityFutureVisionEngine } from "./cityFutureVisionEngine.js";\n` + c;

    // Wstrzyknięcie do CityBrainEngine
    c = c.replace(
      /CityDreamEngine\.tick\(city, world\);?/,
      `CityDreamEngine.tick(city, world);
    city = CityMythEngine.tick(city, world);
    city = CityLegendsEngine.tick(city, world);
    city = CityCollectiveMemoryEngine.tick(city, world);
    city = CityFutureVisionEngine.tick(city, world);`
    );

    save(file.full, c);
  }
}

// 4. Patch: dashboard
{
  const file = load(FILES.dashboard);
  if (file) {
    let c = file.content;

    if (!c.includes("CITY MYTHOLOGY")) {
      c += `
\n📜 CITY MYTHOLOGY
────────────────────────────────────────────────────────────
Myth:           \${city.myth?.name}
Mood Stamp:     \${fmt(city.myth?.moodStamp)}

🏺 CITY LEGENDS
────────────────────────────────────────────────────────────
Legend:         \${city.legend}

🧠 COLLECTIVE MEMORY
────────────────────────────────────────────────────────────
Entries:        \${city.collectiveMemorySize}

🔮 FUTURE VISION
────────────────────────────────────────────────────────────
Prophecy:       \${city.futureVision}\n`;
    }

    save(file.full, c);
  }
}

console.log("🏁 CITY ENGINE PATCHER 4.0 — ZAKOŃCZONO");

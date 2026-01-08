/**
 * CITYOF‑GATE :: CITY ENGINE PATCHER 2.0
 * "Dusza Miasta" — Archetypy Społeczne
 *
 * Dodaje:
 *  - CityMemoryGraphEngine
 *  - CityArchetypeEvolutionEngine
 *  - CityEmotionalWeatherEngine
 *  - CityRitualsEngine
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
  memoryGraph: "integration/city/cityMemoryGraphEngine.js",
  archetype: "integration/city/cityArchetypeEvolutionEngine.js",
  weather: "integration/city/cityEmotionalWeatherEngine.js",
  rituals: "integration/city/cityRitualsEngine.js"
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
  memoryGraph: `
export const CityMemoryGraphEngine = {
  graph: [],
  tick(city, world) {
    this.graph.push({
      timestamp: Date.now(),
      mood: city.cityMood,
      events: world.events,
      archetype: city.archetype
    });
    if (this.graph.length > 5000) this.graph.shift();
    city.memoryGraphSize = this.graph.length;
    return city;
  }
};
`,

  archetype: `
export const CityArchetypeEvolutionEngine = {
  tick(city) {
    const mood = city.cityMood ?? 0;
    const joy = city.emotions?.joy ?? 0;
    const anxiety = city.emotions?.anxiety ?? 0;

    if (joy > anxiety && mood > 80) city.archetype = "FESTIWAL";
    else if (anxiety > joy) city.archetype = "CYTADELA";
    else if (mood < 20) city.archetype = "LABIRYNT";
    else city.archetype = "AGORA";

    return city;
  }
};
`,

  weather: `
export const CityEmotionalWeatherEngine = {
  tick(city) {
    const joy = city.emotions?.joy ?? 0;
    const anxiety = city.emotions?.anxiety ?? 0;

    const intensity = Math.abs(joy - anxiety) / 100;
    const front = joy > anxiety ? "HOPE_WAVE" : "ANXIETY_FRONT";

    city.emotionalWeather = {
      front,
      intensity: Number(intensity.toFixed(2)),
      stability: Number((1 - intensity).toFixed(2))
    };

    return city;
  }
};
`,

  rituals: `
export const CityRitualsEngine = {
  tick(city, world) {
    const events = world.events;

    if (events % 5000 === 0) {
      city.ritual = {
        name: "Festival of Echoes",
        boost: {
          joy: 20,
          harmony: 10
        }
      };
      city.emotions.joy += 20;
    }

    return city;
  }
};
`
};

// 2. Tworzenie silników
ensure(FILES.memoryGraph, TEMPLATES.memoryGraph);
ensure(FILES.archetype, TEMPLATES.archetype);
ensure(FILES.weather, TEMPLATES.weather);
ensure(FILES.rituals, TEMPLATES.rituals);

// 3. Patch: cityIntelligenceEngines.js
{
  const file = load(FILES.intelligence);
  if (file) {
    let c = file.content;

    // Importy
    if (!c.includes("CityMemoryGraphEngine"))
      c = `import { CityMemoryGraphEngine } from "./cityMemoryGraphEngine.js";\n` + c;

    if (!c.includes("CityArchetypeEvolutionEngine"))
      c = `import { CityArchetypeEvolutionEngine } from "./cityArchetypeEvolutionEngine.js";\n` + c;

    if (!c.includes("CityEmotionalWeatherEngine"))
      c = `import { CityEmotionalWeatherEngine } from "./cityEmotionalWeatherEngine.js";\n` + c;

    if (!c.includes("CityRitualsEngine"))
      c = `import { CityRitualsEngine } from "./cityRitualsEngine.js";\n` + c;

    // Wstrzyknięcie do CityBrainEngine
    c = c.replace(
      /CityNarrativeEngine\.tick\(city, world\);?/,
      `CityNarrativeEngine.tick(city, world);
    city = CityMemoryGraphEngine.tick(city, world);
    city = CityArchetypeEvolutionEngine.tick(city, world);
    city = CityEmotionalWeatherEngine.tick(city, world);
    city = CityRitualsEngine.tick(city, world);`
    );

    save(file.full, c);
  }
}

// 4. Patch: dashboard
{
  const file = load(FILES.dashboard);
  if (file) {
    let c = file.content;

    if (!c.includes("EMOTIONAL WEATHER")) {
      c += `
\n🌤 EMOTIONAL WEATHER
────────────────────────────────────────────────────────────
Front:          \${city.emotionalWeather?.front}
Intensity:      \${fmt(city.emotionalWeather?.intensity)}
Stability:      \${fmt(city.emotionalWeather?.stability)}

📚 MEMORY GRAPH
────────────────────────────────────────────────────────────
Entries:        \${city.memoryGraphSize}

🏛 ARCHETYPE
────────────────────────────────────────────────────────────
Current:        \${city.archetype}

🎉 RITUALS
────────────────────────────────────────────────────────────
Active:         \${city.ritual?.name ?? "None"}\n`;
    }

    save(file.full, c);
  }
}

console.log("🏁 CITY ENGINE PATCHER 2.0 — ZAKOŃCZONO");

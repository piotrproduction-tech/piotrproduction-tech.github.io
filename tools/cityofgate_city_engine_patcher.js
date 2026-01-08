/**
 * CITYOF‑GATE :: CITY ENGINE PATCHER 1.0
 *
 * Automatycznie podłącza:
 *  - CityEmotionEngine
 *  - CityCultureEngine
 *  - CityIdentityEngine
 *  - CityNarrativeEngine
 *
 * Modyfikuje:
 *  - cityIntelligenceEngines.js
 *  - hyperOrchestratorBridge.js
 *  - cityofgate_ascii_dashboard.js
 *
 * Tworzy brakujące pliki silników.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

// Ścieżki plików
const FILES = {
  intelligence: "integration/city/cityIntelligenceEngines.js",
  orchestrator: "integration/marketplace/hyperOrchestratorBridge.js",
  dashboard: "tools/cityofgate_ascii_dashboard.js",
  emotion: "integration/city/cityEmotionEngine.js",
  culture: "integration/city/cityCultureEngine.js",
  identity: "integration/city/cityIdentityEngine.js",
  narrative: "integration/city/cityNarrativeEngine.js"
};

// Helper
function load(file) {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) return null;
  return { full, content: fs.readFileSync(full, "utf8") };
}

function save(file, content) {
  fs.writeFileSync(file, content, "utf8");
  console.log("✔ Zapisano:", file.replace(ROOT, ""));
}

// 1. Tworzenie silników, jeśli nie istnieją
function ensureEngine(file, template) {
  const full = path.join(ROOT, file);
  if (fs.existsSync(full)) {
    console.log("⏭ Silnik już istnieje:", file);
    return;
  }
  fs.writeFileSync(full, template, "utf8");
  console.log("✔ Utworzono silnik:", file);
}

// Szablony silników
const TEMPLATES = {
  emotion: `
export const CityEmotionEngine = {
  tick(city, world) {
    const emotions = {
      joy: world.social.mood * 0.5,
      anxiety: (1 - world.social.trust) * 5,
      excitement: Math.min(world.events / 100, 50),
      fatigue: world.social.tension * 2,
      hope: city.userReputation?.value > 500 ? 20 : 0
    };
    const dominant = Object.entries(emotions).sort((a,b)=>b[1]-a[1])[0][0];
    city.emotions = emotions;
    city.emotionalState = dominant.toUpperCase();
    return city;
  }
};
`,

  culture: `
export const CityCultureEngine = {
  tick(city, world) {
    city.culture = {
      festivalIntensity: world.events / 100,
      socialHarmony: world.social.trust,
      chaosFactor: world.social.tension
    };
    return city;
  }
};
`,

  identity: `
export const CityIdentityEngine = {
  tick(city) {
    const mood = city.cityMood ?? 0;
    const joy = city.emotions?.joy ?? 0;
    const anxiety = city.emotions?.anxiety ?? 0;

    if (joy > anxiety && mood > 50) city.archetype = "CELEBRATION_CITY";
    else if (anxiety > joy) city.archetype = "ANXIOUS_CITY";
    else city.archetype = "NEUTRAL_CITY";

    return city;
  }
};
`,

  narrative: `
export const CityNarrativeEngine = {
  tick(city) {
    const archetype = city.archetype ?? "UNKNOWN";
    const mood = city.cityMood ?? 0;

    city.story = \`The city breathes as a \${archetype}, with mood level \${mood}.\`;
    return city;
  }
};
`
};

// 2. Tworzenie brakujących silników
ensureEngine(FILES.emotion, TEMPLATES.emotion);
ensureEngine(FILES.culture, TEMPLATES.culture);
ensureEngine(FILES.identity, TEMPLATES.identity);
ensureEngine(FILES.narrative, TEMPLATES.narrative);

// 3. Patch: cityIntelligenceEngines.js
{
  const file = load(FILES.intelligence);
  if (file) {
    let c = file.content;

    // Importy
    if (!c.includes("CityEmotionEngine")) {
      c = `import { CityEmotionEngine } from "./cityEmotionEngine.js";\n` + c;
    }
    if (!c.includes("CityCultureEngine")) {
      c = `import { CityCultureEngine } from "./cityCultureEngine.js";\n` + c;
    }
    if (!c.includes("CityIdentityEngine")) {
      c = `import { CityIdentityEngine } from "./cityIdentityEngine.js";\n` + c;
    }
    if (!c.includes("CityNarrativeEngine")) {
      c = `import { CityNarrativeEngine } from "./cityNarrativeEngine.js";\n` + c;
    }

    // Wstrzyknięcie do CityBrainEngine
    c = c.replace(
      /loadBalancer\.balance\(city\);/,
      `loadBalancer.balance(city);
    city = CityEmotionEngine.tick(city, world);
    city = CityCultureEngine.tick(city, world);
    city = CityIdentityEngine.tick(city, world);
    city = CityNarrativeEngine.tick(city, world);`
    );

    save(file.full, c);
  }
}

// 4. Patch: dashboard
{
  const file = load(FILES.dashboard);
  if (file) {
    let c = file.content;

    if (!c.includes("CITY EMOTIONS")) {
      c += `
\n💓 CITY EMOTIONS
────────────────────────────────────────────────────────────
Joy:            \${fmt(city.emotions?.joy)}
Anxiety:        \${fmt(city.emotions?.anxiety)}
Excitement:     \${fmt(city.emotions?.excitement)}
Fatigue:        \${fmt(city.emotions?.fatigue)}
Hope:           \${fmt(city.emotions?.hope)}
Dominant:       \${city.emotionalState}\n`;
    }

    save(file.full, c);
  }
}

console.log("🏁 CITY ENGINE PATCHER 1.0 — ZAKOŃCZONO");

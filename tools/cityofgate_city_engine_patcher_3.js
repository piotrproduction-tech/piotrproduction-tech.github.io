/**
 * CITYOF‑GATE :: CITY ENGINE PATCHER 3.0
 * "Społeczna Dynamika i Marzenia Miasta"
 *
 * Dodaje:
 *  - CitySocialNetworkEngine
 *  - CityConflictEngine
 *  - CityHarmonyEngine
 *  - CityDreamEngine (marzenia społeczne)
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
  social: "integration/city/citySocialNetworkEngine.js",
  conflict: "integration/city/cityConflictEngine.js",
  harmony: "integration/city/cityHarmonyEngine.js",
  dreams: "integration/city/cityDreamEngine.js"
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
  social: `
export const CitySocialNetworkEngine = {
  tick(city, world) {
    const trust = world.social.trust ?? 0;
    const tension = world.social.tension ?? 0;

    city.socialNetwork = {
      cohesion: Number((trust * 0.8).toFixed(2)),
      fragmentation: Number((tension * 0.7).toFixed(2)),
      pulse: Number(((trust - tension) / 2).toFixed(2))
    };

    return city;
  }
};
`,

  conflict: `
export const CityConflictEngine = {
  tick(city, world) {
    const tension = world.social.tension ?? 0;
    const events = world.events ?? 0;

    city.conflict = {
      risk: Number((tension * 0.6 + events / 20000).toFixed(2)),
      active: tension > 0.5
    };

    return city;
  }
};
`,

  harmony: `
export const CityHarmonyEngine = {
  tick(city) {
    const cohesion = city.socialNetwork?.cohesion ?? 0;
    const conflict = city.conflict?.risk ?? 0;

    city.harmony = {
      index: Number((cohesion - conflict).toFixed(2)),
      stable: cohesion > conflict
    };

    return city;
  }
};
`,

  dreams: `
export const CityDreamEngine = {
  tick(city, world) {
    const joy = city.emotions?.joy ?? 0;
    const excitement = city.emotions?.excitement ?? 0;
    const events = world.events ?? 0;

    const intensity = Number(((joy + excitement + events / 200) / 100).toFixed(2));

    let dream = "QUIET_STREETS";
    let symbol = "Empty plazas under soft lights";

    if (intensity > 0.3) {
      dream = "FESTIVAL_OF_LIGHTS";
      symbol = "Thousands dancing under lanterns";
    }
    if (intensity > 0.6) {
      dream = "GRAND_AGORA";
      symbol = "Crowds gathering in unity and celebration";
    }

    city.dream = {
      type: dream,
      intensity,
      symbol
    };

    return city;
  }
};
`
};

// 2. Tworzenie silników
ensure(FILES.social, TEMPLATES.social);
ensure(FILES.conflict, TEMPLATES.conflict);
ensure(FILES.harmony, TEMPLATES.harmony);
ensure(FILES.dreams, TEMPLATES.dreams);

// 3. Patch: cityIntelligenceEngines.js
{
  const file = load(FILES.intelligence);
  if (file) {
    let c = file.content;

    // Importy
    if (!c.includes("CitySocialNetworkEngine"))
      c = `import { CitySocialNetworkEngine } from "./citySocialNetworkEngine.js";\n` + c;

    if (!c.includes("CityConflictEngine"))
      c = `import { CityConflictEngine } from "./cityConflictEngine.js";\n` + c;

    if (!c.includes("CityHarmonyEngine"))
      c = `import { CityHarmonyEngine } from "./cityHarmonyEngine.js";\n` + c;

    if (!c.includes("CityDreamEngine"))
      c = `import { CityDreamEngine } from "./cityDreamEngine.js";\n` + c;

    // Wstrzyknięcie do CityBrainEngine
    c = c.replace(
      /CityRitualsEngine\.tick\(city, world\);?/,
      `CityRitualsEngine.tick(city, world);
    city = CitySocialNetworkEngine.tick(city, world);
    city = CityConflictEngine.tick(city, world);
    city = CityHarmonyEngine.tick(city, world);
    city = CityDreamEngine.tick(city, world);`
    );

    save(file.full, c);
  }
}

// 4. Patch: dashboard
{
  const file = load(FILES.dashboard);
  if (file) {
    let c = file.content;

    if (!c.includes("CITY DREAMS")) {
      c += `
\n💭 CITY DREAMS
────────────────────────────────────────────────────────────
Dream:          \${city.dream?.type}
Intensity:      \${fmt(city.dream?.intensity)}
Symbol:         "\${city.dream?.symbol}"

🤝 SOCIAL NETWORK
────────────────────────────────────────────────────────────
Cohesion:       \${fmt(city.socialNetwork?.cohesion)}
Fragmentation:  \${fmt(city.socialNetwork?.fragmentation)}
Pulse:          \${fmt(city.socialNetwork?.pulse)}

⚔️ CONFLICT
────────────────────────────────────────────────────────────
Risk:           \${fmt(city.conflict?.risk)}
Active:         \${city.conflict?.active}

☯️ HARMONY
────────────────────────────────────────────────────────────
Index:          \${fmt(city.harmony?.index)}
Stable:         \${city.harmony?.stable}\n`;
    }

    save(file.full, c);
  }
}

console.log("🏁 CITY ENGINE PATCHER 3.0 — ZAKOŃCZONO");

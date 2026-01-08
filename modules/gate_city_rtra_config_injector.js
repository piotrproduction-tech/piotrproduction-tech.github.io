/**
 * FAZA 4C — ETAP 2.6
 * CITY RTRA CONFIG INJECTOR
 *
 * Reputation / Tokens / Rewards / Anti‑Abuse
 * dla wszystkich backend/BE-XX__Name/
 *
 * Zakłada:
 *  - CitySuperEngine istnieje i działa
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BACKEND = path.join(ROOT, "backend");

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

function appendIfMissing(file, marker, block) {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, "utf8");
  if (content.includes(marker)) {
    console.log("⏭  Marker istnieje:", marker, "→", path.relative(ROOT, file));
    return;
  }
  fs.writeFileSync(file, content + "\n\n" + block);
  console.log("📌 Dopisano:", marker, "→", path.relative(ROOT, file));
}

function getBackendModules() {
  if (!fs.existsSync(BACKEND)) return [];
  return fs
    .readdirSync(BACKEND)
    .filter((f) => /^BE-\d+__/.test(f))
    .map((f) => ({
      id: f.split("__")[0],
      name: f.split("__")[1],
      dir: path.join(BACKEND, f)
    }));
}

function injectRTRAConfig(mod) {
  const configDir = path.join(mod.dir, "config");
  ensureDir(configDir);

  const rtraFile = path.join(configDir, "rtra.config.json");

  // Domyślna konfiguracja RTRA dla modułu
  writeIfMissing(
    rtraFile,
    JSON.stringify(
      {
        moduleId: mod.id,
        moduleName: mod.name,
        reputation: {
          enabled: true,
          weights: {
            positive: 5,
            negative: -5,
            neutral: 0
          },
          eventMapping: {
            created: 5,
            approved: 10,
            joined: 3,
            rejected: -10,
            removed: -5,
            flagged: -15
          }
        },
        tokens: {
          enabled: true,
          baseReward: 0,
          eventMapping: {
            created: 10,
            approved: 20,
            joined: 5
          }
        },
        rewards: {
          enabled: true,
          tiers: [
            {
              id: "tier_1",
              name: "Active Citizen",
              minReputation: 20,
              minTokens: 50
            },
            {
              id: "tier_2",
              name: "City Builder",
              minReputation: 50,
              minTokens: 100
            },
            {
              id: "tier_3",
              name: "City Legend",
              minReputation: 100,
              minTokens: 200
            }
          ]
        },
        antiAbuse: {
          enabled: true,
          suspiciousKeywords: ["spam", "abuse", "bot", "duplicate"],
          rateLimits: {
            perMinute: 30,
            perHour: 300
          },
          cooldowns: {
            onFlag: 60000
          }
        }
      },
      null,
      2
    )
  );

  // Podpięcie configu do life/reactions.js (jeśli chcemy używać w przyszłości)
  const reactionsFile = path.join(mod.dir, "life", "reactions.js");
  appendIfMissing(
    reactionsFile,
    "import rtraConfig",
    `
import rtraConfig from "../config/rtra.config.json";
// rtraConfig dostępny dla przyszłych, modułowych reakcji.
`
  );
}

console.log("🏙️ FAZA 4C — ETAP 2.6: RTRA CONFIG INJECTOR START...");

const backendModules = getBackendModules();

backendModules.forEach((mod) => {
  if (mod.id === "BE-00") return; // BE-00__City to silnik, nie dzielnica
  console.log(`\n🔧 Inject RTRA config into: ${mod.id}__${mod.name}`);
  injectRTRAConfig(mod);
});

console.log("\n🎉 FAZA 4C — ETAP 2.6: RTRA CONFIG INJECTOR ZAKOŃCZONY.");

/**
 * FAZA 4C — SUPER ENGINE INJECTOR
 *
 * Wstrzykuje CitySuperEngine do wszystkich:
 *   backend/BE-XX__Name/
 *
 * Zakłada, że:
 *   backend/BE-00__City/SUPER_ENGINE/CitySuperEngine.js
 * już istnieje.
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BACKEND = path.join(ROOT, "backend");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
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

function prependIfMissing(file, marker, block) {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, "utf8");
  if (content.includes(marker)) {
    console.log("⏭  Import istnieje:", marker, "→", path.relative(ROOT, file));
    return;
  }
  fs.writeFileSync(file, block + "\n" + content);
  console.log("📌 Dodano import:", marker, "→", path.relative(ROOT, file));
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

function injectSuperEngine(mod) {
  const base = mod.dir;

  const reactionsFile = path.join(base, "life", "reactions.js");
  const notificationsFile = path.join(base, "life", "notifications.js");
  const mapSignalsFile = path.join(base, "life", "mapSignals.js");
  const diagFile = path.join(base, "diagnostics", "status.js");

  const importLine = `import { CitySuperEngine } from "../../BE-00__City/SUPER_ENGINE/CitySuperEngine.js";`;

  // Import do plików life/*
  [reactionsFile, notificationsFile, mapSignalsFile].forEach((file) => {
    prependIfMissing(file, "CitySuperEngine", importLine);
  });

  // Reactions → użycie CitySuperEngine.process
  appendIfMissing(
    reactionsFile,
    "CitySuperEngine.process",
    `
export function getReactions() {
  return [
    {
      match: (event) => event.module === "${mod.id}",
      action: (event) => CitySuperEngine.process(event)
    }
  ];
}
`
  );

  // Notifications → użycie lifeReaction + rewardCheck
  appendIfMissing(
    notificationsFile,
    "CitySuperEngine.lifeReaction",
    `
export function mapEventToNotification(event) {
  if (event.module !== "${mod.id}") return null;
  const processed = CitySuperEngine.process(event);
  return processed.life.notification;
}
`
  );

  // Map signals → użycie lifeReaction.glow
  appendIfMissing(
    mapSignalsFile,
    "CitySuperEngine.lifeReaction",
    `
export function mapEventToTileSignal(event) {
  if (event.module !== "${mod.id}") return null;
  const processed = CitySuperEngine.process(event);
  return {
    tileId: processed.life.glow.tileId || "${mod.id}",
    type: event.type,
    payload: event.payload
  };
}
`
  );

  // Diagnostics → reputacja, tokeny, rewards, abuse
  appendIfMissing(
    diagFile,
    "superEngine",
    `
import { CitySuperEngine } from "../../BE-00__City/SUPER_ENGINE/CitySuperEngine.js";

export function getStatus() {
  const sampleEvent = {
    module: "${mod.id}",
    type: "${mod.id.toLowerCase()}.diagnostic.ping",
    payload: {}
  };
  const processed = CitySuperEngine.process(sampleEvent);

  return {
    ok: true,
    module: "${mod.id}",
    name: "${mod.name}",
    ts: Date.now(),
    sample: {
      reputationDelta: processed.reputationDelta,
      tokensDelta: processed.tokensDelta,
      rewards: processed.rewards,
      abuse: processed.abuse
    }
  };
}
`
  );
}

console.log("🏙️ FAZA 4C — SUPER ENGINE INJECTOR START...");

const backendModules = getBackendModules();

backendModules.forEach((mod) => {
  if (mod.id === "BE-00") return; // BE-00__City to źródło, nie cel
  console.log(`\n🔧 Inject SuperEngine into: ${mod.id}__${mod.name}`);
  injectSuperEngine(mod);
});

console.log("\n🎉 FAZA 4C — SUPER ENGINE INJECTOR ZAKOŃCZONY.");

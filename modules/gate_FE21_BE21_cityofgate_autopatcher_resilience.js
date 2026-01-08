/**
 * CITYOF‑GATE :: AUTO‑PATCHER 4 — CITY RESILIENCE SYSTEM
 *
 * Dodaje:
 *  - CityWatchdogEngine
 *  - CityRecoveryEngine
 *  - CitySnapshotEngine
 *  - CityAnomalyDetector
 *  - Auto‑Rollback
 *  - Auto‑Snapshot
 *  - Auto‑Healing na poziomie miasta
 *
 * Cel:
 *  - Miasto odporne na błędy, anomalie, uszkodzenia stanu
 *  - Stabilność przy 1 000 000 cykli
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeFile(relativePath, content) {
  const full = path.join(ROOT, relativePath);
  ensureDir(full);
  fs.writeFileSync(full, content);
  console.log("📄 Utworzono:", relativePath);
}

// ---------------------------------------------------------
// 1. Tworzymy City Resilience Engines
// ---------------------------------------------------------

writeFile(
  "integration/city/cityResilienceEngines.js",
  `/**
 * CITY RESILIENCE ENGINES
 * Watchdog • Recovery • Snapshot • Anomaly Detection
 */

export const CitySnapshotEngine = {
  snapshots: [],
  takeSnapshot(city) {
    const snap = JSON.parse(JSON.stringify(city));
    this.snapshots.push({ timestamp: Date.now(), snap });
    return snap;
  },
  getLastSnapshot() {
    return this.snapshots[this.snapshots.length - 1]?.snap || null;
  }
};

export const CityAnomalyDetector = {
  detect(city) {
    const anomalies = [];

    if (!city.instances || typeof city.instances !== "object")
      anomalies.push("instances_missing");

    if (!city.shards || typeof city.shards !== "object")
      anomalies.push("shards_missing");

    if (!Array.isArray(city.globalEvents))
      anomalies.push("global_events_invalid");

    return anomalies;
  }
};

export const CityRecoveryEngine = {
  recover(city, snapshotEngine) {
    const last = snapshotEngine.getLastSnapshot();
    if (!last) return city;
    return JSON.parse(JSON.stringify(last));
  }
};

export const CityWatchdogEngine = {
  tick(city, snapshotEngine, anomalyDetector, recoveryEngine) {
    const anomalies = anomalyDetector.detect(city);

    if (anomalies.length > 0) {
      city = recoveryEngine.recover(city, snapshotEngine);
      city.recoveredFrom = anomalies;
    }

    snapshotEngine.takeSnapshot(city);
    return city;
  }
};`
);

// ---------------------------------------------------------
// 2. Patch HyperOrchestrator — dodajemy globalny watchdog
// ---------------------------------------------------------

const HYPER_PATH = "integration/marketplace/hyperOrchestratorBridge.js";
const hyperFull = path.join(ROOT, HYPER_PATH);

if (fs.existsSync(hyperFull)) {
  let content = fs.readFileSync(hyperFull, "utf8");

  if (!content.includes("CITY_RESILIENCE_PATCH")) {
    content =
      `import { CityWatchdogEngine, CitySnapshotEngine, CityAnomalyDetector, CityRecoveryEngine } from "../city/cityResilienceEngines.js";\n` +
      content.replace(
        /return { tick:/,
        `
// CITY_RESILIENCE_PATCH
state.city = CityWatchdogEngine.tick(
  state.city || {},
  CitySnapshotEngine,
  CityAnomalyDetector,
  CityRecoveryEngine
);

return { tick:`
      );

    fs.writeFileSync(hyperFull, content);
    console.log("✔ Naprawiono:", HYPER_PATH);
  } else {
    console.log("⏭ Już poprawne:", HYPER_PATH);
  }
}

console.log("\n🏁 AUTO‑PATCHER 4 ZAKOŃCZONY — CITY RESILIENCE SYSTEM ACTIVE");

/**
 * CITYOF-GATE :: Marketplace 5.0 — Bridge Patcher (FINAL)
 * Automatycznie poprawia ścieżki importów w:
 *  - integration/marketplace/hyperOrchestratorBridge.js
 *  - integration/marketplace/aiDirectorBridge.js
 *
 * Naprawia:
 *  "../world/..."  →  "../../world/..."
 *  "../scheduler/..." → "../../scheduler/..."
 *
 * Idempotentne — wielokrotne uruchomienie nie psuje plików.
 */

import fs from "fs";
import path from "path";

const FILES = [
  "integration/marketplace/hyperOrchestratorBridge.js",
  "integration/marketplace/aiDirectorBridge.js"
];

function patchFile(filePath) {
  const full = path.resolve(filePath);

  if (!fs.existsSync(full)) {
    console.log("❌ Nie znaleziono pliku:", filePath);
    return;
  }

  let content = fs.readFileSync(full, "utf8");

  // poprawa ścieżek world/
  content = content.replaceAll(
    '../world/marketplace/',
    '../../world/marketplace/'
  );

  // poprawa ścieżek scheduler/
  content = content.replaceAll(
    '../scheduler/marketplace/',
    '../../scheduler/marketplace/'
  );

  // poprawa ścieżek sandbox/sync/sharding/router/bridge (jeśli kiedyś będą)
  content = content.replaceAll('../sandbox/', '../../sandbox/');
  content = content.replaceAll('../sync/', '../../sync/');
  content = content.replaceAll('../sharding/', '../../sharding/');
  content = content.replaceAll('../router/', '../../router/');
  content = content.replaceAll('../bridge/', '../../bridge/');

  fs.writeFileSync(full, content);

  console.log("✔ Naprawiono:", filePath);
}

console.log("🔧 Marketplace Bridge Patcher — START");

FILES.forEach(patchFile);

console.log("🏁 Marketplace Bridge Patcher — DONE");

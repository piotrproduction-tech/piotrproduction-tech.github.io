/**
 * FAZA 4C — KROK 3.5
 * AUTO-CONNECT GENERATOR (WERSJA DLA STRUKTURY PIOTRA)
 *
 * Automatycznie:
 *  - dodaje import + app.use() w backend/router.js
 *  - dodaje podłączenie strumieni SSE w FE-00__City
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

// BACKEND — Twój główny serwer
const BACKEND_SERVER = path.join(ROOT, "backend", "router.js");

// FRONTEND
const FE00 = path.join(ROOT, "apps", "FE-00__City");
const FE_CANDIDATES = [
  "App.js",
  "App.jsx",
  "index.js",
  "index.jsx",
  "main.js",
  "main.jsx"
].map((f) => path.join(FE00, f));

function safeAppend(file, marker, block) {
  if (!fs.existsSync(file)) return false;

  const content = fs.readFileSync(file, "utf8");
  if (content.includes(marker)) {
    console.log("⏭  Już istnieje:", marker);
    return true;
  }

  fs.writeFileSync(file, content + "\n\n" + block);
  console.log("📄 Dopisano do:", file);
  return true;
}

console.log("🏙️ FAZA 4C — AUTO-CONNECT START...");

// -----------------------------
// BACKEND
// -----------------------------
if (!fs.existsSync(BACKEND_SERVER)) {
  console.log("❌ Nie znaleziono backend/router.js");
} else {
  safeAppend(
    BACKEND_SERVER,
    "CityFrontendAPI",
    `// --- AUTO-INJECT: City Frontend API ---
import { CityFrontendAPI } from "./BE-00__City_Frontend_API/index.js";
app.use("/api", CityFrontendAPI);`
  );
}

// -----------------------------
// FRONTEND
// -----------------------------
let frontendFile = null;

for (const f of FE_CANDIDATES) {
  if (fs.existsSync(f)) {
    frontendFile = f;
    break;
  }
}

if (!frontendFile) {
  console.log("❌ Nie znaleziono głównego pliku FE-00 (App.js / index.js / main.jsx)");
} else {
  safeAppend(
    frontendFile,
    "EventSource(\"/api/city/notify/stream\")",
    `// --- AUTO-INJECT: City Notifications Stream ---
import { pushCityNotification } from "./LIFE/CityNotifications";
import { emitMapSignal } from "./MAP/CityMapAnimations";

const evt = new EventSource("/api/city/notify/stream");
evt.onmessage = (e) => pushCityNotification(JSON.parse(e.data));

const evt2 = new EventSource("/api/city/map/signal/stream");
evt2.onmessage = (e) => emitMapSignal(JSON.parse(e.data));`
  );
}

console.log("🎉 FAZA 4C — AUTO-CONNECT ZAKOŃCZONY.");

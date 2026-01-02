/**
 * FAZA 4C — ETAP 2
 * CITY COMMON LOGIC INJECTOR
 *
 * Przechodzi po wszystkich:
 *   backend/BE-XX__Name/
 *   apps/FE-XX__Name/
 *
 * I dopisuje:
 *   - event emitters
 *   - event listeners
 *   - life reactions
 *   - notifications mapping
 *   - map glow mapping
 *   - diagnostics 2.0
 *   - API placeholders
 *   - FE hooks (events + data)
 *   - FE notifications
 *   - FE glow integration
 *
 * NICZEGO NIE NADPISUJE.
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BACKEND = path.join(ROOT, "backend");
const APPS = path.join(ROOT, "apps");

// Helpery
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
    console.log("⏭  Marker istnieje:", marker);
    return;
  }
  fs.writeFileSync(file, content + "\n\n" + block);
  console.log("📌 Dopisano:", marker, "→", path.relative(ROOT, file));
}

// Pobieramy wszystkie moduły BE-XX__Name
function getBackendModules() {
  return fs
    .readdirSync(BACKEND)
    .filter((f) => /^BE-\d+__/.test(f))
    .map((f) => ({
      id: f.split("__")[0],
      name: f.split("__")[1],
      dir: path.join(BACKEND, f)
    }));
}

// Pobieramy wszystkie moduły FE-XX__Name
function getFrontendModules() {
  return fs
    .readdirSync(APPS)
    .filter((f) => /^BE-\d+__/.test(f))
    .map((f) => ({
      id: f.split("__")[0],
      name: f.split("__")[1],
      dir: path.join(APPS, f)
    }));
}

// ---------------------------------------------
// BACKEND INJECTION
// ---------------------------------------------
function injectBackendLogic(mod) {
  const base = mod.dir;

  const apiFile = path.join(base, "api", `${mod.id}Api.js`);
  const emittersFile = path.join(base, "events", "emitters.js");
  const listenersFile = path.join(base, "events", "listeners.js");
  const reactionsFile = path.join(base, "life", "reactions.js");
  const notificationsFile = path.join(base, "life", "notifications.js");
  const mapSignalsFile = path.join(base, "life", "mapSignals.js");
  const diagFile = path.join(base, "diagnostics", "status.js");

  // API placeholders
  appendIfMissing(
    apiFile,
    "router.get(\"/events\"",
    `
${mod.id.replace("-", "_")}Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

${mod.id.replace("-", "_")}Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});
`
  );

  // Emitters
  appendIfMissing(
    emittersFile,
    "export function emitDistrictEvent",
    `
export function emitDistrictEvent(type, payload = {}) {
  return {
    module: "${mod.id}",
    type,
    payload,
    ts: Date.now()
  };
}
`
  );

  // Listeners
  appendIfMissing(
    listenersFile,
    "export function registerListeners",
    `
export function registerListeners(eventBus) {
  eventBus.on("${mod.id}", (event) => {
    console.log("📡 Event in ${mod.id}:", event);
  });
}
`
  );

  // Life reactions
  appendIfMissing(
    reactionsFile,
    "return [",
    `
export function getReactions() {
  return [
    {
      match: (event) => event.module === "${mod.id}",
      action: (event) => {
        return { ok: true, handledBy: "${mod.id}" };
      }
    }
  ];
}
`
  );

  // Notifications
  appendIfMissing(
    notificationsFile,
    "export function mapEventToNotification",
    `
export function mapEventToNotification(event) {
  if (event.module !== "${mod.id}") return null;
  return {
    title: "${mod.name.replace(/_/g, " ")}",
    message: "Nowe zdarzenie: " + event.type
  };
}
`
  );

  // Map glow
  appendIfMissing(
    mapSignalsFile,
    "export function mapEventToTileSignal",
    `
export function mapEventToTileSignal(event) {
  if (event.module !== "${mod.id}") return null;
  return {
    tileId: "${mod.id}",
    type: event.type,
    payload: event.payload
  };
}
`
  );

  // Diagnostics 2.0
  appendIfMissing(
    diagFile,
    "eventsHandled",
    `
export function getStatus() {
  return {
    ok: true,
    module: "${mod.id}",
    name: "${mod.name}",
    ts: Date.now(),
    eventsHandled: 0
  };
}
`
  );
}

// ---------------------------------------------
// FRONTEND INJECTION
// ---------------------------------------------
function injectFrontendLogic(mod) {
  const base = mod.dir;

  const eventsHook = path.join(base, "hooks", "useDistrictEvents.js");
  const dataHook = path.join(base, "hooks", "useDistrictData.js");
  const notifications = path.join(base, "Notifications.js");
  const glow = path.join(base, "Glow.js");
  const panel = path.join(base, "Panel.js");
  const list = path.join(base, "List.js");
  const details = path.join(base, "Details.js");

  // Events hook
  appendIfMissing(
    eventsHook,
    "EventSource",
    `
export function useDistrictEvents() {
  const evt = new EventSource("/api/city/notify/stream");
  return [];
}
`
  );

  // Data hook
  appendIfMissing(
    dataHook,
    "fetch(",
    `
export function useDistrictData() {
  return {
    items: [],
    refresh: () => fetch("/api/${mod.id.toLowerCase()}/events")
  };
}
`
  );

  // Notifications
  appendIfMissing(
    notifications,
    "pushCityNotification",
    `
import { pushCityNotification } from "../FE-00__City/LIFE/CityNotifications";

export function notify${mod.id.replace("-", "_")}(event) {
  pushCityNotification({
    title: "${mod.name.replace(/_/g, " ")}",
    message: "Nowe zdarzenie: " + event.type
  });
}
`
  );

  // Glow
  appendIfMissing(
    glow,
    "useTileGlow",
    `
import { useTileGlow } from "../FE-00__City/MAP/CityMapAnimations";

export function use${mod.id.replace("-", "_")}Glow() {
  return useTileGlow("${mod.id}");
}
`
  );

  // Panel
  appendIfMissing(
    panel,
    "Aktywność dzielnicy",
    `
<div style={{ marginTop: 20 }}>
  <h3>Aktywność dzielnicy</h3>
  <p>Tu pojawią się zdarzenia z ${mod.name.replace(/_/g, " ")}.</p>
</div>
`
  );

  // List
  appendIfMissing(
    list,
    "Zdarzenia",
    `
<div style={{ marginTop: 20 }}>
  <h3>Zdarzenia</h3>
  <p>Lista zdarzeń z ${mod.name.replace(/_/g, " ")}.</p>
</div>
`
  );

  // Details
  appendIfMissing(
    details,
    "Szczegóły zdarzenia",
    `
<div style={{ marginTop: 20 }}>
  <h3>Szczegóły zdarzenia</h3>
  <p>Dane zdarzenia z ${mod.name.replace(/_/g, " ")}.</p>
</div>
`
  );
}

// ---------------------------------------------
// MAIN
// ---------------------------------------------
console.log("🏙️ FAZA 4C — ETAP 2: COMMON LOGIC INJECTOR START...");

const backendModules = getBackendModules();
const frontendModules = getFrontendModules();

backendModules.forEach((mod) => {
  console.log(`\n🔧 Backend inject: ${mod.id}__${mod.name}`);
  injectBackendLogic(mod);
});

frontendModules.forEach((mod) => {
  console.log(`\n🎨 Frontend inject: ${mod.id}__${mod.name}`);
  injectFrontendLogic(mod);
});

console.log("\n🎉 FAZA 4C — ETAP 2: COMMON LOGIC INJECTOR ZAKOŃCZONY.");

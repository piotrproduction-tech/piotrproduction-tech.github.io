const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APPS = path.join(ROOT, "apps");

const FE00 = path.join(APPS, "FE-00__City");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log("[DIR] created:", dir);
  }
}

function ensureFile(filePath, defaultContent) {
  const dir = path.dirname(filePath);
  ensureDir(dir);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultContent, "utf8");
    console.log("[FILE] created:", filePath);
  }
}

function appendIfMissing(filePath, marker, block) {
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.includes(marker)) {
    fs.writeFileSync(filePath, content + "\n" + block, "utf8");
    console.log("[INTEGRATION] added:", marker);
  } else {
    console.log("[SKIP] already integrated:", marker);
  }
}

function main() {
  console.log("=== City Broadcast Engine generator start ===");

  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE‑00__City not found:", FE00);
    process.exit(1);
  }

  // 1. Ensure broadcast engine directory
  const broadcastDir = path.join(FE00, "broadcast");
  ensureDir(broadcastDir);

  // 2. Broadcast Engine
  const broadcastEngineFile = path.join(broadcastDir, "cityBroadcastEngine.js");
  ensureFile(
    broadcastEngineFile,
    `export const cityBroadcast = {
  queue: [],
  listeners: [],
  active: null,

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.active));
  },

  push(message) {
    this.queue.push(message);
    this.processQueue();
  },

  processQueue() {
    if (this.active) return;

    this.active = this.queue.shift();
    this.notify();

    // auto-clear after 4 seconds
    setTimeout(() => {
      this.active = null;
      this.notify();
      if (this.queue.length > 0) this.processQueue();
    }, 4000);
  }
};`
  );

  // 3. Broadcast Listener (Sync Engine → Broadcast Engine)
  const listenerFile = path.join(broadcastDir, "cityBroadcastListener.js");
  ensureFile(
    listenerFile,
    `import { cityBroadcast } from "./cityBroadcastEngine";
import { citySync } from "../sync/citySyncEngine";

citySync.subscribe(event => {
  const prefix = event.type.split(".")[0];

  const messages = {
    marketplace: "Nowa aktywność w Marketplace!",
    creator: "Twórca zdobył progres!",
    street: "Nowy sygnał ulicy!",
    festival: "Nowy event festiwalowy!",
    community: "Aktywność społeczności!",
    city: "Globalne wydarzenie miasta!"
  };

  const msg = messages[prefix] || "Nowy event w mieście!";
  cityBroadcast.push(msg);
});`
  );

  // 4. Broadcast Overlay UI
  const overlayFile = path.join(FE00, "views", "CityBroadcastOverlay.js");
  ensureFile(
    overlayFile,
    `import { useEffect, useState } from "react";
import { cityBroadcast } from "../broadcast/cityBroadcastEngine";

export default function CityBroadcastOverlay() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    cityBroadcast.subscribe(msg => setMessage(msg));
  }, []);

  if (!message) return null;

  return (
    <div
      className="city-broadcast-overlay"
      style={{
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "12px 20px",
        background: "rgba(0,0,0,0.7)",
        color: "white",
        borderRadius: "10px",
        fontSize: "14px",
        animation: "fadeInOut 4s ease"
      }}
    >
      {message}
    </div>
  );
}`
  );

  // 5. Patch CityMapView to include broadcast overlay
  const mapViewFile = path.join(FE00, "views", "CityMapView.js");
  ensureFile(mapViewFile, `export default function CityMapView() { return "City Map"; }`);

  appendIfMissing(
    mapViewFile,
    "CityBroadcastOverlay",
    `import CityBroadcastOverlay from "./CityBroadcastOverlay";

export function CityMapWithBroadcast() {
  return (
    <div className="city-map-with-broadcast">
      <CityBroadcastOverlay />
    </div>
  );
}`
  );

  console.log("=== City Broadcast Engine generator done ===");
}

if (require.main === module) {
  main();
}

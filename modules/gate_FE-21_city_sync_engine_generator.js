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
  console.log("=== City Sync Engine generator start ===");

  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE‑00__City not found:", FE00);
    process.exit(1);
  }

  // 1. Ensure sync engine directory
  const syncDir = path.join(FE00, "sync");
  ensureDir(syncDir);

  // 2. City Sync Engine
  const syncEngineFile = path.join(syncDir, "citySyncEngine.js");
  ensureFile(
    syncEngineFile,
    `export const citySync = {
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  broadcast(event) {
    this.listeners.forEach(cb => cb(event));
  }
};`
  );

  // 3. City Sync Listener (SuperEngine → Sync Engine)
  const listenerFile = path.join(syncDir, "citySyncListener.js");
  ensureFile(
    listenerFile,
    `import { citySync } from "./citySyncEngine";
import { superEngineClient } from "../../FE-21__Marketplace/utils/SuperEngineClient";

// Every event from SuperEngine is broadcast to all districts
superEngineClient.subscribe(event => {
  citySync.broadcast(event);
});`
  );

  // 4. District Sync Adapters
  const adaptersFile = path.join(syncDir, "districtSyncAdapters.js");
  ensureFile(
    adaptersFile,
    `import { citySync } from "./citySyncEngine";

// Registry of district adapters
export const districtSyncAdapters = {};

// Register adapter
export function registerDistrictAdapter(id, handler) {
  districtSyncAdapters[id] = handler;
}

// Dispatch events to districts
citySync.subscribe(event => {
  Object.values(districtSyncAdapters).forEach(handler => handler(event));
});`
  );

  // 5. Patch CityMapView to show sync status
  const mapViewFile = path.join(FE00, "views", "CityMapView.js");
  ensureFile(mapViewFile, `export default function CityMapView() { return "City Map"; }`);

  appendIfMissing(
    mapViewFile,
    "CitySyncStatus",
    `import { useEffect, useState } from "react";
import { citySync } from "../sync/citySyncEngine";

export function CitySyncStatus() {
  const [lastEvent, setLastEvent] = useState(null);

  useEffect(() => {
    citySync.subscribe(event => setLastEvent(event));
  }, []);

  if (!lastEvent) return null;

  return (
    <div className="city-sync-status" style={{
      position: "absolute",
      bottom: "20px",
      right: "20px",
      padding: "10px 14px",
      background: "rgba(0,0,0,0.5)",
      color: "white",
      borderRadius: "8px",
      fontSize: "12px"
    }}>
      Sync: {lastEvent.type}
    </div>
  );
}`
  );

  console.log("=== City Sync Engine generator done ===");
}

if (require.main === module) {
  main();
}

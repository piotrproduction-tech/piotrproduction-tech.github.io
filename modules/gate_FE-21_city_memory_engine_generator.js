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
  console.log("=== City Memory Engine generator start ===");

  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE‑00__City not found:", FE00);
    process.exit(1);
  }

  // 1. Ensure memory engine directory
  const memoryDir = path.join(FE00, "memory");
  ensureDir(memoryDir);

  // 2. City Memory Engine
  const memoryEngineFile = path.join(memoryDir, "cityMemoryEngine.js");
  ensureFile(
    memoryEngineFile,
    `export const cityMemory = {
  events: [],
  trends: {
    marketplace: 0,
    creator: 0,
    street: 0,
    festival: 0,
    community: 0,
    city: 0
  },
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this));
  },

  record(event) {
    this.events.push({
      type: event.type,
      payload: event.payload,
      timestamp: Date.now()
    });

    const prefix = event.type.split(".")[0];
    if (this.trends[prefix] !== undefined) {
      this.trends[prefix] += 1;
    }

    this.notify();
  }
};`
  );

  // 3. Memory Listener (Sync Engine → Memory Engine)
  const listenerFile = path.join(memoryDir, "cityMemoryListener.js");
  ensureFile(
    listenerFile,
    `import { cityMemory } from "./cityMemoryEngine";
import { citySync } from "../sync/citySyncEngine";

citySync.subscribe(event => {
  cityMemory.record(event);
});`
  );

  // 4. Memory Overlay UI (history preview)
  const overlayFile = path.join(FE00, "views", "CityMemoryOverlay.js");
  ensureFile(
    overlayFile,
    `import { useEffect, useState } from "react";
import { cityMemory } from "../memory/cityMemoryEngine";

export default function CityMemoryOverlay() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    cityMemory.subscribe(mem => {
      setHistory(mem.events.slice(-5)); // last 5 events
    });
  }, []);

  return (
    <div
      className="city-memory-overlay"
      style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        padding: "10px",
        background: "rgba(0,0,0,0.5)",
        color: "white",
        borderRadius: "8px",
        fontSize: "12px",
        maxWidth: "260px"
      }}
    >
      <strong>Ostatnie zdarzenia:</strong>
      <ul style={{ margin: 0, paddingLeft: "16px" }}>
        {history.map((e, i) => (
          <li key={i}>{e.type}</li>
        ))}
      </ul>
    </div>
  );
}`
  );

  // 5. Patch CityMapView to include memory overlay
  const mapViewFile = path.join(FE00, "views", "CityMapView.js");
  ensureFile(mapViewFile, `export default function CityMapView() { return "City Map"; }`);

  appendIfMissing(
    mapViewFile,
    "CityMemoryOverlay",
    `import CityMemoryOverlay from "./CityMemoryOverlay";

export function CityMapWithMemory() {
  return (
    <div className="city-map-with-memory">
      <CityMemoryOverlay />
    </div>
  );
}`
  );

  console.log("=== City Memory Engine generator done ===");
}

if (require.main === module) {
  main();
}

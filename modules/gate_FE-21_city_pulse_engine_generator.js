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
  console.log("=== City Pulse Engine generator start ===");

  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE‑00__City not found:", FE00);
    process.exit(1);
  }

  // 1. Ensure pulse engine directory
  const pulseDir = path.join(FE00, "pulse");
  ensureDir(pulseDir);

  // 2. Pulse Engine
  const pulseEngineFile = path.join(pulseDir, "cityPulseEngine.js");
  ensureFile(
    pulseEngineFile,
    `export const cityPulse = {
  bpm: 30, // base pulse
  lastEvent: null,
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.bpm));
  },

  trigger(event) {
    this.lastEvent = event;

    // Increase pulse on activity
    this.bpm = Math.min(180, this.bpm + 10);

    this.notify();

    // Decay back to baseline
    setTimeout(() => {
      this.bpm = Math.max(30, this.bpm - 5);
      this.notify();
    }, 2000);
  }
};`
  );

  // 3. Pulse Listener (SuperEngine → Pulse)
  const listenerFile = path.join(pulseDir, "cityPulseListener.js");
  ensureFile(
    listenerFile,
    `import { cityPulse } from "./cityPulseEngine";
import { superEngineClient } from "../../FE-21__Marketplace/utils/SuperEngineClient";

superEngineClient.subscribe(event => {
  // Any event increases pulse
  cityPulse.trigger(event);
});`
  );

  // 4. Pulse Overlay UI
  const overlayFile = path.join(FE00, "views", "CityPulseOverlay.js");
  ensureFile(
    overlayFile,
    `import { useEffect, useState } from "react";
import { cityPulse } from "../pulse/cityPulseEngine";

export default function CityPulseOverlay() {
  const [bpm, setBpm] = useState(cityPulse.bpm);

  useEffect(() => {
    cityPulse.subscribe(newBpm => setBpm(newBpm));
  }, []);

  return (
    <div className="city-pulse-overlay">
      <div
        className="pulse-circle"
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "rgba(255, 80, 0, 0.3)",
          animation: \`pulse \${60 / bpm}s infinite ease-in-out\`
        }}
      />
    </div>
  );
}`
  );

  // 5. Patch CityMapView to include pulse overlay
  const mapViewFile = path.join(FE00, "views", "CityMapView.js");
  ensureFile(mapViewFile, `export default function CityMapView() { return "City Map"; }`);

  appendIfMissing(
    mapViewFile,
    "CityPulseOverlay",
    `import CityPulseOverlay from "./CityPulseOverlay";

export function CityMapWithPulse() {
  return (
    <div className="city-map-with-pulse">
      <CityPulseOverlay />
    </div>
  );
}`
  );

  console.log("=== City Pulse Engine generator done ===");
}

if (require.main === module) {
  main();
}

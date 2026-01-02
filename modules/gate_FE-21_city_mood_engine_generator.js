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
  console.log("=== City Mood Engine generator start ===");

  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE‑00__City not found:", FE00);
    process.exit(1);
  }

  // 1. Ensure mood engine directory
  const moodDir = path.join(FE00, "mood");
  ensureDir(moodDir);

  // 2. Mood Engine
  const moodEngineFile = path.join(moodDir, "cityMoodEngine.js");
  ensureFile(
    moodEngineFile,
    `export const cityMood = {
  mood: "Calm",
  lastEvent: null,
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.mood));
  },

  update(event) {
    this.lastEvent = event;

    const prefix = event.type.split(".")[0];

    if (prefix === "creator") this.mood = "Creative";
    else if (prefix === "marketplace") this.mood = "Energetic";
    else if (prefix === "street") this.mood = "Chaotic";
    else if (prefix === "festival") this.mood = "Celebratory";
    else if (prefix === "community") this.mood = "Focused";
    else this.mood = "Calm";

    this.notify();

    // decay back to Calm
    setTimeout(() => {
      this.mood = "Calm";
      this.notify();
    }, 5000);
  }
};`
  );

  // 3. Mood Listener (SuperEngine → Mood Engine)
  const listenerFile = path.join(moodDir, "cityMoodListener.js");
  ensureFile(
    listenerFile,
    `import { cityMood } from "./cityMoodEngine";
import { superEngineClient } from "../../FE-21__Marketplace/utils/SuperEngineClient";

superEngineClient.subscribe(event => {
  cityMood.update(event);
});`
  );

  // 4. Mood Overlay UI
  const overlayFile = path.join(FE00, "views", "CityMoodOverlay.js");
  ensureFile(
    overlayFile,
    `import { useEffect, useState } from "react";
import { cityMood } from "../mood/cityMoodEngine";

export default function CityMoodOverlay() {
  const [mood, setMood] = useState(cityMood.mood);

  useEffect(() => {
    cityMood.subscribe(newMood => setMood(newMood));
  }, []);

  const colors = {
    Calm: "rgba(100, 150, 255, 0.2)",
    Creative: "rgba(255, 100, 200, 0.3)",
    Energetic: "rgba(255, 150, 0, 0.3)",
    Chaotic: "rgba(255, 0, 0, 0.3)",
    Focused: "rgba(0, 200, 255, 0.3)",
    Celebratory: "rgba(255, 215, 0, 0.3)"
  };

  return (
    <div
      className="city-mood-overlay"
      style={{
        position: "absolute",
        inset: 0,
        background: colors[mood] || colors.Calm,
        pointerEvents: "none",
        transition: "background 0.8s ease"
      }}
    />
  );
}`
  );

  // 5. Patch CityMapView to include mood overlay
  const mapViewFile = path.join(FE00, "views", "CityMapView.js");
  ensureFile(mapViewFile, `export default function CityMapView() { return "City Map"; }`);

  appendIfMissing(
    mapViewFile,
    "CityMoodOverlay",
    `import CityMoodOverlay from "./CityMoodOverlay";

export function CityMapWithMood() {
  return (
    <div className="city-map-with-mood">
      <CityMoodOverlay />
    </div>
  );
}`
  );

  console.log("=== City Mood Engine generator done ===");
}

if (require.main === module) {
  main();
}

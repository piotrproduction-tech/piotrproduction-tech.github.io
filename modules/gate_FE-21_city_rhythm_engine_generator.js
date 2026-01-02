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
  console.log("=== City Rhythm Engine generator start ===");

  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE‑00__City not found:", FE00);
    process.exit(1);
  }

  // 1. Ensure rhythm engine directory
  const rhythmDir = path.join(FE00, "rhythm");
  ensureDir(rhythmDir);

  // 2. Rhythm Engine
  const rhythmEngineFile = path.join(rhythmDir, "cityRhythmEngine.js");
  ensureFile(
    rhythmEngineFile,
    `import { cityPulse } from "../pulse/cityPulseEngine";
import { cityMood } from "../mood/cityMoodEngine";
import { cityHeatmap } from "../heatmap/cityHeatmapEngine";

export const cityRhythm = {
  rhythm: "MorningFlow",
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.rhythm));
  },

  update() {
    const bpm = cityPulse.bpm;
    const mood = cityMood.mood;

    // Determine rhythm based on pulse + mood
    if (mood === "Celebratory") {
      this.rhythm = "FestivalMode";
    } else if (bpm > 120) {
      this.rhythm = "NightCreators";
    } else if (bpm > 80) {
      this.rhythm = "EveningMarket";
    } else if (bpm > 50) {
      this.rhythm = "MiddayActivity";
    } else {
      this.rhythm = "MorningFlow";
    }

    this.notify();
  }
};

// Auto-update when pulse or mood changes
cityPulse.subscribe(() => cityRhythm.update());
cityMood.subscribe(() => cityRhythm.update());`
  );

  // 3. Rhythm Overlay UI
  const overlayFile = path.join(FE00, "views", "CityRhythmOverlay.js");
  ensureFile(
    overlayFile,
    `import { useEffect, useState } from "react";
import { cityRhythm } from "../rhythm/cityRhythmEngine";

export default function CityRhythmOverlay() {
  const [rhythm, setRhythm] = useState(cityRhythm.rhythm);

  useEffect(() => {
    cityRhythm.subscribe(newRhythm => setRhythm(newRhythm));
  }, []);

  const gradients = {
    MorningFlow: "linear-gradient(180deg, rgba(255,255,255,0.4), rgba(200,220,255,0.4))",
    MiddayActivity: "linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,230,150,0.4))",
    EveningMarket: "linear-gradient(180deg, rgba(255,180,120,0.3), rgba(255,120,80,0.4))",
    NightCreators: "linear-gradient(180deg, rgba(40,0,80,0.4), rgba(0,0,0,0.6))",
    FestivalMode: "linear-gradient(180deg, rgba(255,200,0,0.4), rgba(255,0,150,0.4))"
  };

  return (
    <div
      className="city-rhythm-overlay"
      style={{
        position: "absolute",
        inset: 0,
        background: gradients[rhythm] || gradients.MorningFlow,
        pointerEvents: "none",
        transition: "background 1s ease"
      }}
    />
  );
}`
  );

  // 4. Patch CityMapView to include rhythm overlay
  const mapViewFile = path.join(FE00, "views", "CityMapView.js");
  ensureFile(mapViewFile, `export default function CityMapView() { return "City Map"; }`);

  appendIfMissing(
    mapViewFile,
    "CityRhythmOverlay",
    `import CityRhythmOverlay from "./CityRhythmOverlay";

export function CityMapWithRhythm() {
  return (
    <div className="city-map-with-rhythm">
      <CityRhythmOverlay />
    </div>
  );
}`
  );

  console.log("=== City Rhythm Engine generator done ===");
}

if (require.main === module) {
  main();
}

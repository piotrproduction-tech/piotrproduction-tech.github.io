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
  console.log("=== City AI Engine generator start ===");

  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE‑00__City not found:", FE00);
    process.exit(1);
  }

  // 1. Ensure AI engine directory
  const aiDir = path.join(FE00, "ai");
  ensureDir(aiDir);

  // 2. City AI Engine
  const aiEngineFile = path.join(aiDir, "cityAIEngine.js");
  ensureFile(
    aiEngineFile,
    `import { cityMemory } from "../memory/cityMemoryEngine";
import { cityPulse } from "../pulse/cityPulseEngine";
import { cityMood } from "../mood/cityMoodEngine";
import { cityWeather } from "../weather/cityWeatherEngine";
import { cityRhythm } from "../rhythm/cityRhythmEngine";
import { cityBroadcast } from "../broadcast/cityBroadcastEngine";

export const cityAI = {
  listeners: [],
  predictions: {
    nextHotDistrict: null,
    nextMood: null,
    nextWeather: null
  },

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.predictions));
  },

  analyze() {
    const trends = cityMemory.trends;

    // Predict next hot district
    const sorted = Object.entries(trends).sort((a, b) => b[1] - a[1]);
    this.predictions.nextHotDistrict = sorted[0]?.[0] || "city";

    // Predict next mood
    if (cityPulse.bpm > 120) this.predictions.nextMood = "Energetic";
    else if (cityPulse.bpm > 80) this.predictions.nextMood = "Creative";
    else this.predictions.nextMood = "Calm";

    // Predict next weather
    if (cityPulse.bpm > 120) this.predictions.nextWeather = "NeonRain";
    else if (cityMood.mood === "Celebratory") this.predictions.nextWeather = "Fireworks";
    else this.predictions.nextWeather = "Clear";

    this.notify();

    // Intelligent reactions
    this.react();
  },

  react() {
    // If festival is trending → broadcast celebration
    if (this.predictions.nextHotDistrict === "festival") {
      cityBroadcast.push("Miasto przewiduje falę festiwalową!");
    }

    // If creator activity is rising → encourage creativity
    if (this.predictions.nextHotDistrict === "creator") {
      cityBroadcast.push("Twórcy przejmują miasto!");
    }

    // If marketplace is heating up → highlight deals
    if (this.predictions.nextHotDistrict === "marketplace") {
      cityBroadcast.push("Marketplace wchodzi w gorącą fazę!");
    }
  }
};

// Auto-run AI every 5 seconds
setInterval(() => cityAI.analyze(), 5000);`
  );

  // 3. AI Overlay UI
  const overlayFile = path.join(FE00, "views", "CityAIOverlay.js");
  ensureFile(
    overlayFile,
    `import { useEffect, useState } from "react";
import { cityAI } from "../ai/cityAIEngine";

export default function CityAIOverlay() {
  const [pred, setPred] = useState(cityAI.predictions);

  useEffect(() => {
    cityAI.subscribe(p => setPred({ ...p }));
  }, []);

  return (
    <div
      className="city-ai-overlay"
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        padding: "12px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        borderRadius: "10px",
        fontSize: "12px",
        width: "220px"
      }}
    >
      <strong>AI Przewidywania:</strong>
      <div>Następna aktywna dzielnica: {pred.nextHotDistrict}</div>
      <div>Nastrój miasta: {pred.nextMood}</div>
      <div>Pogoda: {pred.nextWeather}</div>
    </div>
  );
}`
  );

  // 4. Patch CityMapView to include AI overlay
  const mapViewFile = path.join(FE00, "views", "CityMapView.js");
  ensureFile(mapViewFile, `export default function CityMapView() { return "City Map"; }`);

  appendIfMissing(
    mapViewFile,
    "CityAIOverlay",
    `import CityAIOverlay from "./CityAIOverlay";

export function CityMapWithAI() {
  return (
    <div className="city-map-with-ai">
      <CityAIOverlay />
    </div>
  );
}`
  );

  console.log("=== City AI Engine generator done ===");
}

if (require.main === module) {
  main();
}

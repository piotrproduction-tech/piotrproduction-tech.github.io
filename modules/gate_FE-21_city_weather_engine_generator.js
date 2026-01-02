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
  console.log("=== City Weather Engine generator start ===");

  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE‑00__City not found:", FE00);
    process.exit(1);
  }

  // 1. Ensure weather engine directory
  const weatherDir = path.join(FE00, "weather");
  ensureDir(weatherDir);

  // 2. Weather Engine
  const weatherEngineFile = path.join(weatherDir, "cityWeatherEngine.js");
  ensureFile(
    weatherEngineFile,
    `import { cityPulse } from "../pulse/cityPulseEngine";
import { cityMood } from "../mood/cityMoodEngine";
import { cityHeatmap } from "../heatmap/cityHeatmapEngine";

export const cityWeather = {
  weather: "Clear",
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.weather));
  },

  update() {
    const bpm = cityPulse.bpm;
    const mood = cityMood.mood;

    // Determine weather based on pulse + mood
    if (bpm > 120) this.weather = "NeonRain";
    else if (bpm > 80) this.weather = "Sparks";
    else if (mood === "Creative") this.weather = "Aurora";
    else if (mood === "Celebratory") this.weather = "Fireworks";
    else if (mood === "Chaotic") this.weather = "Fog";
    else this.weather = "Clear";

    this.notify();
  }
};

// Auto-update when pulse or mood changes
cityPulse.subscribe(() => cityWeather.update());
cityMood.subscribe(() => cityWeather.update());`
  );

  // 3. Weather Overlay UI
  const overlayFile = path.join(FE00, "views", "CityWeatherOverlay.js");
  ensureFile(
    overlayFile,
    `import { useEffect, useState } from "react";
import { cityWeather } from "../weather/cityWeatherEngine";

export default function CityWeatherOverlay() {
  const [weather, setWeather] = useState(cityWeather.weather);

  useEffect(() => {
    cityWeather.subscribe(newWeather => setWeather(newWeather));
  }, []);

  const effects = {
    Clear: null,
    Fog: <div className="weather-fog" />,
    NeonRain: <div className="weather-neon-rain" />,
    Sparks: <div className="weather-sparks" />,
    Fireworks: <div className="weather-fireworks" />,
    Aurora: <div className="weather-aurora" />
  };

  return (
    <div className="city-weather-overlay">
      {effects[weather]}
    </div>
  );
}`
  );

  // 4. Patch CityMapView to include weather overlay
  const mapViewFile = path.join(FE00, "views", "CityMapView.js");
  ensureFile(mapViewFile, `export default function CityMapView() { return "City Map"; }`);

  appendIfMissing(
    mapViewFile,
    "CityWeatherOverlay",
    `import CityWeatherOverlay from "./CityWeatherOverlay";

export function CityMapWithWeather() {
  return (
    <div className="city-map-with-weather">
      <CityWeatherOverlay />
    </div>
  );
}`
  );

  console.log("=== City Weather Engine generator done ===");
}

if (require.main === module) {
  main();
}

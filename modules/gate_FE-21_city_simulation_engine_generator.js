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
  const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
  if (!content.includes(marker)) {
    fs.writeFileSync(filePath, content + "\n" + block, "utf8");
    console.log("[INTEGRATION] added:", marker);
  } else {
    console.log("[SKIP] already integrated:", marker);
  }
}

function main() {
  console.log("=== City Simulation Engine generator start ===");

  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE-00__City not found at:", FE00);
    process.exit(1);
  }

  const simDir = path.join(FE00, "simulation");
  ensureDir(simDir);

  //
  // 1. City Simulation Engine
  //
  const simEngineFile = path.join(simDir, "citySimulationEngine.js");
  ensureFile(
    simEngineFile,
    `import { cityPulse } from "../pulse/cityPulseEngine";
import { cityMood } from "../mood/cityMoodEngine";
import { cityWeather } from "../weather/cityWeatherEngine";
import { cityRhythm } from "../rhythm/cityRhythmEngine";
import { cityMemory } from "../memory/cityMemoryEngine";
import { cityAI } from "../ai/cityAIEngine";

export const citySimulation = {
  tick: 0,
  listeners: [],
  lastSimulatedEvent: null,

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this));
  },

  simulate() {
    this.tick++;

    const pulse = cityPulse.bpm;
    const mood = cityMood.mood;
    const weather = cityWeather.weather;
    const rhythm = cityRhythm.rhythm;
    const ai = cityAI.predictions;

    // Wybór dzielnicy na podstawie AI
    const district = ai.nextHotDistrict || "city";

    // Intensywność aktywności
    const intensity =
      (pulse > 120 ? 3 : pulse > 80 ? 2 : 1) +
      (mood === "Creative" ? 1 : 0) +
      (weather === "NeonRain" ? 1 : 0);

    // Typy aktywności symulowanych
    const activityTypes = {
      marketplace: ["marketplace.trade", "marketplace.offer", "marketplace.view"],
      creator: ["creator.publish", "creator.like", "creator.share"],
      street: ["street.signal", "street.discovery", "street.movement"],
      festival: ["festival.entry", "festival.vote", "festival.reward"],
      community: ["community.chat", "community.join", "community.react"]
    };

    const possible = activityTypes[district] || activityTypes["community"];
    const eventType = possible[Math.floor(Math.random() * possible.length)];

    const event = {
      type: eventType,
      payload: {
        userId: "sim_user_" + Math.floor(Math.random() * 50),
        intensity,
        district
      }
    };

    this.lastSimulatedEvent = event;

    // Zapis do pamięci miasta
    cityMemory.record(event);

    this.notify();
  }
};

// Auto-symulacja co 4 sekundy
setInterval(() => citySimulation.simulate(), 4000);`
  );

  //
  // 2. Simulation Overlay UI
  //
  const overlayFile = path.join(FE00, "views", "CitySimulationOverlay.js");
  ensureFile(
    overlayFile,
    `import { useEffect, useState } from "react";
import { citySimulation } from "../simulation/citySimulationEngine";

export default function CitySimulationOverlay() {
  const [sim, setSim] = useState(citySimulation);

  useEffect(() => {
    citySimulation.subscribe(s => setSim({ ...s }));
  }, []);

  return (
    <div
      className="city-simulation-overlay"
      style={{
        position: "absolute",
        top: "290px",
        right: "20px",
        padding: "12px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        borderRadius: "10px",
        fontSize: "12px",
        width: "260px"
      }}
    >
      <strong>Symulacja miasta:</strong>
      <div>Tick: {sim.tick}</div>
      {sim.lastSimulatedEvent ? (
        <div style={{ marginTop: "6px" }}>
          <div>Ostatni event:</div>
          <div>{sim.lastSimulatedEvent.type}</div>
          <div>Dzielnica: {sim.lastSimulatedEvent.payload.district}</div>
          <div>Intensywność: {sim.lastSimulatedEvent.payload.intensity}</div>
        </div>
      ) : (
        <div>Brak danych symulacji.</div>
      )}
    </div>
  );
}`
  );

  //
  // 3. Patch CityMapView
  //
  const mapViewFile = path.join(FE00, "views", "CityMapView.js");
  ensureFile(mapViewFile, `export default function CityMapView() { return "City Map"; }`);

  appendIfMissing(
    mapViewFile,
    "CitySimulationOverlay",
    `import CitySimulationOverlay from "./CitySimulationOverlay";

export function CityMapWithSimulation() {
  return (
    <div className="city-map-with-simulation">
      <CitySimulationOverlay />
    </div>
  );
}`
  );

  console.log("=== City Simulation Engine generator done ===");
}

if (require.main === module) {
  main();
}

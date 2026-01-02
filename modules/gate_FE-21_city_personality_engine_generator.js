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
  console.log("=== City Personality Engine generator start ===");

  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE‑00__City not found:", FE00);
    process.exit(1);
  }

  // 1. Ensure personality engine directory
  const personalityDir = path.join(FE00, "personality");
  ensureDir(personalityDir);

  // 2. Personality Engine
  const personalityEngineFile = path.join(personalityDir, "cityPersonalityEngine.js");
  ensureFile(
    personalityEngineFile,
    `import { cityMood } from "../mood/cityMoodEngine";
import { cityWeather } from "../weather/cityWeatherEngine";
import { cityRhythm } from "../rhythm/cityRhythmEngine";
import { cityPulse } from "../pulse/cityPulseEngine";

export const cityPersonality = {
  personality: "Neutral",
  listeners: [],

  profiles: {
    Neutral: {
      tone: "neutralny",
      style: "informacyjny",
      emoji: "🏙️",
      broadcastPrefix: "Info:"
    },
    Energetic: {
      tone: "dynamiczny",
      style: "ekscytujący",
      emoji: "⚡",
      broadcastPrefix: "🔥 Boom!"
    },
    Creative: {
      tone: "artystyczny",
      style: "inspirujący",
      emoji: "🎨",
      broadcastPrefix: "✨ Inspiracja:"
    },
    Calm: {
      tone: "spokojny",
      style: "łagodny",
      emoji: "🌙",
      broadcastPrefix: "🌿 Spokój:"
    },
    Chaotic: {
      tone: "dziki",
      style: "nieprzewidywalny",
      emoji: "🌪️",
      broadcastPrefix: "💥 Chaos!"
    },
    Celebratory: {
      tone: "świąteczny",
      style: "radosny",
      emoji: "🎉",
      broadcastPrefix: "🎊 Świętujemy!"
    }
  },

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.personality));
  },

  update() {
    const mood = cityMood.mood;
    const weather = cityWeather.weather;
    const rhythm = cityRhythm.rhythm;
    const bpm = cityPulse.bpm;

    // Determine personality
    if (mood === "Celebratory") this.personality = "Celebratory";
    else if (mood === "Creative") this.personality = "Creative";
    else if (bpm > 120) this.personality = "Energetic";
    else if (weather === "Fog") this.personality = "Chaotic";
    else if (rhythm === "NightCreators") this.personality = "Calm";
    else this.personality = "Neutral";

    this.notify();
  }
};

// Auto-update personality when global systems change
cityMood.subscribe(() => cityPersonality.update());
cityWeather.subscribe(() => cityPersonality.update());
cityRhythm.subscribe(() => cityPersonality.update());
cityPulse.subscribe(() => cityPersonality.update());`
  );

  // 3. Personality‑Driven Broadcast Adapter
  const broadcastAdapterFile = path.join(personalityDir, "cityPersonalityBroadcastAdapter.js");
  ensureFile(
    broadcastAdapterFile,
    `import { cityBroadcast } from "../broadcast/cityBroadcastEngine";
import { cityPersonality } from "./cityPersonalityEngine";

export function personalityBroadcast(message) {
  const profile = cityPersonality.profiles[cityPersonality.personality];
  const finalMessage = \`\${profile.emoji} \${profile.broadcastPrefix} \${message}\`;
  cityBroadcast.push(finalMessage);
}`
  );

  // 4. Personality Overlay UI
  const overlayFile = path.join(FE00, "views", "CityPersonalityOverlay.js");
  ensureFile(
    overlayFile,
    `import { useEffect, useState } from "react";
import { cityPersonality } from "../personality/cityPersonalityEngine";

export default function CityPersonalityOverlay() {
  const [p, setP] = useState(cityPersonality.personality);

  useEffect(() => {
    cityPersonality.subscribe(newP => setP(newP));
  }, []);

  return (
    <div
      className="city-personality-overlay"
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        padding: "10px 14px",
        background: "rgba(0,0,0,0.5)",
        color: "white",
        borderRadius: "8px",
        fontSize: "12px"
      }}
    >
      Charakter miasta: {p}
    </div>
  );
}`
  );

  // 5. Patch CityMapView to include personality overlay
  const mapViewFile = path.join(FE00, "views", "CityMapView.js");
  ensureFile(mapViewFile, `export default function CityMapView() { return "City Map"; }`);

  appendIfMissing(
    mapViewFile,
    "CityPersonalityOverlay",
    `import CityPersonalityOverlay from "./CityPersonalityOverlay";

export function CityMapWithPersonality() {
  return (
    <div className="city-map-with-personality">
      <CityPersonalityOverlay />
    </div>
  );
}`
  );

  console.log("=== City Personality Engine generator done ===");
}

if (require.main === module) {
  main();
}

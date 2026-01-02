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
  console.log("=== City Narrative Engine generator start ===");

  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE‑00__City not found:", FE00);
    process.exit(1);
  }

  // 1. Ensure narrative engine directory
  const narrativeDir = path.join(FE00, "narrative");
  ensureDir(narrativeDir);

  // 2. Narrative Engine
  const narrativeEngineFile = path.join(narrativeDir, "cityNarrativeEngine.js");
  ensureFile(
    narrativeEngineFile,
    `import { cityMemory } from "../memory/cityMemoryEngine";
import { cityPersonality } from "../personality/cityPersonalityEngine";
import { cityAI } from "../ai/cityAIEngine";

export const cityNarrative = {
  stories: [],
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this.stories));
  },

  generateStory(event) {
    const personality = cityPersonality.personality;
    const pred = cityAI.predictions;

    const templates = {
      Neutral: (e) => \`W mieście wydarzyło się: \${e.type}.\`,
      Energetic: (e) => \`⚡ Miasto pulsuje! Właśnie nastąpiło: \${e.type}.\`,
      Creative: (e) => \`🎨 Na ulicach pojawiła się nowa inspiracja: \${e.type}.\`,
      Calm: (e) => \`🌙 W ciszy miasta pojawił się subtelny ruch: \${e.type}.\`,
      Chaotic: (e) => \`🌪️ Chaos przetacza się przez miasto! Event: \${e.type}.\`,
      Celebratory: (e) => \`🎉 Miasto świętuje! Wydarzenie: \${e.type}.\`
    };

    const base = templates[personality](event);

    const extended = \`\${base} 
Miasto przewiduje, że kolejna aktywna dzielnica to: \${pred.nextHotDistrict}.\`;

    this.stories.push({
      text: extended,
      timestamp: Date.now()
    });

    this.notify();
  }
};

// Auto-generate narrative when memory records an event
cityMemory.subscribe(mem => {
  const last = mem.events[mem.events.length - 1];
  if (last) cityNarrative.generateStory(last);
});`
  );

  // 3. Narrative Overlay UI
  const overlayFile = path.join(FE00, "views", "CityNarrativeOverlay.js");
  ensureFile(
    overlayFile,
    `import { useEffect, useState } from "react";
import { cityNarrative } from "../narrative/cityNarrativeEngine";

export default function CityNarrativeOverlay() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    cityNarrative.subscribe(s => setStories([...s].slice(-3)));
  }, []);

  return (
    <div
      className="city-narrative-overlay"
      style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        padding: "12px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        borderRadius: "10px",
        fontSize: "12px",
        width: "260px"
      }}
    >
      <strong>Ostatnie historie miasta:</strong>
      <ul style={{ margin: 0, paddingLeft: "16px" }}>
        {stories.map((s, i) => (
          <li key={i}>{s.text}</li>
        ))}
      </ul>
    </div>
  );
}`
  );

  // 4. Patch CityMapView to include narrative overlay
  const mapViewFile = path.join(FE00, "views", "CityMapView.js");
  ensureFile(mapViewFile, `export default function CityMapView() { return "City Map"; }`);

  appendIfMissing(
    mapViewFile,
    "CityNarrativeOverlay",
    `import CityNarrativeOverlay from "./CityNarrativeOverlay";

export function CityMapWithNarrative() {
  return (
    <div className="city-map-with-narrative">
      <CityNarrativeOverlay />
    </div>
  );
}`
  );

  console.log("=== City Narrative Engine generator done ===");
}

if (require.main === module) {
  main();
}

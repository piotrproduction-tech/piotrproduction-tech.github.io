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
  console.log("=== City Emergence Engine generator start ===");

  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE-00__City not found at:", FE00);
    process.exit(1);
  }

  const emergDir = path.join(FE00, "emergence");
  ensureDir(emergDir);

  //
  // 1. City Emergence Engine
  //
  const emergEngineFile = path.join(emergDir, "cityEmergenceEngine.js");
  ensureFile(
    emergEngineFile,
    `import { citySimulation } from "../simulation/citySimulationEngine";
import { cityEconomy } from "../economy/cityEconomyEngine";
import { cityReputation } from "../reputation/cityReputationEngine";
import { cityGovernance } from "../governance/cityGovernanceEngine";
import { cityNarrative } from "../narrative/cityNarrativeEngine";
import { cityBroadcast } from "../broadcast/cityBroadcastEngine";
import { cityPersonality } from "../personality/cityPersonalityEngine";
import { cityAI } from "../ai/cityAIEngine";

export const cityEmergence = {
  tick: 0,
  patterns: [],
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this));
  },

  detectPatterns() {
    this.tick++;

    const econ = cityEconomy;
    const rep = cityReputation;
    const gov = cityGovernance;
    const sim = citySimulation;
    const ai = cityAI.predictions;

    const cycle = econ.cycle;
    const topUsers = Object.entries(rep.users || {})
      .sort(([, a], [, b]) => b.score - a.score)
      .slice(0, 3)
      .map(([id]) => id);

    const activeProposals = (gov.activeVotes || []).length;
    const lastSim = sim.lastSimulatedEvent;

    const pattern = {
      tick: this.tick,
      cycle,
      topUsers,
      activeProposals,
      lastSimType: lastSim?.type || null,
      lastSimDistrict: lastSim?.payload?.district || null,
      predictedHotDistrict: ai.nextHotDistrict || null
    };

    this.patterns.push(pattern);
    this.react(pattern);
    this.notify();
  },

  react(pattern) {
    const personality = cityPersonality.personality;

    // Przykładowe emergentne zachowania:
    // 1. Jeśli BOOM + dużo głosowań → miasto ogłasza "społeczną falę"
    if (pattern.cycle === "Boom" && pattern.activeProposals >= 3) {
      const msg =
        personality === "Energetic"
          ? "⚡ Miasto wchodzi w społeczną hiperaktywność!"
          : "Miasto doświadcza fali społecznej aktywności.";
      cityBroadcast.push(msg);
    }

    // 2. Jeśli Drop + brak głosowań + brak top userów → miasto sygnalizuje stagnację
    if (pattern.cycle === "Drop" && pattern.activeProposals === 0 && pattern.topUsers.length === 0) {
      const msg =
        personality === "Calm"
          ? "🌙 Miasto zapada w spokojną stagnację."
          : "Miasto doświadcza okresu stagnacji.";
      cityBroadcast.push(msg);
    }

    // 3. Jeśli powtarza się ten sam district w symulacji + AI wskazuje ten sam → miasto tworzy "hot zone"
    if (
      pattern.lastSimDistrict &&
      pattern.predictedHotDistrict &&
      pattern.lastSimDistrict === pattern.predictedHotDistrict
    ) {
      const msg =
        personality === "Creative"
          ? \`🎨 Dzielnica \${pattern.lastSimDistrict} staje się kreatywną hot‑zoną miasta.\`
          : \`Dzielnica \${pattern.lastSimDistrict} staje się strefą wysokiej aktywności.\`;
      cityBroadcast.push(msg);

      // Możemy też dodać mikro‑historię
      cityNarrative.stories.push({
        text: \`Miasto rozpoznaje nowy wzór: dzielnica \${pattern.lastSimDistrict} przyciąga coraz więcej aktywności.\`,
        timestamp: Date.now()
      });
    }
  }
};

// Detekcja wzorców co 10 sekund
setInterval(() => cityEmergence.detectPatterns(), 10000);`
  );

  //
  // 2. Emergence Overlay UI
  //
  const overlayFile = path.join(FE00, "views", "CityEmergenceOverlay.js");
  ensureFile(
    overlayFile,
    `import { useEffect, useState } from "react";
import { cityEmergence } from "../emergence/cityEmergenceEngine";

export default function CityEmergenceOverlay() {
  const [snapshot, setSnapshot] = useState({ tick: 0, patterns: [] });

  useEffect(() => {
    cityEmergence.subscribe(e => {
      setSnapshot({
        tick: e.tick,
        patterns: [...e.patterns].slice(-3)
      });
    });
  }, []);

  return (
    <div
      className="city-emergence-overlay"
      style={{
        position: "absolute",
        top: "360px",
        right: "20px",
        padding: "12px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        borderRadius: "10px",
        fontSize: "12px",
        width: "260px"
      }}
    >
      <strong>Emergentne wzorce miasta:</strong>
      <div>Tick: {snapshot.tick}</div>
      {snapshot.patterns.length === 0 ? (
        <div>Brak wykrytych wzorców.</div>
      ) : (
        <ul style={{ margin: "8px 0 0", paddingLeft: "16px" }}>
          {snapshot.patterns.map((p, i) => (
            <li key={i}>
              Cykl: {p.cycle}, hot: {p.predictedHotDistrict || "—"}, głosowań: {p.activeProposals}
            </li>
          ))}
        </ul>
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
    "CityEmergenceOverlay",
    `import CityEmergenceOverlay from "./CityEmergenceOverlay";

export function CityMapWithEmergence() {
  return (
    <div className="city-map-with-emergence">
      <CityEmergenceOverlay />
    </div>
  );
}`
  );

  console.log("=== City Emergence Engine generator done ===");
}

if (require.main === module) {
  main();
}

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
  console.log("=== City Economy Engine generator start ===");

  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE‑00__City not found:", FE00);
    process.exit(1);
  }

  const economyDir = path.join(FE00, "economy");
  ensureDir(economyDir);

  //
  // 1. Economy Engine (tokeny, popyt, podaż, inflacja, cykle)
  //
  const economyEngineFile = path.join(economyDir, "cityEconomyEngine.js");
  ensureFile(
    economyEngineFile,
    `import { cityMemory } from "../memory/cityMemoryEngine";
import { cityAI } from "../ai/cityAIEngine";
import { cityBroadcast } from "../broadcast/cityBroadcastEngine";
import { cityPersonality } from "../personality/cityPersonalityEngine";

export const cityEconomy = {
  tokens: {
    GATE: { supply: 0, demand: 0, price: 1 },
    CREA: { supply: 0, demand: 0, price: 1 },
    STREET: { supply: 0, demand: 0, price: 1 },
    FEST: { supply: 0, demand: 0, price: 1 }
  },
  inflation: {
    GATE: 0,
    CREA: 0,
    STREET: 0,
    FEST: 0
  },
  cycle: "Stable", // Boom, Stable, Drop, Recovery
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this));
  },

  registerDemand(token, amount) {
    if (!this.tokens[token]) return;
    this.tokens[token].demand += amount;
    this.recalculate(token);
  },

  registerSupply(token, amount) {
    if (!this.tokens[token]) return;
    this.tokens[token].supply += amount;
    this.recalculate(token);
  },

  recalculate(token) {
    const t = this.tokens[token];
    const demand = t.demand || 1;
    const supply = t.supply || 1;

    // Prosty model ceny: popyt / podaż
    t.price = Math.max(0.01, demand / supply);

    // Inflacja: gdy podaż > popyt
    this.inflation[token] = supply > demand ? (supply - demand) / supply : 0;

    this.updateCycle();
    this.notify();
  },

  updateCycle() {
    const totalDemand = Object.values(this.tokens).reduce((acc, t) => acc + t.demand, 0);
    const totalSupply = Object.values(this.tokens).reduce((acc, t) => acc + t.supply, 0);

    if (totalDemand > totalSupply * 1.3) this.cycle = "Boom";
    else if (totalSupply > totalDemand * 1.3) this.cycle = "Drop";
    else if (this.cycle === "Drop" && totalDemand >= totalSupply) this.cycle = "Recovery";
    else this.cycle = "Stable";

    this.reactToCycle();
  },

  reactToCycle() {
    const personality = cityPersonality.personality;

    const prefixMap = {
      Neutral: "Ekonomia:",
      Energetic: "⚡ Rynek:",
      Creative: "🎨 Ekonomia twórców:",
      Calm: "🌙 Rynek spokojny:",
      Chaotic: "🌪️ Rynek szaleje:",
      Celebratory: "🎉 Ekonomia świętuje:"
    };

    const prefix = prefixMap[personality] || "Ekonomia:";

    if (this.cycle === "Boom") {
      cityBroadcast.push(\`\${prefix} miasto wchodzi w fazę BOOM.\`);
    } else if (this.cycle === "Drop") {
      cityBroadcast.push(\`\${prefix} rynek wchodzi w fazę spadku.\`);
    } else if (this.cycle === "Recovery") {
      cityBroadcast.push(\`\${prefix} rynek odbija po spadku.\`);
    }
  }
};

// Integracja z CityMemory: eventy → popyt/podaż
cityMemory.subscribe(mem => {
  const last = mem.events[mem.events.length - 1];
  if (!last) return;

  const prefix = last.type.split(".")[0];

  // Prosty mapping eventów na tokeny
  if (prefix === "marketplace") {
    cityEconomy.registerDemand("GATE", 1);
    cityEconomy.registerDemand("CREA", 1);
  }

  if (prefix === "creator") {
    cityEconomy.registerDemand("CREA", 2);
  }

  if (prefix === "street") {
    cityEconomy.registerDemand("STREET", 1);
  }

  if (prefix === "festival") {
    cityEconomy.registerDemand("FEST", 2);
  }

  if (prefix === "community") {
    cityEconomy.registerDemand("GATE", 0.5);
  }
});`
  );

  //
  // 2. Economy Listener (opcjonalny adapter pod przyszłe rozszerzenia)
  //
  const economyListenerFile = path.join(economyDir, "cityEconomyListener.js");
  ensureFile(
    economyListenerFile,
    `import { cityEconomy } from "./cityEconomyEngine";
import { cityAI } from "../ai/cityAIEngine";

// Prosty hook: AI może reagować na stan ekonomii
cityEconomy.subscribe(econ => {
  // Przykład: jeśli BOOM → AI może przewidywać wzrost aktywności
  if (econ.cycle === "Boom") {
    cityAI.predictions.nextMood = "Energetic";
  }
});`
  );

  //
  // 3. Economy Overlay UI
  //
  const overlayFile = path.join(FE00, "views", "CityEconomyOverlay.js");
  ensureFile(
    overlayFile,
    `import { useEffect, useState } from "react";
import { cityEconomy } from "../economy/cityEconomyEngine";

export default function CityEconomyOverlay() {
  const [econ, setEcon] = useState(cityEconomy);

  useEffect(() => {
    cityEconomy.subscribe(e => setEcon({ ...e }));
  }, []);

  const tokens = econ.tokens || {};
  const inflation = econ.inflation || {};

  return (
    <div
      className="city-economy-overlay"
      style={{
        position: "absolute",
        top: "80px",
        right: "20px",
        padding: "12px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        borderRadius: "10px",
        fontSize: "12px",
        width: "260px"
      }}
    >
      <strong>Ekonomia miasta:</strong>
      <div>Cykl: {econ.cycle}</div>
      <ul style={{ margin: "8px 0 0", paddingLeft: "16px" }}>
        {Object.entries(tokens).map(([symbol, data]) => (
          <li key={symbol}>
            {symbol}: cena {data.price.toFixed(2)}, popyt {data.demand}, podaż {data.supply}, inflacja{" "}
            {Math.round((inflation[symbol] || 0) * 100)}%
          </li>
        ))}
      </ul>
    </div>
  );
}`
  );

  //
  // 4. Patch CityMapView – dodanie overlay ekonomii
  //
  const mapViewFile = path.join(FE00, "views", "CityMapView.js");
  ensureFile(mapViewFile, `export default function CityMapView() { return "City Map"; }`);

  appendIfMissing(
    mapViewFile,
    "CityEconomyOverlay",
    `import CityEconomyOverlay from "./CityEconomyOverlay";

export function CityMapWithEconomy() {
  return (
    <div className="city-map-with-economy">
      <CityEconomyOverlay />
    </div>
  );
}`
  );

  console.log("=== City Economy Engine generator done ===");
}

if (require.main === module) {
  main();
}

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APPS = path.join(ROOT, "apps");

// Poprawna zmienna FE00
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
  console.log("=== City Reputation Engine generator start ===");

  // Poprawiona walidacja
  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE-00__City not found at:", FE00);
    process.exit(1);
  }

  const reputationDir = path.join(FE00, "reputation");
  ensureDir(reputationDir);

  //
  // 1. City Reputation Engine
  //
  const reputationEngineFile = path.join(reputationDir, "cityReputationEngine.js");
  ensureFile(
    reputationEngineFile,
    `import { cityMemory } from "../memory/cityMemoryEngine";
import { cityBroadcast } from "../broadcast/cityBroadcastEngine";
import { cityPersonality } from "../personality/cityPersonalityEngine";

export const cityReputation = {
  users: {},
  levels: [
    { id: "newcomer", label: "Newcomer", minScore: 0 },
    { id: "citizen", label: "Citizen", minScore: 10 },
    { id: "creator", label: "Creator", minScore: 30 },
    { id: "trusted", label: "Trusted", minScore: 80 },
    { id: "veteran", label: "Veteran", minScore: 150 },
    { id: "legend", label: "Legend", minScore: 300 }
  ],
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this));
  },

  ensureUser(userId) {
    if (!this.users[userId]) {
      this.users[userId] = {
        score: 0,
        level: "newcomer",
        history: []
      };
    }
    return this.users[userId];
  },

  addReputation(userId, amount, reason, sourceEvent) {
    const user = this.ensureUser(userId);
    user.score = Math.max(0, user.score + amount);
    user.history.push({
      delta: amount,
      reason,
      eventType: sourceEvent?.type || null,
      timestamp: Date.now()
    });

    const oldLevel = user.level;
    user.level = this.resolveLevel(user.score);

    if (oldLevel !== user.level) {
      this.announceLevelUp(userId, user.level);
    }

    this.notify();
  },

  resolveLevel(score) {
    let current = this.levels[0].id;
    for (const lvl of this.levels) {
      if (score >= lvl.minScore) current = lvl.id;
    }
    return current;
  },

  announceLevelUp(userId, levelId) {
    const level = this.levels.find(l => l.id === levelId);
    if (!level) return;

    const personality = cityPersonality.personality;

    const prefixMap = {
      Neutral: "Reputacja:",
      Energetic: "⚡ Awans reputacji!",
      Creative: "🎨 Nowy poziom twórcy!",
      Calm: "🌙 Spokojny awans:",
      Chaotic: "🌪️ Reputacja eksploduje:",
      Celebratory: "🎉 Wielki awans reputacji!"
    };

    const prefix = prefixMap[personality] || "Reputacja:";
    const msg = \`\${prefix} Użytkownik \${userId} osiągnął poziom: \${level.label}.\`;

    cityBroadcast.push(msg);
  }
};

// Integracja z CityMemory: eventy → reputacja
cityMemory.subscribe(mem => {
  const last = mem.events[mem.events.length - 1];
  if (!last) return;

  const prefix = last.type.split(".")[0];
  const payload = last.payload || {};
  const userId = payload.userId || payload.creatorId || payload.ownerId || "anon";

  if (prefix === "creator") {
    cityReputation.addReputation(userId, 3, "Aktywność twórcza", last);
  }

  if (prefix === "marketplace") {
    cityReputation.addReputation(userId, 2, "Aktywność rynkowa", last);
  }

  if (prefix === "community") {
    cityReputation.addReputation(userId, 1, "Aktywność społecznościowa", last);
  }

  if (prefix === "festival") {
    cityReputation.addReputation(userId, 5, "Aktywność festiwalowa", last);
  }

  if (prefix === "street") {
    cityReputation.addReputation(userId, 1, "Aktywność uliczna", last);
  }
});`
  );

  //
  // 2. Reputation Overlay UI
  //
  const overlayFile = path.join(FE00, "views", "CityReputationOverlay.js");
  ensureFile(
    overlayFile,
    `import { useEffect, useState } from "react";
import { cityReputation } from "../reputation/cityReputationEngine";

export default function CityReputationOverlay() {
  const [snapshot, setSnapshot] = useState({ users: {}, levels: [] });

  useEffect(() => {
    cityReputation.subscribe(rep => {
      setSnapshot({
        users: { ...rep.users },
        levels: [...rep.levels]
      });
    });
  }, []);

  const users = Object.entries(snapshot.users)
    .sort(([, a], [, b]) => b.score - a.score)
    .slice(0, 5);

  return (
    <div
      className="city-reputation-overlay"
      style={{
        position: "absolute",
        top: "150px",
        right: "20px",
        padding: "12px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        borderRadius: "10px",
        fontSize: "12px",
        width: "260px"
      }}
    >
      <strong>Top reputacja miasta:</strong>
      {users.length === 0 ? (
        <div>Brak danych reputacji.</div>
      ) : (
        <ul style={{ margin: "8px 0 0", paddingLeft: "16px" }}>
          {users.map(([id, data]) => (
            <li key={id}>
              {id}: {data.score} pkt, poziom {data.level}
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
    "CityReputationOverlay",
    `import CityReputationOverlay from "./CityReputationOverlay";

export function CityMapWithReputation() {
  return (
    <div className="city-map-with-reputation">
      <CityReputationOverlay />
    </div>
  );
}`
  );

  console.log("=== City Reputation Engine generator done ===");
}

if (require.main === module) {
  main();
}

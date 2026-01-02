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
  console.log("=== City Governance Engine generator start ===");

  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE-00__City not found at:", FE00);
    process.exit(1);
  }

  const govDir = path.join(FE00, "governance");
  ensureDir(govDir);

  //
  // 1. Governance Engine
  //
  const govEngineFile = path.join(govDir, "cityGovernanceEngine.js");
  ensureFile(
    govEngineFile,
    `import { cityReputation } from "../reputation/cityReputationEngine";
import { cityBroadcast } from "../broadcast/cityBroadcastEngine";
import { cityPersonality } from "../personality/cityPersonalityEngine";

export const cityGovernance = {
  proposals: [],
  activeVotes: [],
  listeners: [],

  subscribe(cb) {
    this.listeners.push(cb);
  },

  notify() {
    this.listeners.forEach(cb => cb(this));
  },

  // Tylko te typy są dozwolone
  allowedTypes: ["grant", "nomination", "award"],

  createProposal(type, payload) {
    if (!this.allowedTypes.includes(type)) {
      console.warn("Proposal type not allowed:", type);
      return null;
    }

    const proposal = {
      id: "prop_" + Date.now(),
      type,
      payload,
      votes: {},
      createdAt: Date.now(),
      status: "active"
    };

    this.proposals.push(proposal);
    this.activeVotes.push(proposal);

    this.announceProposal(proposal);
    this.notify();

    return proposal;
  },

  vote(proposalId, userId, value) {
    const proposal = this.activeVotes.find(p => p.id === proposalId);
    if (!proposal) return;

    const rep = cityReputation.users[userId]?.score || 0;
    const weight = Math.max(1, Math.floor(rep / 10)); // reputacja = waga głosu

    proposal.votes[userId] = { value, weight };

    this.notify();
  },

  closeProposal(proposalId) {
    const proposal = this.activeVotes.find(p => p.id === proposalId);
    if (!proposal) return;

    proposal.status = "closed";

    const result = this.calculateResult(proposal);
    this.announceResult(proposal, result);

    this.activeVotes = this.activeVotes.filter(p => p.id !== proposalId);
    this.notify();

    return result;
  },

  calculateResult(proposal) {
    let yes = 0;
    let no = 0;

    Object.values(proposal.votes).forEach(v => {
      if (v.value === "yes") yes += v.weight;
      else no += v.weight;
    });

    return yes >= no ? "accepted" : "rejected";
  },

  announceProposal(proposal) {
    const personality = cityPersonality.personality;

    const prefixMap = {
      Neutral: "Nowa propozycja:",
      Energetic: "⚡ Nowa inicjatywa społeczności!",
      Creative: "🎨 Nowa propozycja twórcza!",
      Calm: "🌙 Spokojna inicjatywa:",
      Chaotic: "🌪️ Burzliwa propozycja!",
      Celebratory: "🎉 Propozycja do świętowania!"
    };

    const prefix = prefixMap[personality] || "Propozycja:";
    const msg = \`\${prefix} \${proposal.type} — głosowanie otwarte.\`;

    cityBroadcast.push(msg);
  },

  announceResult(proposal, result) {
    const personality = cityPersonality.personality;

    const prefixMap = {
      Neutral: "Wynik głosowania:",
      Energetic: "⚡ Wynik!",
      Creative: "🎨 Decyzja społeczności:",
      Calm: "🌙 Wynik głosowania:",
      Chaotic: "🌪️ Wynik!",
      Celebratory: "🎉 Wynik głosowania!"
    };

    const prefix = prefixMap[personality] || "Wynik:";
    const msg = \`\${prefix} \${proposal.type} → \${result}.\`;

    cityBroadcast.push(msg);
  }
};`
  );

  //
  // 2. Governance Overlay UI
  //
  const overlayFile = path.join(FE00, "views", "CityGovernanceOverlay.js");
  ensureFile(
    overlayFile,
    `import { useEffect, useState } from "react";
import { cityGovernance } from "../governance/cityGovernanceEngine";

export default function CityGovernanceOverlay() {
  const [snapshot, setSnapshot] = useState({ proposals: [], activeVotes: [] });

  useEffect(() => {
    cityGovernance.subscribe(g => {
      setSnapshot({
        proposals: [...g.proposals],
        activeVotes: [...g.activeVotes]
      });
    });
  }, []);

  return (
    <div
      className="city-governance-overlay"
      style={{
        position: "absolute",
        top: "220px",
        right: "20px",
        padding: "12px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        borderRadius: "10px",
        fontSize: "12px",
        width: "260px"
      }}
    >
      <strong>Głosowania społeczności:</strong>
      {snapshot.activeVotes.length === 0 ? (
        <div>Brak aktywnych głosowań.</div>
      ) : (
        <ul style={{ margin: "8px 0 0", paddingLeft: "16px" }}>
          {snapshot.activeVotes.map(p => (
            <li key={p.id}>
              {p.type} — {Object.keys(p.votes).length} głosów
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
    "CityGovernanceOverlay",
    `import CityGovernanceOverlay from "./CityGovernanceOverlay";

export function CityMapWithGovernance() {
  return (
    <div className="city-map-with-governance">
      <CityGovernanceOverlay />
    </div>
  );
}`
  );

  console.log("=== City Governance Engine generator done ===");
}

if (require.main === module) {
  main();
}

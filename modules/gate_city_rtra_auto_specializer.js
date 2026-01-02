/**
 * FAZA 4C — ETAP 2.7
 * RTRA AUTO‑SPECIALIZER
 *
 * Automatyczna konfiguracja:
 *  - Reputacja
 *  - Tokeny
 *  - Nagrody
 *  - Anti‑Abuse
 *
 * dla każdego modułu BE‑XX na podstawie districtType.
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BACKEND = path.join(ROOT, "backend");

function loadJSON(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function saveJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log("💾 Zapisano:", path.relative(ROOT, file));
}

function getBackendModules() {
  return fs
    .readdirSync(BACKEND)
    .filter((f) => /^BE-\d+__/.test(f))
    .map((f) => ({
      id: f.split("__")[0],
      name: f.split("__")[1],
      dir: path.join(BACKEND, f)
    }));
}

// ---------------------------------------------
// PRESETY PER DISTRICT TYPE
// ---------------------------------------------
const PRESETS = {
  community: {
    reputation: {
      created: 5,
      joined: 10,
      volunteer: 15,
      event: 8
    },
    tokens: {
      created: 3,
      joined: 5,
      volunteer: 10
    },
    rewards: [
      { id: "helper", name: "Community Helper", minReputation: 20, minTokens: 30 },
      { id: "leader", name: "Community Leader", minReputation: 60, minTokens: 80 }
    ],
    abuse: ["spam", "troll", "harassment"]
  },

  marketplace: {
    reputation: {
      created: 3,
      sold: 20,
      review_positive: 10,
      review_negative: -10
    },
    tokens: {
      created: 5,
      sold: 25,
      review_positive: 5
    },
    rewards: [
      { id: "seller", name: "Trusted Seller", minReputation: 40, minTokens: 100 },
      { id: "merchant", name: "Master Merchant", minReputation: 80, minTokens: 200 }
    ],
    abuse: ["fake", "scam", "fraud", "manipulation"]
  },

  festival: {
    reputation: {
      submission: 10,
      accepted: 20,
      jury_vote: 5
    },
    tokens: {
      submission: 10,
      accepted: 50,
      jury_vote: 5
    },
    rewards: [
      { id: "creator", name: "Festival Creator", minReputation: 30, minTokens: 50 },
      { id: "laureate", name: "Festival Laureate", minReputation: 80, minTokens: 150 }
    ],
    abuse: ["plagiarism", "duplicate", "fake"]
  },

  media: {
    reputation: {
      broadcast: 5,
      announcement: 3,
      trending: 15
    },
    tokens: {
      broadcast: 5,
      trending: 20
    },
    rewards: [
      { id: "reporter", name: "City Reporter", minReputation: 30, minTokens: 40 },
      { id: "anchor", name: "Media Anchor", minReputation: 70, minTokens: 120 }
    ],
    abuse: ["fake_news", "misinfo", "spam"]
  },

  sports: {
    reputation: {
      match_won: 20,
      record: 30,
      participation: 5
    },
    tokens: {
      match_won: 20,
      record: 50
    },
    rewards: [
      { id: "athlete", name: "City Athlete", minReputation: 40, minTokens: 80 },
      { id: "champion", name: "City Champion", minReputation: 100, minTokens: 200 }
    ],
    abuse: ["cheat", "exploit", "bot"]
  },

  governance: {
    reputation: {
      vote: 5,
      proposal: 15,
      approved: 20
    },
    tokens: {
      vote: 2,
      proposal: 10,
      approved: 20
    },
    rewards: [
      { id: "voter", name: "Active Voter", minReputation: 20, minTokens: 40 },
      { id: "governor", name: "City Governor", minReputation: 80, minTokens: 150 }
    ],
    abuse: ["sybil", "manipulation", "spam"]
  },

  treasure: {
    reputation: {
      reward_claimed: 5,
      vault_access: 10
    },
    tokens: {
      reward_claimed: 20
    },
    rewards: [
      { id: "collector", name: "Treasure Collector", minReputation: 20, minTokens: 50 },
      { id: "legend", name: "Treasure Legend", minReputation: 80, minTokens: 200 }
    ],
    abuse: ["exploit", "duplicate", "fraud"]
  }
};

// ---------------------------------------------
// GŁÓWNA FUNKCJA
// ---------------------------------------------
console.log("🏙️ FAZA 4C — ETAP 2.7: RTRA AUTO‑SPECIALIZER START...");

const modules = getBackendModules();

modules.forEach((mod) => {
  if (mod.id === "BE-00") return;

  const metadataFile = path.join(mod.dir, "config", "metadata.json");
  const rtraFile = path.join(mod.dir, "config", "rtra.config.json");

  if (!fs.existsSync(metadataFile) || !fs.existsSync(rtraFile)) return;

  const metadata = loadJSON(metadataFile);
  const rtra = loadJSON(rtraFile);

  const preset = PRESETS[metadata.districtType] || PRESETS["community"];

  // Wstrzyknięcie presetów
  rtra.reputation.eventMapping = preset.reputation;
  rtra.tokens.eventMapping = preset.tokens;
  rtra.rewards.tiers = preset.rewards;
  rtra.antiAbuse.suspiciousKeywords = preset.abuse;

  saveJSON(rtraFile, rtra);

  console.log(`🔧 Zaktualizowano RTRA dla: ${mod.id}__${mod.name}`);
});

console.log("\n🎉 FAZA 4C — ETAP 2.7: RTRA AUTO‑SPECIALIZER ZAKOŃCZONY.");

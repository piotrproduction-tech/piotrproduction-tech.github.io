/**
 * CITYOF-GATE — Collective Consciousness Layer 10.1 Generator
 *
 * Warstwa 10.1 = COLLECTIVE CONSCIOUSNESS:
 * - CityCollectiveConsciousness_10_1
 * - CityCoalitionState_10_1
 * - CityConsciousnessEngine_10_1
 * - test_city_consciousness_10_1.js
 */

import fs from "fs";
import path from "path";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeFileIfNotExists(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("[10.1] created:", filePath);
  } else {
    console.log("[10.1] exists, skipping:", filePath);
  }
}

function cityCollectiveTemplate() {
  return `// CityCollectiveConsciousness_10_1
// Kolektywna świadomość miasta — agreguje stany dzielnic.

export class CityCollectiveConsciousness_10_1 {
  constructor() {
    this.districtStates = {};
    this.globalState = {
      dominantCoalition: null,
      tensionLevel: 0,
      harmonyLevel: 0,
      lastUpdated: Date.now()
    };
  }

  updateDistrictState(districtName, snapshot) {
    this.districtStates[districtName] = snapshot;
    this.recalculate();
  }

  recalculate() {
    const names = Object.keys(this.districtStates);
    if (names.length === 0) return;

    let totalTension = 0;
    let totalHarmony = 0;
    let coalitionCounts = {};

    names.forEach(name => {
      const s = this.districtStates[name];
      if (!s) return;

      const tension = s.emergentState?.tension || 0;
      const hype = s.emergentState?.hypeLevel || 0;
      const relations = s.relations || {};

      totalTension += tension + hype;

      Object.entries(relations).forEach(([target, val]) => {
        if (!coalitionCounts[target]) coalitionCounts[target] = 0;
        if (val > 0.5) coalitionCounts[target] += 1;
      });
    });

    const avgTension = totalTension / names.length;
    const maxCoalition = Object.entries(coalitionCounts).sort((a, b) => b[1] - a[1])[0];

    this.globalState.tensionLevel = Math.min(1, avgTension);
    this.globalState.harmonyLevel = 1 - this.globalState.tensionLevel;
    this.globalState.dominantCoalition = maxCoalition ? maxCoalition[0] : null;
    this.globalState.lastUpdated = Date.now();
  }

  snapshot() {
    return {
      districts: this.districtStates,
      global: this.globalState
    };
  }
}
`;
}

function cityCoalitionStateTemplate() {
  return `// CityCoalitionState_10_1
// Prosty model koalicji miasta na bazie relacji dzielnic.

export class CityCoalitionState_10_1 {
  constructor() {
    this.coalitions = {};
  }

  updateFromDistrictSnapshot(districtName, snapshot) {
    const relations = snapshot.relations || {};
    Object.entries(relations).forEach(([target, val]) => {
      const key = [districtName, target].sort().join("__");
      if (!this.coalitions[key]) this.coalitions[key] = 0;
      this.coalitions[key] = Math.max(-1, Math.min(1, this.coalitions[key] + val * 0.1));
    });
  }

  snapshot() {
    return { ...this.coalitions };
  }
}
`;
}

function cityConsciousnessEngineTemplate() {
  return `// CityConsciousnessEngine_10_1
// Łączy stany dzielnic (10.0) w kolektywną świadomość miasta.

import { CityCollectiveConsciousness_10_1 } from "./CityCollectiveConsciousness_10_1.js";
import { CityCoalitionState_10_1 } from "./CityCoalitionState_10_1.js";
import { MarketplaceDistrict_ConsciousnessEngine_10_0 } from "../apps/MarketplaceDistrict/orchestrator/MarketplaceDistrict_ConsciousnessEngine_10_0.js";
import { MarketplaceStreetDistrict_ConsciousnessEngine_10_0 } from "../apps/MarketplaceStreetDistrict/orchestrator/MarketplaceStreetDistrict_ConsciousnessEngine_10_0.js";
import { CreatorDistrict_ConsciousnessEngine_10_0 } from "../apps/CreatorDistrict/orchestrator/CreatorDistrict_ConsciousnessEngine_10_0.js";

export class CityConsciousnessEngine_10_1 {
  constructor() {
    this.collective = new CityCollectiveConsciousness_10_1();
    this.coalitions = new CityCoalitionState_10_1();

    this.districts = {
      MarketplaceDistrict: new MarketplaceDistrict_ConsciousnessEngine_10_0(),
      MarketplaceStreetDistrict: new MarketplaceStreetDistrict_ConsciousnessEngine_10_0(),
      CreatorDistrict: new CreatorDistrict_ConsciousnessEngine_10_0()
    };
  }

  dispatchToDistrict(districtName, event, context = {}) {
    const engine = this.districts[districtName];
    if (!engine) throw new Error("Unknown district: " + districtName);

    const result = engine.handleEvent(event, context);

    const snapshot = {
      emergentState: result.emergentState,
      longTermMemory: result.longTermMemory,
      relations: result.relations,
      coalitionMap: result.coalitionMap,
      archetype: result.archetype
    };

    this.collective.updateDistrictState(districtName, snapshot);
    this.coalitions.updateFromDistrictSnapshot(districtName, snapshot);

    return result;
  }

  snapshot() {
    return {
      collective: this.collective.snapshot(),
      coalitions: this.coalitions.snapshot()
    };
  }
}
`;
}

function cityTestTemplate() {
  return `// test_city_consciousness_10_1.js
// Testy kolektywnej świadomości miasta 10.1.

import { CityConsciousnessEngine_10_1 } from "../CityConsciousnessEngine_10_1.js";

describe("City Consciousness 10.1", () => {
  test("aggregates district states into collective snapshot", () => {
    const engine = new CityConsciousnessEngine_10_1();

    engine.dispatchToDistrict("MarketplaceDistrict", {
      type: "marketplace.buy",
      payload: { product: { stock: 10 }, quantity: 1 }
    });

    engine.dispatchToDistrict("CreatorDistrict", {
      type: "creator.upload",
      payload: { id: "c1" }
    });

    const snap = engine.snapshot();

    expect(Object.keys(snap.collective.districts).length).toBeGreaterThan(0);
    expect(snap.collective.global).toBeDefined();
  });

  test("tracks coalitions between districts", () => {
    const engine = new CityConsciousnessEngine_10_1();

    for (let i = 0; i < 5; i++) {
      engine.dispatchToDistrict("MarketplaceStreetDistrict", {
        type: "street.glow",
        payload: { exhibition: { id: "e" + i }, intensity: 2 }
      });
    }

    const snap = engine.snapshot();

    expect(Object.keys(snap.coalitions).length).toBeGreaterThan(0);
  });
});
`;
}

export function generateCityConsciousnessLayer_10_1() {
  const rootDir = ".";
  const cityEngineDir = path.join(rootDir);
  const testsDir = path.join(rootDir, "__tests__");

  ensureDir(cityEngineDir);
  ensureDir(testsDir);

  const collectivePath = path.join(cityEngineDir, "CityCollectiveConsciousness_10_1.js");
  const coalitionStatePath = path.join(cityEngineDir, "CityCoalitionState_10_1.js");
  const cityEnginePath = path.join(cityEngineDir, "CityConsciousnessEngine_10_1.js");
  const testPath = path.join(testsDir, "test_city_consciousness_10_1.js");

  writeFileIfNotExists(collectivePath, cityCollectiveTemplate());
  writeFileIfNotExists(coalitionStatePath, cityCoalitionStateTemplate());
  writeFileIfNotExists(cityEnginePath, cityConsciousnessEngineTemplate());
  writeFileIfNotExists(testPath, cityTestTemplate());
}

// CLI

if (process.argv[1] && process.argv[1].includes("district_version_10_1_generator.js")) {
  generateCityConsciousnessLayer_10_1();
}


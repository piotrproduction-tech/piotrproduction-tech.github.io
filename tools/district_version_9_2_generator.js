/**
 * CITYOF-GATE — District Emergent Identity Layer 9.2 Generator
 *
 * Warstwa 9.2 = EMERGENT IDENTITY:
 * - DistrictEmergentState_9_2
 * - DistrictLongTermMemory_9_2
 * - DistrictArchetypeEvolver_9_2
 * - DistrictIdentityEngine_9_2 (nakładka na 9.1)
 * - test_identity_9_2.js
 */

import fs from "fs";
import path from "path";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeFileIfNotExists(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("[9.2] created:", filePath);
  } else {
    console.log("[9.2] exists, skipping:", filePath);
  }
}

function emergentStateTemplate(districtName) {
  return `// ${districtName} — DistrictEmergentState_9_2
// Długoterminowy stan dzielnicy: tendencje, nastroje, archetyp w czasie.

export class ${districtName}_EmergentState_9_2 {
  constructor() {
    this.state = {
      archetype: "BASE",
      stability: 1.0,
      tension: 0.0,
      hypeLevel: 0.0,
      creatorAffinity: 0.5,
      marketplaceAffinity: 0.5,
      streetAffinity: 0.5,
      lastUpdated: Date.now()
    };
  }

  applySignal(signal) {
    // signal: { type, weight, source }
    const { type, weight, source } = signal;

    if (type === "TABOO_TRIGGERED") {
      this.state.tension = Math.min(1.0, this.state.tension + 0.1 * weight);
      this.state.stability = Math.max(0.0, this.state.stability - 0.05 * weight);
    }

    if (type === "HYPE_EVENT") {
      this.state.hypeLevel = Math.min(1.0, this.state.hypeLevel + 0.1 * weight);
    }

    if (type === "CREATOR_EVENT") {
      this.state.creatorAffinity = Math.min(1.0, this.state.creatorAffinity + 0.05 * weight);
    }

    if (type === "MARKETPLACE_EVENT") {
      this.state.marketplaceAffinity = Math.min(1.0, this.state.marketplaceAffinity + 0.05 * weight);
    }

    if (type === "STREET_EVENT") {
      this.state.streetAffinity = Math.min(1.0, this.state.streetAffinity + 0.05 * weight);
    }

    this.state.lastUpdated = Date.now();
  }

  snapshot() {
    return { ...this.state };
  }
}
`;
}

function longTermMemoryTemplate(districtName) {
  return `// ${districtName} — DistrictLongTermMemory_9_2
// Pamięć długoterminowa: agregaty, trendy, liczniki.

export class ${districtName}_LongTermMemory_9_2 {
  constructor() {
    this.counters = {
      tabooTriggered: 0,
      tabooSoftened: 0,
      hypeEvents: 0,
      creatorEvents: 0,
      marketplaceEvents: 0,
      streetEvents: 0
    };
  }

  record(event, result) {
    if (result.type === "TABOO_TRIGGERED") this.counters.tabooTriggered++;
    if (result.type === "TABOO_SOFTENED") this.counters.tabooSoftened++;

    if (event.type.startsWith("street.")) this.counters.streetEvents++;
    if (event.type.startsWith("creator.")) this.counters.creatorEvents++;
    if (event.type.startsWith("marketplace.")) this.counters.marketplaceEvents++;

    if (event.type.includes("boost") || event.type.includes("highlight")) {
      this.counters.hypeEvents++;
    }
  }

  getSnapshot() {
    return { ...this.counters };
  }
}
`;
}

function archetypeEvolverTemplate(districtName) {
  return `// ${districtName} — DistrictArchetypeEvolver_9_2
// Ewolucja archetypu na podstawie pamięci długoterminowej i emergent state.

export class ${districtName}_ArchetypeEvolver_9_2 {
  constructor(baseArchetype = "BASE") {
    this.baseArchetype = baseArchetype;
    this.currentArchetype = baseArchetype;
  }

  update(memorySnapshot, emergentSnapshot) {
    const { creatorEvents, marketplaceEvents, streetEvents, hypeEvents, tabooTriggered } = memorySnapshot;
    const { hypeLevel, creatorAffinity, marketplaceAffinity, streetAffinity, tension } = emergentSnapshot;

    // Przykładowe reguły:
    if (creatorEvents > marketplaceEvents && creatorAffinity > 0.7) {
      this.currentArchetype = "CreatorGuardian";
    } else if (marketplaceEvents > creatorEvents && marketplaceAffinity > 0.7) {
      this.currentArchetype = "MarketOverseer";
    } else if (streetEvents > 10 && hypeLevel > 0.6) {
      this.currentArchetype = "StreetShowrunner";
    } else if (tabooTriggered > 5 && tension > 0.5) {
      this.currentArchetype = "StrictRegulator";
    } else {
      this.currentArchetype = this.baseArchetype;
    }
  }

  getArchetype() {
    return this.currentArchetype;
  }
}
`;
}

function identityEngine9_2Template(districtName) {
  return `// ${districtName} — DistrictIdentityEngine_9_2
// Nakładka na 9.1 z emergent identity 9.2.

import { ${districtName}_IdentityEngine_9_1 } from "./${districtName}_IdentityEngine_9_1.js";
import { ${districtName}_EmergentState_9_2 } from "../models/${districtName}_EmergentState_9_2.js";
import { ${districtName}_LongTermMemory_9_2 } from "../models/${districtName}_LongTermMemory_9_2.js";
import { ${districtName}_ArchetypeEvolver_9_2 } from "../models/${districtName}_ArchetypeEvolver_9_2.js";

export class ${districtName}_IdentityEngine_9_2 {
  constructor(baseArchetype = "BASE") {
    this.baseEngine = new ${districtName}_IdentityEngine_9_1();
    this.emergent = new ${districtName}_EmergentState_9_2();
    this.longTerm = new ${districtName}_LongTermMemory_9_2();
    this.evolver = new ${districtName}_ArchetypeEvolver_9_2(baseArchetype);
  }

  handleEvent(event, context = {}) {
    const result = this.baseEngine.handleEvent(event, context);

    // sygnały emergentne
    const signals = [];

    if (result.type === "TABOO_TRIGGERED") {
      signals.push({ type: "TABOO_TRIGGERED", weight: 1.0, source: "identity" });
    }
    if (result.type === "TABOO_SOFTENED") {
      signals.push({ type: "TABOO_TRIGGERED", weight: 0.5, source: "identity" });
    }
    if (event.type.startsWith("street.")) {
      signals.push({ type: "STREET_EVENT", weight: 0.5, source: "street" });
    }
    if (event.type.startsWith("creator.")) {
      signals.push({ type: "CREATOR_EVENT", weight: 0.5, source: "creator" });
    }
    if (event.type.startsWith("marketplace.")) {
      signals.push({ type: "MARKETPLACE_EVENT", weight: 0.5, source: "marketplace" });
    }
    if (event.type.includes("boost") || event.type.includes("highlight")) {
      signals.push({ type: "HYPE_EVENT", weight: 0.7, source: "street" });
    }

    signals.forEach(s => this.emergent.applySignal(s));
    this.longTerm.record(event, result);

    this.evolver.update(this.longTerm.getSnapshot(), this.emergent.snapshot());

    result.emergentState = this.emergent.snapshot();
    result.longTermMemory = this.longTerm.getSnapshot();
    result.archetype = this.evolver.getArchetype();

    return result;
  }
}
`;
}

function identityTest9_2Template(districtName) {
  return `// ${districtName} — test_identity_9_2.js
// Testy emergent identity 9.2.

import { ${districtName}_IdentityEngine_9_2 } from "../orchestrator/${districtName}_IdentityEngine_9_2.js";

describe("${districtName} Identity 9.2", () => {
  test("evolves archetype based on repeated creator events", () => {
    const engine = new ${districtName}_IdentityEngine_9_2("BASE");

    for (let i = 0; i < 10; i++) {
      engine.handleEvent({
        type: "creator.upload",
        payload: { id: "c" + i }
      });
    }

    const result = engine.handleEvent({
      type: "creator.upload",
      payload: { id: "c-final" }
    });

    expect(result.archetype).toBeDefined();
  });

  test("tracks long-term taboo triggers", () => {
    const engine = new ${districtName}_IdentityEngine_9_2("BASE");

    const product = { id: "p1", stock: 0 };

    for (let i = 0; i < 6; i++) {
      engine.handleEvent({
        type: "marketplace.buy",
        payload: { product, quantity: 1 }
      });
    }

    const result = engine.handleEvent({
      type: "marketplace.buy",
      payload: { product, quantity: 1 }
    });

    expect(result.longTermMemory.tabooTriggered).toBeGreaterThan(0);
  });
});
`;
}

export function generateDistrictIdentityLayer_9_2(districtName) {
  const baseDir = path.join("apps", districtName);
  const modelsDir = path.join(baseDir, "models");
  const orchestratorDir = path.join(baseDir, "orchestrator");
  const testsDir = path.join(baseDir, "tests");

  ensureDir(modelsDir);
  ensureDir(orchestratorDir);
  ensureDir(testsDir);

  const emergentStatePath = path.join(modelsDir, `${districtName}_EmergentState_9_2.js`);
  const longTermMemoryPath = path.join(modelsDir, `${districtName}_LongTermMemory_9_2.js`);
  const archetypeEvolverPath = path.join(modelsDir, `${districtName}_ArchetypeEvolver_9_2.js`);
  const identityEngine9_2Path = path.join(orchestratorDir, `${districtName}_IdentityEngine_9_2.js`);
  const identityTest9_2Path = path.join(testsDir, `test_${districtName}_identity_9_2.js`);

  writeFileIfNotExists(emergentStatePath, emergentStateTemplate(districtName));
  writeFileIfNotExists(longTermMemoryPath, longTermMemoryTemplate(districtName));
  writeFileIfNotExists(archetypeEvolverPath, archetypeEvolverTemplate(districtName));
  writeFileIfNotExists(identityEngine9_2Path, identityEngine9_2Template(districtName));
  writeFileIfNotExists(identityTest9_2Path, identityTest9_2Template(districtName));
}

// CLI

if (process.argv[1] && process.argv[1].includes("district_version_9_2_generator.js")) {
  const districtName = process.argv[2];
  if (!districtName) {
    console.error("Usage: node tools/district_version_9_2_generator.js <DistrictName>");
    process.exit(1);
  }
  generateDistrictIdentityLayer_9_2(districtName);
}

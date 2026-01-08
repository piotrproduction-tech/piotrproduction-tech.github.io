/**
 * CITYOF-GATE — District Consciousness Layer 10.0 Generator
 *
 * Warstwa 10.0 = DISTRICT CONSCIOUSNESS:
 * - DistrictConsciousnessBus_10_0
 * - DistrictRelations_10_0
 * - DistrictCoalitionEngine_10_0
 * - DistrictConsciousnessEngine_10_0 (nakładka na 9.2)
 * - test_identity_10_0.js
 */

import fs from "fs";
import path from "path";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeFileIfNotExists(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("[10.0] created:", filePath);
  } else {
    console.log("[10.0] exists, skipping:", filePath);
  }
}

function consciousnessBusTemplate() {
  return `// DistrictConsciousnessBus_10_0
// Globalny bus komunikacji między dzielnicami.

export class DistrictConsciousnessBus_10_0 {
  constructor() {
    this.listeners = [];
  }

  subscribe(cb) {
    this.listeners.push(cb);
  }

  broadcast(signal) {
    this.listeners.forEach(cb => cb(signal));
  }
}

export const districtConsciousnessBus = new DistrictConsciousnessBus_10_0();
`;
}

function relationsTemplate(districtName) {
  return `// ${districtName} — DistrictRelations_10_0
// Relacje między dzielnicami: napięcia, sojusze, wpływy.

export class ${districtName}_Relations_10_0 {
  constructor() {
    this.relations = {};
  }

  updateRelation(targetDistrict, delta) {
    if (!this.relations[targetDistrict]) {
      this.relations[targetDistrict] = 0;
    }
    this.relations[targetDistrict] = Math.max(-1, Math.min(1, this.relations[targetDistrict] + delta));
  }

  getRelation(targetDistrict) {
    return this.relations[targetDistrict] || 0;
  }

  snapshot() {
    return { ...this.relations };
  }
}
`;
}

function coalitionEngineTemplate(districtName) {
  return `// ${districtName} — DistrictCoalitionEngine_10_0
// Tworzenie koalicji i napięć między dzielnicami.

export class ${districtName}_CoalitionEngine_10_0 {
  constructor(relations) {
    this.relations = relations;
  }

  evaluateCoalition(targetDistrict) {
    const score = this.relations.getRelation(targetDistrict);

    if (score > 0.6) return "ALLY";
    if (score < -0.6) return "RIVAL";
    return "NEUTRAL";
  }
}
`;
}

function consciousnessEngineTemplate(districtName) {
  return `// ${districtName} — DistrictConsciousnessEngine_10_0
// Nakładka na 9.2: dzielnica reaguje na sygnały innych dzielnic.

import { ${districtName}_IdentityEngine_9_2 } from "./${districtName}_IdentityEngine_9_2.js";
import { ${districtName}_Relations_10_0 } from "../models/${districtName}_Relations_10_0.js";
import { ${districtName}_CoalitionEngine_10_0 } from "../models/${districtName}_CoalitionEngine_10_0.js";
import { districtConsciousnessBus } from "../../DistrictConsciousnessBus_10_0.js";

export class ${districtName}_ConsciousnessEngine_10_0 {
  constructor() {
    this.identity = new ${districtName}_IdentityEngine_9_2("${districtName}");
    this.relations = new ${districtName}_Relations_10_0();
    this.coalitions = new ${districtName}_CoalitionEngine_10_0(this.relations);

    districtConsciousnessBus.subscribe(signal => {
      if (signal.source !== "${districtName}") {
        this.processExternalSignal(signal);
      }
    });
  }

  processExternalSignal(signal) {
    const { source, type, weight } = signal;

    if (type === "HYPE_EVENT") {
      this.relations.updateRelation(source, 0.05 * weight);
    }

    if (type === "TABOO_TRIGGERED") {
      this.relations.updateRelation(source, -0.1 * weight);
    }

    if (type === "CREATOR_EVENT") {
      this.relations.updateRelation(source, 0.03 * weight);
    }

    if (type === "MARKETPLACE_EVENT") {
      this.relations.updateRelation(source, 0.02 * weight);
    }
  }

  handleEvent(event, context = {}) {
    const result = this.identity.handleEvent(event, context);

    // Emitujemy sygnał do innych dzielnic
    districtConsciousnessBus.broadcast({
      source: "${districtName}",
      type: result.type,
      weight: 1.0
    });

    result.relations = this.relations.snapshot();
    result.coalitionMap = {
      MarketplaceDistrict: this.coalitions.evaluateCoalition("MarketplaceDistrict"),
      MarketplaceStreetDistrict: this.coalitions.evaluateCoalition("MarketplaceStreetDistrict"),
      CreatorDistrict: this.coalitions.evaluateCoalition("CreatorDistrict")
    };

    return result;
  }
}
`;
}

function testTemplate(districtName) {
  return `// ${districtName} — test_identity_10_0.js
// Testy świadomości dzielnic 10.0.

import { ${districtName}_ConsciousnessEngine_10_0 } from "../orchestrator/${districtName}_ConsciousnessEngine_10_0.js";
import { districtConsciousnessBus } from "../../DistrictConsciousnessBus_10_0.js";

describe("${districtName} Identity 10.0", () => {
  test("reacts to external signals", () => {
    const engine = new ${districtName}_ConsciousnessEngine_10_0();

    districtConsciousnessBus.broadcast({
      source: "CreatorDistrict",
      type: "CREATOR_EVENT",
      weight: 1.0
    });

    const result = engine.handleEvent({
      type: "marketplace.buy",
      payload: { product: { stock: 10 }, quantity: 1 }
    });

    expect(result.relations.CreatorDistrict).toBeGreaterThan(0);
  });
});
`;
}

export function generateDistrictConsciousnessLayer_10_0(districtName) {
  const baseDir = path.join("apps", districtName);
  const modelsDir = path.join(baseDir, "models");
  const orchestratorDir = path.join(baseDir, "orchestrator");
  const testsDir = path.join(baseDir, "tests");

  ensureDir(modelsDir);
  ensureDir(orchestratorDir);
  ensureDir(testsDir);

  const busPath = path.join("apps", "DistrictConsciousnessBus_10_0.js");
  const relationsPath = path.join(modelsDir, `${districtName}_Relations_10_0.js`);
  const coalitionPath = path.join(modelsDir, `${districtName}_CoalitionEngine_10_0.js`);
  const consciousnessEnginePath = path.join(orchestratorDir, `${districtName}_ConsciousnessEngine_10_0.js`);
  const testPath = path.join(testsDir, `test_${districtName}_identity_10_0.js`);

  writeFileIfNotExists(busPath, consciousnessBusTemplate());
  writeFileIfNotExists(relationsPath, relationsTemplate(districtName));
  writeFileIfNotExists(coalitionPath, coalitionEngineTemplate(districtName));
  writeFileIfNotExists(consciousnessEnginePath, consciousnessEngineTemplate(districtName));
  writeFileIfNotExists(testPath, testTemplate(districtName));
}

// CLI

if (process.argv[1] && process.argv[1].includes("district_version_10_0_generator.js")) {
  const districtName = process.argv[2];
  if (!districtName) {
    console.error("Usage: node tools/district_version_10_0_generator.js <DistrictName>");
    process.exit(1);
  }
  generateDistrictConsciousnessLayer_10_0(districtName);
}

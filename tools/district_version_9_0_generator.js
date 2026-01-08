/**
 * CITYOF-GATE — District Identity Layer 9.0 Generator
 *
 * Warstwa 9.0 = TOŻSAMOŚĆ DZIELNICY:
 * - PersonalityModel_9_0
 * - IdentityEngine_9_0
 * - IdentityOrchestrator_9_0
 * - DistrictIdentityConfig_9_0.json
 * - test_identity_9_0.js
 *
 * Generator korzysta z:
 * - cityMood / cityRhythm / cityPulse / cityNarrative
 * - istniejących silników 6.0 / 7.0 / 8.0
 * - istniejącej integracji z CityEngine
 */

import fs from "fs";
import path from "path";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeFileIfNotExists(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("[9.0] created:", filePath);
  } else {
    console.log("[9.0] exists, skipping:", filePath);
  }
}

function identityConfigTemplate(districtName) {
  return `{
  "district": "${districtName}",
  "archetype": "Merchant-Strategist-Showman",
  "moodProfile": {
    "base": "Calm",
    "onCreator": "Creative",
    "onMarketplace": "Energetic",
    "onStreet": "Chaotic",
    "onFestival": "Celebratory"
  },
  "rhythmProfile": {
    "lowPulse": "MorningFlow",
    "midPulse": "MiddayActivity",
    "highPulse": "EveningMarket",
    "veryHighPulse": "NightCreators",
    "festival": "FestivalMode"
  },
  "narrativeProfile": {
    "Neutral": "W mieście wydarzyło się: {{event}}.",
    "Energetic": "⚡ Miasto pulsuje! Właśnie nastąpiło: {{event}}.",
    "Creative": "✨ Na ulicach pojawiła się nowa inspiracja: {{event}}.",
    "Calm": "🕊 W ciszy miasta pojawił się subtelny ruch: {{event}}.",
    "Chaotic": "💥 Chaos przetacza się przez miasto! Event: {{event}}.",
    "Celebratory": "🥂 Miasto świętuje! Wydarzenie: {{event}}."
  },
  "taboo": [
    "OUT_OF_STOCK",
    "MISSING_PRICE",
    "INVALID_EVENT"
  ],
  "preferences": {
    "likesBoost": true,
    "likesHighlight": true,
    "likesGlow": true,
    "prefersPremium": true,
    "prefersCurated": true
  }
}
`;
}

function personalityModelTemplate(districtName) {
  return `// ${districtName} — PersonalityModel_9_0
// Warstwa tożsamości dzielnicy oparta na:
// - cityMood
// - cityRhythm
// - cityPulse
// - cityNarrative
// - DistrictIdentityConfig_9_0.json

import { cityMood } from "../../../apps/FE-00__City/mood/cityMoodEngine.js";
import { cityRhythm } from "../../../apps/FE-00__City/rhythm/cityRhythmEngine.js";
import { cityPulse } from "../../../apps/FE-00__City/pulse/cityPulseEngine.js";
import { cityNarrative } from "../../../apps/FE-00__City/narrative/cityNarrativeEngine.js";
import identityConfig from "../DistrictIdentityConfig_9_0.json";

export class ${districtName}_PersonalityModel_9_0 {
  constructor() {
    this.archetype = identityConfig.archetype;
    this.moodProfile = identityConfig.moodProfile;
    this.rhythmProfile = identityConfig.rhythmProfile;
    this.narrativeProfile = identityConfig.narrativeProfile;
    this.taboo = identityConfig.taboo;
    this.preferences = identityConfig.preferences;

    this.current = {
      mood: cityMood.mood,
      rhythm: cityRhythm.rhythm,
      pulse: cityPulse.bpm,
      lastEvent: null
    };

    cityMood.subscribe(m => { this.current.mood = m; });
    cityRhythm.subscribe(r => { this.current.rhythm = r; });
    cityPulse.subscribe(bpm => { this.current.pulse = bpm; });
  }

  isTaboo(reason) {
    return this.taboo.includes(reason);
  }

  getNarrativeTemplate(personalityKey) {
    return this.narrativeProfile[personalityKey] || this.narrativeProfile.Neutral;
  }

  snapshot() {
    return {
      archetype: this.archetype,
      mood: this.current.mood,
      rhythm: this.current.rhythm,
      pulse: this.current.pulse,
      preferences: this.preferences
    };
  }
}
`;
}

function identityEngineTemplate(districtName) {
  return `// ${districtName} — IdentityEngine_9_0
// Łączy PersonalityModel_9_0 z silnikami 6.0 / 7.0 / 8.0

import { ${districtName}_PersonalityModel_9_0 } from "../models/${districtName}_PersonalityModel_9_0.js";
import { MarketplaceDistrict_MarketplaceEngine_6_0 as MarketplaceEngine } from "../engines/${districtName}_MarketplaceEngine_6_0.js";
import { ${districtName}_StreetEngine_7_0 as StreetEngine } from "../engines/${districtName}_StreetEngine_7_0.js";
import { ${districtName}_AIEngine_8_0 as AIEngine } from "../engines/${districtName}_AIEngine_8_0.js";

export class ${districtName}_IdentityEngine_9_0 {
  constructor() {
    this.personality = new ${districtName}_PersonalityModel_9_0();
    this.marketplace = new MarketplaceEngine();
    this.street = new StreetEngine();
    this.ai = new AIEngine();
  }

  handleEvent(event, context = {}) {
    const snapshot = this.personality.snapshot();
    const base = { event, context, snapshot };

    // Ekonomia
    if (event.type === "marketplace.buy") {
      const { product, quantity } = event.payload;
      const result = this.marketplace.buy(product, quantity);

      if (!result.ok && this.personality.isTaboo(result.reason)) {
        return {
          ...base,
          type: "TABOO_TRIGGERED",
          reason: result.reason
        };
      }

      return {
        ...base,
        type: "MARKETPLACE_TRANSACTION",
        result
      };
    }

    // Street / Glow
    if (event.type.startsWith("street.glow")) {
      const exhibition = event.payload.exhibition;
      const updated = this.street.applyGlowEvent(exhibition, {
        type: event.subtype || "glow",
        intensity: event.payload.intensity || 1
      });

      return {
        ...base,
        type: "STREET_GLOW_UPDATE",
        exhibition: updated
      };
    }

    // AI narracja
    const narrative = this.ai.generateNarrative(event);
    return {
      ...base,
      type: "AI_NARRATIVE",
      narrative
    };
  }
}
`;
}

function identityOrchestratorTemplate(districtName) {
  return `// ${districtName} — IdentityOrchestrator_9_0
// Pierwszy prawdziwy "mózg" dzielnicy — łączy eventy, silniki i osobowość.

import { ${districtName}_IdentityEngine_9_0 } from "./${districtName}_IdentityEngine_9_0.js";
import { cityNarrative } from "../../../apps/FE-00__City/narrative/cityNarrativeEngine.js";

export class ${districtName}_IdentityOrchestrator_9_0 {
  constructor() {
    this.engine = new ${districtName}_IdentityEngine_9_0();
    this.log = [];
  }

  dispatch(event, context = {}) {
    const result = this.engine.handleEvent(event, context);

    // Jeśli to AI_NARRATIVE — wpinamy się w cityNarrative
    if (result.type === "AI_NARRATIVE") {
      cityNarrative.generateStory({
        type: event.type,
        district: "${districtName}",
        payload: event.payload || {}
      });
    }

    this.log.push({
      event,
      result,
      at: Date.now()
    });

    return result;
  }

  getLog() {
    return this.log;
  }
}
`;
}

function identityTestTemplate(districtName) {
  return `// ${districtName} — test_identity_9_0.js
// Sprawdza, czy warstwa 9.0 reaguje zgodnie z osobowością dzielnicy.

import { ${districtName}_IdentityOrchestrator_9_0 } from "../orchestrator/${districtName}_IdentityOrchestrator_9_0.js";

describe("${districtName} Identity 9.0", () => {
  test("handles marketplace.buy with taboo OUT_OF_STOCK", () => {
    const orchestrator = new ${districtName}_IdentityOrchestrator_9_0();

    const product = { id: "p1", stock: 0 };
    const event = {
      type: "marketplace.buy",
      payload: { product, quantity: 1 }
    };

    const result = orchestrator.dispatch(event);

    expect(result.type).toBe("TABOO_TRIGGERED");
    expect(result.reason).toBe("OUT_OF_STOCK");
  });

  test("handles street.glow event with glow update", () => {
    const orchestrator = new ${districtName}_IdentityOrchestrator_9_0();

    const exhibition = { id: "e1", glow: 0 };
    const event = {
      type: "street.glow",
      subtype: "boost",
      payload: { exhibition, intensity: 2 }
    };

    const result = orchestrator.dispatch(event);

    expect(result.type).toBe("STREET_GLOW_UPDATE");
    expect(result.exhibition.glow).toBeGreaterThan(0);
  });

  test("fallback to AI_NARRATIVE for other events", () => {
    const orchestrator = new ${districtName}_IdentityOrchestrator_9_0();

    const event = {
      type: "creator.upload",
      payload: { id: "c1" }
    };

    const result = orchestrator.dispatch(event);

    expect(result.type).toBe("AI_NARRATIVE");
    expect(result.narrative).toContain("event");
  });
});
`;
}

export function generateDistrictIdentityLayer(districtName) {
  const baseDir = path.join("apps", districtName);
  const modelsDir = path.join(baseDir, "models");
  const enginesDir = path.join(baseDir, "engines");
  const orchestratorDir = path.join(baseDir, "orchestrator");
  const testsDir = path.join(baseDir, "tests");

  ensureDir(modelsDir);
  ensureDir(enginesDir);
  ensureDir(orchestratorDir);
  ensureDir(testsDir);

  const identityConfigPath = path.join(baseDir, "DistrictIdentityConfig_9_0.json");
  const personalityModelPath = path.join(modelsDir, `${districtName}_PersonalityModel_9_0.js`);
  const identityEnginePath = path.join(orchestratorDir, `${districtName}_IdentityEngine_9_0.js`);
  const identityOrchestratorPath = path.join(orchestratorDir, `${districtName}_IdentityOrchestrator_9_0.js`);
  const identityTestPath = path.join(testsDir, `test_${districtName}_identity_9_0.js`);

  writeFileIfNotExists(identityConfigPath, identityConfigTemplate(districtName));
  writeFileIfNotExists(personalityModelPath, personalityModelTemplate(districtName));
  writeFileIfNotExists(identityEnginePath, identityEngineTemplate(districtName));
  writeFileIfNotExists(identityOrchestratorPath, identityOrchestratorTemplate(districtName));
  writeFileIfNotExists(identityTestPath, identityTestTemplate(districtName));
}

// CLI

if (process.argv[1] && process.argv[1].includes("district_version_9_0_generator.js")) {
  const districtName = process.argv[2];
  if (!districtName) {
    console.error("Usage: node tools/district_version_9_0_generator.js <DistrictName>");
    process.exit(1);
  }
  generateDistrictIdentityLayer(districtName);
}

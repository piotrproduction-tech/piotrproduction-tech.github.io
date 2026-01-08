/**
 * CITYOF-GATE — District Identity Layer 9.1 Generator
 *
 * Warstwa 9.1 = EMOTIONAL MODULATORS:
 * - DistrictEmotionModulator_9_1
 * - DistrictBehaviorProfile_9_1
 * - DistrictMemory_9_1
 * - DistrictNarrativeModulator_9_1
 * - DistrictIdentityEngine_9_1 (nakładka na 9.0)
 * - test_identity_9_1.js
 */

import fs from "fs";
import path from "path";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeFileIfNotExists(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("[9.1] created:", filePath);
  } else {
    console.log("[9.1] exists, skipping:", filePath);
  }
}

function emotionModulatorTemplate(districtName) {
  return `// ${districtName} — DistrictEmotionModulator_9_1
// Dynamiczne preferencje + adaptacyjne tabu na bazie pulse/mood/rhythm.

import { cityMood } from "../../../apps/FE-00__City/mood/cityMoodEngine.js";
import { cityRhythm } from "../../../apps/FE-00__City/rhythm/cityRhythmEngine.js";
import { cityPulse } from "../../../apps/FE-00__City/pulse/cityPulseEngine.js";
import identityConfig from "../DistrictIdentityConfig_9_0.json";

export class ${districtName}_EmotionModulator_9_1 {
  constructor() {
    this.basePreferences = { ...identityConfig.preferences };
    this.dynamicPreferences = { ...identityConfig.preferences };
    this.dynamicTaboo = [...identityConfig.taboo];

    this.state = {
      mood: cityMood.mood,
      rhythm: cityRhythm.rhythm,
      pulse: cityPulse.bpm
    };

    cityMood.subscribe(m => { this.state.mood = m; this.recalculate(); });
    cityRhythm.subscribe(r => { this.state.rhythm = r; this.recalculate(); });
    cityPulse.subscribe(bpm => { this.state.pulse = bpm; this.recalculate(); });

    this.recalculate();
  }

  recalculate() {
    const { mood, rhythm, pulse } = this.state;

    this.dynamicPreferences = { ...this.basePreferences };
    this.dynamicTaboo = [...identityConfig.taboo];

    // Przykład: przy wysokim pulsu dzielnica staje się bardziej "hype-driven"
    if (pulse > 120) {
      this.dynamicPreferences.likesBoost = true;
      this.dynamicPreferences.prefersHighIntensity = true;
    }

    // Przy niskim pulsu — bardziej spokojna, mniej agresywna
    if (pulse < 50) {
      this.dynamicPreferences.likesBoost = false;
      this.dynamicPreferences.prefersDeepWork = true;
    }

    // Mood wpływa na tolerancję tabu
    if (mood === "Chaotic") {
      this.dynamicTaboo = this.dynamicTaboo.filter(t => t !== "INVALID_EVENT");
    }

    if (mood === "Celebratory") {
      if (!this.dynamicTaboo.includes("OUT_OF_STOCK")) {
        this.dynamicTaboo.push("OUT_OF_STOCK");
      }
    }

    // Rhythm może modulować preferencje ekonomiczne
    if (rhythm === "EveningMarket") {
      this.dynamicPreferences.prefersHighValueTransactions = true;
    }
  }

  getPreferences() {
    return this.dynamicPreferences;
  }

  getTaboo() {
    return this.dynamicTaboo;
  }
}
`;
}

function behaviorProfileTemplate(districtName) {
  return `// ${districtName} — DistrictBehaviorProfile_9_1
// Profile zachowań: Strategic / Aggressive / Calm / HypeDriven / CreatorFriendly / FestivalMode

import { cityMood } from "../../../apps/FE-00__City/mood/cityMoodEngine.js";
import { cityRhythm } from "../../../apps/FE-00__City/rhythm/cityRhythmEngine.js";

export class ${districtName}_BehaviorProfile_9_1 {
  constructor() {
    this.currentProfile = "Strategic";

    this.state = {
      mood: cityMood.mood,
      rhythm: cityRhythm.rhythm
    };

    cityMood.subscribe(m => { this.state.mood = m; this.updateProfile(); });
    cityRhythm.subscribe(r => { this.state.rhythm = r; this.updateProfile(); });

    this.updateProfile();
  }

  updateProfile() {
    const { mood, rhythm } = this.state;

    if (mood === "Celebratory") {
      this.currentProfile = "FestivalMode";
    } else if (mood === "Chaotic") {
      this.currentProfile = "HypeDriven";
    } else if (mood === "Creative") {
      this.currentProfile = "CreatorFriendly";
    } else if (rhythm === "EveningMarket") {
      this.currentProfile = "Aggressive";
    } else if (rhythm === "MorningFlow") {
      this.currentProfile = "Calm";
    } else {
      this.currentProfile = "Strategic";
    }
  }

  getProfile() {
    return this.currentProfile;
  }
}
`;
}

function memoryTemplate(districtName) {
  return `// ${districtName} — DistrictMemory_9_1
// Pamięć krótkoterminowa dzielnicy (ostatnie eventy, glow, transakcje).

export class ${districtName}_Memory_9_1 {
  constructor(limit = 10) {
    this.limit = limit;
    this.events = [];
  }

  record(event, result) {
    this.events.push({
      event,
      result,
      at: Date.now()
    });
    if (this.events.length > this.limit) {
      this.events.shift();
    }
  }

  getLastEvent() {
    return this.events[this.events.length - 1] || null;
  }

  getRecentEvents(filterFn = null) {
    if (!filterFn) return [...this.events];
    return this.events.filter(filterFn);
  }

  hasRecentTaboo(reason) {
    return this.events.some(e => e.result?.type === "TABOO_TRIGGERED" && e.result?.reason === reason);
  }
}
`;
}

function narrativeModulatorTemplate(districtName) {
  return `// ${districtName} — DistrictNarrativeModulator_9_1
// Moduluje narrację na podstawie mood / rhythm / pulse / profilu zachowań.

import { cityMood } from "../../../apps/FE-00__City/mood/cityMoodEngine.js";
import { cityRhythm } from "../../../apps/FE-00__City/rhythm/cityRhythmEngine.js";
import { cityPulse } from "../../../apps/FE-00__City/pulse/cityPulseEngine.js";
import identityConfig from "../DistrictIdentityConfig_9_0.json";

export class ${districtName}_NarrativeModulator_9_1 {
  constructor() {
    this.state = {
      mood: cityMood.mood,
      rhythm: cityRhythm.rhythm,
      pulse: cityPulse.bpm
    };

    this.templates = identityConfig.narrativeProfile;

    cityMood.subscribe(m => { this.state.mood = m; });
    cityRhythm.subscribe(r => { this.state.rhythm = r; });
    cityPulse.subscribe(bpm => { this.state.pulse = bpm; });
  }

  modulate(baseText, event, profile) {
    const { mood, rhythm, pulse } = this.state;

    let prefix = "";
    if (profile === "Aggressive") {
      prefix = "🚀 Intensywny ruch: ";
    } else if (profile === "Calm") {
      prefix = "🌿 Spokojny przepływ: ";
    } else if (profile === "HypeDriven") {
      prefix = "🔥 Hype rośnie: ";
    } else if (profile === "CreatorFriendly") {
      prefix = "🎨 Twórcza fala: ";
    } else if (profile === "FestivalMode") {
      prefix = "🎉 Tryb festiwalowy: ";
    }

    const pulseTag =
      pulse > 120 ? "[HIGH PULSE]" :
      pulse > 80 ? "[MID PULSE]" :
      "[LOW PULSE]";

    const moodTag = "[" + mood.toUpperCase() + "]";
    const rhythmTag = "[" + rhythm + "]";

    return \`\${prefix}\${baseText} \${moodTag} \${rhythmTag} \${pulseTag}\`;
  }
}
`;
}

function identityEngine9_1Template(districtName) {
  return `// ${districtName} — DistrictIdentityEngine_9_1
// Nakładka na IdentityEngine_9_0 z modulatorami 9.1.

import { ${districtName}_IdentityEngine_9_0 } from "./${districtName}_IdentityEngine_9_0.js";
import { ${districtName}_EmotionModulator_9_1 } from "../models/${districtName}_EmotionModulator_9_1.js";
import { ${districtName}_BehaviorProfile_9_1 } from "../models/${districtName}_BehaviorProfile_9_1.js";
import { ${districtName}_Memory_9_1 } from "../models/${districtName}_Memory_9_1.js";
import { ${districtName}_NarrativeModulator_9_1 } from "../models/${districtName}_NarrativeModulator_9_1.js";

export class ${districtName}_IdentityEngine_9_1 {
  constructor() {
    this.baseEngine = new ${districtName}_IdentityEngine_9_0();
    this.emotion = new ${districtName}_EmotionModulator_9_1();
    this.profile = new ${districtName}_BehaviorProfile_9_1();
    this.memory = new ${districtName}_Memory_9_1();
    this.narrativeMod = new ${districtName}_NarrativeModulator_9_1();
  }

  handleEvent(event, context = {}) {
    const result = this.baseEngine.handleEvent(event, context);

    const prefs = this.emotion.getPreferences();
    const taboo = this.emotion.getTaboo();
    const profile = this.profile.getProfile();

    // Jeśli wynik to TABOO, ale tabu zostało złagodzone — możemy zareagować inaczej
    if (result.type === "TABOO_TRIGGERED" && !taboo.includes(result.reason)) {
      result.type = "TABOO_SOFTENED";
    }

    // Jeśli to AI_NARRATIVE — modulujemy tekst
    if (result.type === "AI_NARRATIVE" && result.narrative) {
      result.narrative = this.narrativeMod.modulate(result.narrative, event, profile);
    }

    // Możemy też dodać meta-informacje o profilu i preferencjach
    result.behaviorProfile = profile;
    result.preferences = prefs;

    this.memory.record(event, result);

    return result;
  }
}
`;
}

function identityTest9_1Template(districtName) {
  return `// ${districtName} — test_identity_9_1.js
// Testy zachowań adaptacyjnych 9.1.

import { ${districtName}_IdentityEngine_9_1 } from "../orchestrator/${districtName}_IdentityEngine_9_1.js";

describe("${districtName} Identity 9.1", () => {
  test("modulates narrative with behavior profile", () => {
    const engine = new ${districtName}_IdentityEngine_9_1();

    const event = {
      type: "creator.upload",
      payload: { id: "c1" }
    };

    const result = engine.handleEvent(event);

    expect(result.type).toBe("AI_NARRATIVE");
    expect(result.narrative).toMatch(/PULSE/);
    expect(result.behaviorProfile).toBeDefined();
  });

  test("can soften taboo based on emotional state", () => {
    const engine = new ${districtName}_IdentityEngine_9_1();

    const product = { id: "p1", stock: 0 };
    const event = {
      type: "marketplace.buy",
      payload: { product, quantity: 1 }
    };

    const result = engine.handleEvent(event);

    expect(["TABOO_TRIGGERED", "TABOO_SOFTENED"]).toContain(result.type);
  });
});
`;
}

export function generateDistrictIdentityLayer_9_1(districtName) {
  const baseDir = path.join("apps", districtName);
  const modelsDir = path.join(baseDir, "models");
  const orchestratorDir = path.join(baseDir, "orchestrator");
  const testsDir = path.join(baseDir, "tests");

  ensureDir(modelsDir);
  ensureDir(orchestratorDir);
  ensureDir(testsDir);

  const emotionModPath = path.join(modelsDir, `${districtName}_EmotionModulator_9_1.js`);
  const behaviorProfilePath = path.join(modelsDir, `${districtName}_BehaviorProfile_9_1.js`);
  const memoryPath = path.join(modelsDir, `${districtName}_Memory_9_1.js`);
  const narrativeModPath = path.join(modelsDir, `${districtName}_NarrativeModulator_9_1.js`);
  const identityEngine9_1Path = path.join(orchestratorDir, `${districtName}_IdentityEngine_9_1.js`);
  const identityTest9_1Path = path.join(testsDir, `test_${districtName}_identity_9_1.js`);

  writeFileIfNotExists(emotionModPath, emotionModulatorTemplate(districtName));
  writeFileIfNotExists(behaviorProfilePath, behaviorProfileTemplate(districtName));
  writeFileIfNotExists(memoryPath, memoryTemplate(districtName));
  writeFileIfNotExists(narrativeModPath, narrativeModulatorTemplate(districtName));
  writeFileIfNotExists(identityEngine9_1Path, identityEngine9_1Template(districtName));
  writeFileIfNotExists(identityTest9_1Path, identityTest9_1Template(districtName));
}

// CLI

if (process.argv[1] && process.argv[1].includes("district_version_9_1_generator.js")) {
  const districtName = process.argv[2];
  if (!districtName) {
    console.error("Usage: node tools/district_version_9_1_generator.js <DistrictName>");
    process.exit(1);
  }
  generateDistrictIdentityLayer_9_1(districtName);
}

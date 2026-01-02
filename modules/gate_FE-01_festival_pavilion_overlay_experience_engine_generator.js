const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
const SCENARIO = path.join(CORE, "scenario");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function ensureFile(file, base = "") {
  if (!fs.existsSync(file)) {
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, base, "utf8");
    console.log("[CREATE]", file);
  }
}

function appendIfMissing(file, marker, block) {
  ensureFile(file);
  const content = fs.readFileSync(file, "utf8");
  if (!content.includes(marker)) {
    fs.writeFileSync(file, content + "\n\n" + block, "utf8");
    console.log("[UPDATED]", file, "→", marker);
  }
}

//
// Scenario Library
//
function scenarioLibrary() {
  const file = path.join(SCENARIO, "festivalScenarioLibrary.js");
  const marker = "// FE_FESTIVAL_SCENARIO_LIBRARY";

  const block = `
// FE_FESTIVAL_SCENARIO_LIBRARY

// Hybrydowa biblioteka scen dla FESTIVAL ENGINE 2.0

export const ScenarioLibrary = {
  // --- FILMOWE ---
  cinematic_highlight: {
    type: "film",
    intensity: 0.6,
    tags: ["cinematic", "highlight", "emotional"],
    actions: ["vision_overlay_burst", "director_focus"]
  },

  emotional_peak: {
    type: "film",
    intensity: 0.8,
    tags: ["emotional", "peak"],
    actions: ["hud_ultra_pulse", "director_mood_shift"]
  },

  silent_moment: {
    type: "film",
    intensity: 0.2,
    tags: ["calm", "pause"],
    actions: ["hud_dim", "pulse_decay"]
  },

  // --- MUZYCZNE ---
  music_build_up: {
    type: "music",
    intensity: 0.5,
    tags: ["build", "anticipation"],
    actions: ["wave_rise", "hud_ultra_enable"]
  },

  music_drop: {
    type: "music",
    intensity: 1.0,
    tags: ["drop", "peak", "energy"],
    actions: ["vision_overlay_peak", "pulse_surge", "wave_surge"]
  },

  music_breakdown: {
    type: "music",
    intensity: 0.4,
    tags: ["breakdown", "reset"],
    actions: ["wave_soften", "hud_dim"]
  },

  // --- GAMINGOWE ---
  match_point: {
    type: "gaming",
    intensity: 0.9,
    tags: ["clutch", "peak"],
    actions: ["vision_overlay_focus", "pulse_surge"]
  },

  overtime_surge: {
    type: "gaming",
    intensity: 0.7,
    tags: ["overtime", "tension"],
    actions: ["wave_rise", "director_focus"]
  },

  // --- TEATRALNE / PERFORMATYWNE ---
  dramatic_pause: {
    type: "theatre",
    intensity: 0.3,
    tags: ["pause", "tension"],
    actions: ["hud_dim", "pulse_hold"]
  },

  dramatic_climax: {
    type: "theatre",
    intensity: 0.85,
    tags: ["climax", "peak"],
    actions: ["vision_overlay_burst", "pulse_surge"]
  },

  // --- CROWD FLOW ---
  crowd_rising: {
    type: "crowd",
    intensity: 0.5,
    tags: ["crowd", "rising"],
    actions: ["wave_rise", "hud_ultra_enable"]
  },

  crowd_peak: {
    type: "crowd",
    intensity: 0.9,
    tags: ["crowd", "peak"],
    actions: ["vision_overlay_peak", "pulse_surge"]
  },

  crowd_calm: {
    type: "crowd",
    intensity: 0.2,
    tags: ["crowd", "calm"],
    actions: ["wave_soften", "hud_dim"]
  },

  // --- AI DIRECTOR ---
  director_profile_shift: {
    type: "director",
    intensity: 0.4,
    tags: ["director", "profile"],
    actions: ["director_profile_change", "hud_update"]
  },

  director_mood_shift: {
    type: "director",
    intensity: 0.5,
    tags: ["director", "mood"],
    actions: ["director_mood_change", "hud_ultra_pulse"]
  },

  director_decision_highlight: {
    type: "director",
    intensity: 0.7,
    tags: ["director", "decision"],
    actions: ["vision_overlay_focus", "pulse_surge"]
  },

  // --- SYSTEMOWE / EMOCJONALNE ---
  calm_phase: {
    type: "system",
    intensity: 0.1,
    tags: ["calm"],
    actions: ["pulse_decay", "wave_stabilize"]
  },

  rising_phase: {
    type: "system",
    intensity: 0.4,
    tags: ["rising"],
    actions: ["pulse_rise", "wave_rise"]
  },

  peak_phase: {
    type: "system",
    intensity: 0.9,
    tags: ["peak"],
    actions: ["pulse_surge", "vision_overlay_peak"]
  },

  chaotic_phase: {
    type: "system",
    intensity: 1.0,
    tags: ["chaotic"],
    actions: ["vision_overlay_chaos", "pulse_spike"]
  },

  recovery_phase: {
    type: "system",
    intensity: 0.3,
    tags: ["recovery"],
    actions: ["wave_soften", "pulse_stabilize"]
  }
};

// Narrative sequences (ordered scenes)
export const ScenarioSequences = {
  opening_sequence: [
    "calm_phase",
    "rising_phase",
    "cinematic_highlight"
  ],

  peak_sequence: [
    "music_build_up",
    "music_drop",
    "peak_phase"
  ],

  awards_sequence: [
    "dramatic_pause",
    "director_decision_highlight",
    "dramatic_climax"
  ],

  closing_sequence: [
    "recovery_phase",
    "silent_moment",
    "crowd_calm"
  ]
};

// Narrative arcs (macro-structure)
export const NarrativeArcs = {
  default_arc: [
    "opening_sequence",
    "peak_sequence",
    "awards_sequence",
    "closing_sequence"
  ]
};
`;

  appendIfMissing(file, marker, block);
}

//
// Integracja z Scenario Engine
//
function integrateWithScenarioEngine() {
  const file = path.join(CORE, "festivalScenarioEngine.js");
  const marker = "// FE_FESTIVAL_SCENARIO_LIBRARY_INTEGRATION";

  const block = `
// FE_FESTIVAL_SCENARIO_LIBRARY_INTEGRATION
import { ScenarioLibrary, ScenarioSequences, NarrativeArcs } from "./scenario/festivalScenarioLibrary";

// Przykład użycia:
// const scene = ScenarioLibrary["music_drop"];
// const sequence = ScenarioSequences["opening_sequence"];
// const arc = NarrativeArcs["default_arc"];
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalScenarioLibrary Generator ===");
  ensureDir(CORE);
  ensureDir(SCENARIO);
  scenarioLibrary();
  integrateWithScenarioEngine();
  console.log("=== DONE ===");
}

main();

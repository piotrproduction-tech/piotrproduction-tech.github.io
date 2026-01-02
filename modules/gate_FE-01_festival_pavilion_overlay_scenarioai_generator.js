const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");

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

function scenarioAI() {
  const file = path.join(CORE, "festivalOverlayScenarioAI.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI
// AI-like generator of overlay scenarios based on city state & narrative

/**
 * state:
 *  - pulse: number (BPM / intensity)
 *  - mood: "Calm" | "Energetic" | "Creative" | "Tense" | ...
 *  - wave: { intensity: number, trend: "rising" | "falling" | "stable" }
 *  - reputation: { level: number, points: number }
 *  - identity: { role: string, badges: string[] }
 *  - security: { trustLevel: "low" | "medium" | "high" }
 *  - narrative: { phase: string, tag?: string }
 */

export function generateOverlayScenarioAI(state) {
  const { pulse, mood, wave, reputation, identity, security, narrative } = state || {};

  const steps = [];

  // 1. Start preset based on narrative phase
  const phase = narrative?.phase || "default";

  if (phase === "opening") {
    steps.push({
      delay: 0,
      cmd: "setPreset",
      payload: mood === "Energetic" ? "Showcase" : "Minimal"
    });
  } else if (phase === "awards") {
    steps.push({
      delay: 0,
      cmd: "setPreset",
      payload: "Showcase"
    });
  } else if (phase === "jury") {
    steps.push({
      delay: 0,
      cmd: "setPreset",
      payload: "Minimal"
    });
  } else if (phase === "closing") {
    steps.push({
      delay: 0,
      cmd: "setPreset",
      payload: reputation?.level > 5 ? "Showcase" : "Minimal"
    });
  } else {
    steps.push({
      delay: 0,
      cmd: "setPreset",
      payload: "Minimal"
    });
  }

  // 2. Mode based on pulse / wave
  const baseDelay = 1200;

  if (pulse > 120 || wave?.intensity > 0.7) {
    steps.push({
      delay: baseDelay,
      cmd: "setMode",
      payload: "full"
    });
  } else if (pulse > 90 || wave?.intensity > 0.4) {
    steps.push({
      delay: baseDelay,
      cmd: "setMode",
      payload: "semi"
    });
  } else {
    steps.push({
      delay: baseDelay,
      cmd: "setMode",
      payload: "transparent"
    });
  }

  // 3. Notifications / debug based on security & role
  const role = identity?.role || "guest";
  const trust = security?.trustLevel || "medium";

  if (role === "admin" || role === "jury") {
    steps.push({
      delay: baseDelay + 1000,
      cmd: "toggle",
      payload: "debug"
    });
  }

  if (trust === "low") {
    steps.push({
      delay: baseDelay + 2000,
      cmd: "toggle",
      payload: "notifications"
    });
  } else if (trust === "high" && (phase === "opening" || phase === "awards")) {
    steps.push({
      delay: baseDelay + 2000,
      cmd: "toggle",
      payload: "notifications"
    });
  }

  // 4. Extra flair for high reputation creators
  if (reputation?.points > 1000 && role === "creator") {
    steps.push({
      delay: baseDelay + 3000,
      cmd: "setMode",
      payload: "full"
    });
  }

  // 5. Optional narrative tag tweaks
  if (narrative?.tag === "spotlight") {
    steps.push({
      delay: baseDelay + 4000,
      cmd: "toggle",
      payload: "notifications"
    });
  }

  return steps;
}

/**
 * Helper: wraps AI generator into ScenarioEngine-compatible runner.
 * You can call this from ScenarioEngine:
 *
 *   const steps = generateOverlayScenarioAI(currentState);
 *   runScenarioSteps(steps);
 */
export function buildAIScenarioFromState(state) {
  return generateOverlayScenarioAI(state);
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayScenarioAI Generator ===");
  ensureDir(CORE);
  scenarioAI();
  console.log("=== DONE ===");
}

main();

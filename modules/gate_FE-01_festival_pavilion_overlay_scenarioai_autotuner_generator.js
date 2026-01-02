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

//
// 1. AutoTuner module
//
function autoTunerModule() {
  const file = path.join(CORE, "useFestivalOverlayScenarioAIAutoTuner.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_AUTOTUNER";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_AUTOTUNER
// Learns from history and auto-adjusts AI profile parameters

import { useEffect, useState, useRef } from "react";
import { FestivalOverlayScenarioAIProfiles } from "./festivalOverlayScenarioAIProfiles";

export function useFestivalOverlayScenarioAIAutoTuner(orchestrator, getCurrentState) {
  const [enabled, setEnabled] = useState(true);
  const history = useRef([]);

  // Track last 50 states
  function pushHistory(state) {
    history.current.push(state);
    if (history.current.length > 50) history.current.shift();
  }

  // Compute metrics
  function computeMetrics() {
    const h = history.current;
    if (h.length < 5) return null;

    const avgPulse = h.reduce((a, s) => a + s.pulse, 0) / h.length;
    const avgWave = h.reduce((a, s) => a + s.wave.intensity, 0) / h.length;
    const moodCounts = h.reduce((acc, s) => {
      acc[s.mood] = (acc[s.mood] || 0) + 1;
      return acc;
    }, {});

    const dominantMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0];

    return { avgPulse, avgWave, dominantMood };
  }

  // Auto-tuning logic
  function tuneProfiles(metrics) {
    const { avgPulse, avgWave, dominantMood } = metrics;

    Object.values(FestivalOverlayScenarioAIProfiles).forEach((profile) => {
      // Adjust speed based on pulse
      if (avgPulse > 120) profile.speed = Math.max(0.5, profile.speed * 0.9);
      else if (avgPulse < 80) profile.speed = Math.min(1.5, profile.speed * 1.1);

      // Adjust intensity based on wave
      if (avgWave > 0.7) profile.intensity = Math.min(1.2, profile.intensity + 0.05);
      else if (avgWave < 0.3) profile.intensity = Math.max(0.2, profile.intensity - 0.05);

      // Mood-based preset bias
      if (dominantMood === "Calm") {
        if (profile.name === "CalmDirector") profile.intensity *= 0.95;
      }
      if (dominantMood === "Energetic") {
        if (profile.name === "AggressiveDirector") profile.intensity *= 1.05;
      }
      if (dominantMood === "Creative") {
        if (profile.name === "ExperimentalDirector") profile.intensity *= 1.1;
      }
    });
  }

  // Main loop
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      const state = getCurrentState();
      pushHistory(state);

      const metrics = computeMetrics();
      if (metrics) tuneProfiles(metrics);
    }, 2000);

    return () => clearInterval(interval);
  }, [enabled]);

  return {
    enabled,
    setEnabled,
    history
  };
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. Integration hint for Orchestrator
//
function integrateOrchestrator() {
  const file = path.join(CORE, "useFestivalOverlayScenarioAIOrchestrator.js");
  const marker = "// FE_FESTIVAL_OVERLAY_SCENARIO_AI_AUTOTUNER_INTEGRATION";

  const block = `
// FE_FESTIVAL_OVERLAY_SCENARIO_AI_AUTOTUNER_INTEGRATION
import { useFestivalOverlayScenarioAIAutoTuner } from "./useFestivalOverlayScenarioAIAutoTuner";

// Example usage inside orchestrator:
// const autoTuner = useFestivalOverlayScenarioAIAutoTuner(orchestrator, getCurrentState);
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalOverlayScenarioAIAutoTuner Generator ===");
  ensureDir(CORE);
  autoTunerModule();
  integrateOrchestrator();
  console.log("=== DONE ===");
}

main();

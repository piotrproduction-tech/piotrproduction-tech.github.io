import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

const TEMPLATE_TESTS = {
  "priority-flow-visualizer.test.js": (module) => `
import { FestivalEngine } from "../../apps/FE-01__Festival_Pavilion/core/festivalEngine";

describe("${module} Priority Flow Visualizer", () => {
  it("prints priority flow for sample input", () => {
    const engine = new FestivalEngine();
    const frame = engine.computeFestivalFrame({
      experience: { pulse: 80, wave: 0.7, experienceState: { phase: "RISING" } },
      scenario: { activeScene: "crowd_peak", narrativePhase: "climax" },
      director: { mood: "Chaos", intent: "chaos" },
      uiState: { forcedOverlayMode: null, forcedScene: null },
      audience: { energy: 90 }
    });

    console.log("Priority Flow:", frame.priority);
    expect(frame.priority).toBeDefined();
  });
});
`,

  "priority-heatmap.test.js": (module) => `
import { FestivalEngine } from "../../apps/FE-01__Festival_Pavilion/core/festivalEngine";

describe("${module} Priority Heatmap", () => {
  it("prints priority scores for 100 frames", () => {
    const engine = new FestivalEngine();

    for (let i = 0; i < 100; i++) {
      const frame = engine.computeFestivalFrame({
        experience: { pulse: 60 + Math.sin(i) * 40, wave: 0.5, experienceState: { phase: "RISING" } },
        scenario: { activeScene: "crowd_rising", narrativePhase: "opening" },
        director: { mood: "Calm", intent: "calm" },
        uiState: { forcedOverlayMode: null, forcedScene: null },
        audience: { energy: 50 }
      });

      console.log(i, frame.priority.winner);
      expect(frame.priority).toBeDefined();
    }
  });
});
`,

  "timeline-visualizer.test.js": (module) => `
import { FestivalEngine } from "../../apps/FE-01__Festival_Pavilion/core/festivalEngine";

describe("${module} Timeline Visualizer", () => {
  it("prints 100 frames of FE evolution", () => {
    const engine = new FestivalEngine();

    for (let i = 0; i < 100; i++) {
      const frame = engine.computeFestivalFrame({
        experience: { pulse: 70, wave: 0.6, experienceState: { phase: "RISING" } },
        scenario: { activeScene: "crowd_peak", narrativePhase: "climax" },
        director: { mood: "Chaos", intent: "chaos" },
        uiState: { forcedOverlayMode: null, forcedScene: null },
        audience: { energy: 80 }
      });

      console.log("Frame", i, frame.decision.finalScene);
      expect(frame.decision).toBeDefined();
    }
  });
});
`,

  "scenario-simulator.test.js": (module) => `
import { FestivalEngine } from "../../apps/FE-01__Festival_Pavilion/core/festivalEngine";

describe("${module} Scenario Simulator", () => {
  it("simulates multiple custom scenarios", () => {
    const engine = new FestivalEngine();

    const scenarios = [
      { pulse: 90, wave: 0.8, intent: "chaos" },
      { pulse: 40, wave: 0.3, intent: "calm" },
      { pulse: 70, wave: 0.5, intent: "neutral" }
    ];

    scenarios.forEach((s, i) => {
      const frame = engine.computeFestivalFrame({
        experience: { pulse: s.pulse, wave: s.wave, experienceState: { phase: "RISING" } },
        scenario: { activeScene: "crowd_rising", narrativePhase: "opening" },
        director: { mood: "Mixed", intent: s.intent },
        uiState: { forcedOverlayMode: null, forcedScene: null },
        audience: { energy: 60 }
      });

      console.log("Scenario", i, frame.priority.winner);
      expect(frame.priority).toBeDefined();
    });
  });
});
`,

  "test-upgrade-pack.js": (module) => `
describe("${module} Test Upgrade Pack", () => {
  it("confirms test pack is installed", () => {
    expect(true).toBe(true);
  });
});
`
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function generateTests(module) {
  const testDir = path.join(ROOT, "__tests__", module.toLowerCase());
  ensureDir(testDir);

  Object.entries(TEMPLATE_TESTS).forEach(([filename, template]) => {
    const filePath = path.join(testDir, filename);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, template(module), "utf8");
      console.log("✔ Created:", filePath);
    } else {
      console.log("⏭ Skipped (exists):", filePath);
    }
  });

  console.log(`\n🎉 Test pack for ${module} is ready.`);
}

const moduleName = process.argv[2];

if (!moduleName) {
  console.error("❌ Usage: node scripts/generate-tests.js FE-02");
  process.exit(1);
}

generateTests(moduleName);

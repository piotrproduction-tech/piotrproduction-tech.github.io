const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TESTS_ROOT = path.join(ROOT, "tests");
const FE01_TESTS = path.join(TESTS_ROOT, "FE-01__Festival_Pavilion");

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

function regressionTests() {
  const file = path.join(FE01_TESTS, "festivalEngine.regression.test.js");
  const marker = "// FE_FESTIVAL_ENGINE_REGRESSION_TESTS";

  const block = `
// FE_FESTIVAL_ENGINE_REGRESSION_TESTS

const path = require("path");
const { FestivalEngine } = require(path.join(
  __dirname,
  "..",
  "..",
  "apps",
  "FE-01__Festival_Pavilion",
  "core",
  "festivalEngine.js"
));

function mockExperience(pulse, wave, phase = "RISING") {
  return {
    pulse,
    wave,
    experienceState: { phase }
  };
}

function mockScenario(scene, narrativePhase = "dynamic") {
  return {
    activeScene: scene,
    narrativePhase
  };
}

function mockDirector(mood, intent) {
  return { mood, intent };
}

function mockUI(overlay = null, scene = null) {
  return { forcedOverlayMode: overlay, forcedScene: scene };
}

function mockAudience(energy) {
  return { energy };
}

describe("FestivalEngine Regression Tests — Snapshot Scenes & Overlays", () => {
  let engine;

  beforeEach(() => {
    engine = new FestivalEngine();
  });

  const cases = [
    {
      name: "dramatic climax + neutral energy",
      input: {
        experience: mockExperience(80, 0.3),
        scenario: mockScenario("dramatic_climax", "climax"),
        director: mockDirector("Neutral", null),
        uiState: mockUI(),
        audience: mockAudience(50)
      }
    },
    {
      name: "music drop + high energy",
      input: {
        experience: mockExperience(150, 0.9),
        scenario: mockScenario("music_drop", "peak"),
        director: mockDirector("Neutral", null),
        uiState: mockUI(),
        audience: mockAudience(90)
      }
    },
    {
      name: "director highlight intent",
      input: {
        experience: mockExperience(90, 0.4),
        scenario: mockScenario("opening", "opening"),
        director: mockDirector("Creative", "highlight"),
        uiState: mockUI(),
        audience: mockAudience(40)
      }
    },
    {
      name: "operator forced overlay",
      input: {
        experience: mockExperience(120, 0.6),
        scenario: mockScenario("chaotic_phase", "climax"),
        director: mockDirector("Chaotic", "chaos"),
        uiState: mockUI("FOCUS", null),
        audience: mockAudience(80)
      }
    },
    {
      name: "low energy calm phase",
      input: {
        experience: mockExperience(50, 0.2),
        scenario: mockScenario("cooldown", "ending"),
        director: mockDirector("Neutral", null),
        uiState: mockUI(),
        audience: mockAudience(20)
      }
    }
  ];

  cases.forEach(testCase => {
    test(\`snapshot: \${testCase.name}\`, () => {
      const frame = engine.computeFestivalFrame(testCase.input);

      expect({
        scene: frame.scenario.activeScene,
        overlay: frame.visual.overlay.mode,
        hud: frame.visual.hud.mode,
        effects: frame.visual.effects,
        priority: frame.priority.winner,
        decision: frame.decision
      }).toMatchSnapshot();
    });
  });
});
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalEngine Regression Tests Generator ===");
  ensureDir(TESTS_ROOT);
  ensureDir(FE01_TESTS);
  regressionTests();
  console.log("=== DONE ===");
}

main();

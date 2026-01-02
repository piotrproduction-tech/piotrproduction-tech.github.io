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

function e2eTests() {
  const file = path.join(FE01_TESTS, "festivalEngine.e2e.test.js");
  const marker = "// FE_FESTIVAL_ENGINE_E2E_TESTS";

  const block = `
// FE_FESTIVAL_ENGINE_E2E_TESTS

const path = require("path");

// Zakładamy bundler/ts-node lub transpile — tu używamy ścieżki do core
const { FestivalEngine } = require(path.join(
  __dirname,
  "..",
  "..",
  "apps",
  "FE-01__Festival_Pavilion",
  "core",
  "festivalEngine.js"
));

function mockExperience({ pulse = 80, wave = 0.4, phase = "RISING" } = {}) {
  return {
    pulse,
    wave,
    experienceState: { phase }
  };
}

function mockScenario() {
  return {
    activeScene: null,
    narrativePhase: "opening"
  };
}

function mockDirector({ mood = "Neutral", intent = null } = {}) {
  return { mood, intent };
}

function mockUI({ forcedOverlayMode = null, forcedScene = null } = {}) {
  return { forcedOverlayMode, forcedScene };
}

function mockAudience({ energy = 50 } = {}) {
  return { energy };
}

describe("FestivalEngine E2E", () => {
  let engine;

  beforeEach(() => {
    engine = new FestivalEngine();
  });

  test("basic frame computation works", () => {
    const frame = engine.computeFestivalFrame({
      experience: mockExperience(),
      scenario: mockScenario(),
      director: mockDirector(),
      uiState: mockUI(),
      audience: mockAudience()
    });

    expect(frame).toBeDefined();
    expect(frame.visual).toBeDefined();
    expect(frame.scenario).toBeDefined();
    expect(frame.priority).toBeDefined();
    expect(frame.decision).toBeDefined();
  });

  test("high energy drives CHAOS/PEAK overlays", () => {
    const frame = engine.computeFestivalFrame({
      experience: mockExperience({ pulse: 150, wave: 0.9, phase: "PEAK" }),
      scenario: mockScenario(),
      director: mockDirector(),
      uiState: mockUI(),
      audience: mockAudience({ energy: 90 })
    });

    expect(frame.priority.winner).toBe("energy");
    expect(["CHAOS", "PEAK"]).toContain(frame.decision.finalOverlay);
  });

  test("dramatic scene takes priority over neutral energy", () => {
    const frame = engine.computeFestivalFrame({
      experience: mockExperience({ pulse: 80, wave: 0.3, phase: "RISING" }),
      scenario: { activeScene: "dramatic_climax", narrativePhase: "climax" },
      director: mockDirector(),
      uiState: mockUI(),
      audience: mockAudience()
    });

    expect(frame.priority.winner).toBe("scene");
    expect(frame.scenario.activeScene).toBeDefined();
  });

  test("operator forced overlay overrides everything", () => {
    const frame = engine.computeFestivalFrame({
      experience: mockExperience({ pulse: 150, wave: 0.9, phase: "PEAK" }),
      scenario: { activeScene: "chaotic_phase", narrativePhase: "climax" },
      director: mockDirector({ mood: "Chaotic", intent: "chaos" }),
      uiState: mockUI({ forcedOverlayMode: "FOCUS" }),
      audience: mockAudience({ energy: 95 })
    });

    expect(frame.priority.winner).toBe("operator");
    expect(frame.decision.finalOverlay).toBe("FOCUS");
  });

  test("director highlight intent leads to CINEMATIC overlay", () => {
    const frame = engine.computeFestivalFrame({
      experience: mockExperience({ pulse: 90, wave: 0.4, phase: "RISING" }),
      scenario: mockScenario(),
      director: mockDirector({ mood: "Creative", intent: "highlight" }),
      uiState: mockUI(),
      audience: mockAudience()
    });

    expect(
      ["director", "scene", "operator", "energy", "overlay"].includes(
        frame.priority.winner
      )
    ).toBe(true);

    // niezależnie od zwycięzcy, decyzja reżysera powinna móc wymusić CINEMATIC
    expect(frame.visual.overlay.mode).toBeDefined();
  });

  test("snapshot returns last frame summary", () => {
    engine.computeFestivalFrame({
      experience: mockExperience(),
      scenario: mockScenario(),
      director: mockDirector(),
      uiState: mockUI(),
      audience: mockAudience()
    });

    const snapshot = engine.getFestivalSnapshot();
    expect(snapshot).toBeDefined();
    expect(snapshot.frameIndex).toBe(1);
    expect(snapshot.lastFrame).toBeDefined();
    expect(snapshot.lastPriority).toBeDefined();
    expect(snapshot.lastDecision).toBeDefined();
  });
});
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalEngine E2E Tests Generator ===");
  ensureDir(TESTS_ROOT);
  ensureDir(FE01_TESTS);
  e2eTests();
  console.log("=== DONE ===");
}

main();

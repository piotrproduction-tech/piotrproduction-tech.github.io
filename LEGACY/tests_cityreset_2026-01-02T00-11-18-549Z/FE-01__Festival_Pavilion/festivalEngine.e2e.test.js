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
      experience: mockExperience({ pulse: 90, wave: 0.8 }),
      scenario: mockScenario(),
      director: mockDirector(),
      uiState: mockUI(),
      audience: mockAudience({ energy: 90 })
    });

    expect(frame.priority.winner).toBe("scene");
    expect(frame.decision.finalOverlay).toBe("RISING");
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
      experience: mockExperience({ pulse: 70, wave: 0.6 }),
      scenario: mockScenario(),
      director: mockDirector({ mood: "Chaos", intent: "chaos" }),
      uiState: mockUI(),
      audience: mockAudience({ energy: 60 })
    });

    expect(frame.priority.winner).toBe("director");
    expect(frame.decision.finalOverlay).toBe("RISING");
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

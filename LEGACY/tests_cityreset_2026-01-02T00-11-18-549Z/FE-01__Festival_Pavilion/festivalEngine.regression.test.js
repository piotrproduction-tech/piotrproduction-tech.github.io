


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
    test(`snapshot: ${testCase.name}`, () => {
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

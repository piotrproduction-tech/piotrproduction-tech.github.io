
import { FestivalEngine } from "../../apps/FE-01__Festival_Pavilion/core/festivalEngine";

describe("FE-02 Scenario Simulator", () => {
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

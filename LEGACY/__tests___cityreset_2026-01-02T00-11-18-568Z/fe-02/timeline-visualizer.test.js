
import { FestivalEngine } from "../../apps/FE-01__Festival_Pavilion/core/festivalEngine";

describe("FE-02 Timeline Visualizer", () => {
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

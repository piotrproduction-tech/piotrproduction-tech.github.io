
import { FestivalEngine } from "../../apps/FE-01__Festival_Pavilion/core/festivalEngine";

describe("FE-02 Priority Heatmap", () => {
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


import { FestivalEngine } from "../../apps/FE-01__Festival_Pavilion/core/festivalEngine";

describe("FE-02 Priority Flow Visualizer", () => {
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

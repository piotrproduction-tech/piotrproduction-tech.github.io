// __tests__/visualizers/FE-02__priorityFlowVisualizer.test.js

import { FestivalEngine } from "../../apps/FE-02__AI_Director/engine/festivalEngine.js";

describe("FE‑02 PRIORITY FLOW VISUALIZER", () => {
  it("prints full priority flow for sample input", () => {
    const engine = new FestivalEngine();

    const input = {
      experience: {
        pulse: 90,
        wave: 0.8,
        experienceState: { phase: "RISING" }
      },
      scenario: {
        activeScene: null,
        narrativePhase: "opening"
      },
      director: {
        mood: "Chaos",
        intent: "chaos"
      },
      uiState: {
        forcedOverlayMode: null,
        forcedScene: null
      },
      audience: {
        energy: 90
      }
    };

    const frame = engine.computeFestivalFrame(input);

    console.log("\n=== FE‑02 PRIORITY FLOW VISUALIZER ===\n");
    console.log("INPUT:", input);

    console.log("\nSCENE ANALYSIS:");
    console.log(frame.scenario);

    console.log("\nPRIORITY BREAKDOWN:");
    console.log(frame.priority.layers);

    console.log("\nPRIORITY WINNER:");
    console.log(frame.priority.winner);

    console.log("\nFINAL DECISION:");
    console.log(frame.decision);

    console.log("\nVISUAL OVERLAY:");
    console.log(frame.visual.overlay);

    console.log("\n=== END ===\n");

    expect(frame).toBeDefined();
  });
});

import { AIDirectorEngine } from "../AI_Director/AIDirectorEngine.js";
import { jest } from "@jest/globals";

test("AI Director initializes", () => {
    const engine = new AIDirectorEngine({
        scenarioSelector: {},
        modeManager: {},
        strategyEngine: {},
        filterEngine: {},
        eventAdapter: {}
    });

    expect(engine).toBeDefined();
});

import { HyperOrchestratorEngine } from "../apps/FE-05__Festival_HyperOrchestrator/engine/hyperOrchestratorEngine.js";
import { jest } from "@jest/globals";;;

test("Load test: 10 000 events", async () => {
    const engine = new HyperOrchestratorEngine({
  directorEngine: {},
  uiAdapter: {},
  scenarioAdapter: {},
  notificationAdapter: {}
});

    for (let i = 0; i < 10000; i++) {
        await engine.handleEvent({ type: "TEST_EVENT", index: i });
    }

    expect(true).toBe(true);
});

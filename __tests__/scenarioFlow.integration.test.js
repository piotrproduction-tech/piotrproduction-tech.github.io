import { HyperOrchestratorEngine } from "../apps/FE-05__Festival_HyperOrchestrator/engine/hyperOrchestratorEngine.js";
import { ScenarioRegistry } from "../AI_Director/ScenarioRegistry.js";
import { jest } from "@jest/globals";;;;

test("Scenario flow executes without errors", async () => {
    const engine = new HyperOrchestratorEngine({
  directorEngine: {},
  uiAdapter: {},
  scenarioAdapter: {},
  notificationAdapter: {}
});
    const registry = new ScenarioRegistry();
    const scenario = registry.getByMode("demo")[0];
    const result = await engine.handleEvent(scenario);

    expect(result).toBeDefined();
});

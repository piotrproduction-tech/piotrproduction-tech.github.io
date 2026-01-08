import { AIDirectorEngine } from "../AIDirectorEngine.js";
import { AIDirectorEventAdapter } from "../AIDirectorEventAdapter.js";
import { FilterEngine } from "../FilterEngine.js";
import { DefaultStrategy } from "../DefaultStrategy.js";
import { OnboardingStrategy } from "../OnboardingStrategy.js";
import { StrategyEngine } from "../StrategyEngine.js";
import { ModeManager } from "../ModeManager.js";
import { ScenarioSelector } from "../ScenarioSelector.js";
import { ScenarioRegistry } from "../ScenarioRegistry.js";
import { jest } from "@jest/globals";

describe("AI Director – integration flow", () => {
  test("runs onboarding scenario and dispatches events to HyperOrchestrator", () => {
    const registry = new ScenarioRegistry();
    registry.register("onboarding", {
      name: "Welcome Tour",
      type: "onboarding",
      steps: [
        {
          id: "welcome-tour-1",
          trigger: { type: "time", value: null },
          action: { festivalEvent: "SHOW_CITY_INTRO", payload: {} },
          effect: { cityStateChange: {}, reputationChange: 0, tokenChange: 0 },
          visual: { overlay: "CITY_INTRO", highlight: "CITY_HALL", message: "Welcome to CITY_OF_GATE" },
          priority: 5
        }
      ]
    });

    const scenarioSelector = new ScenarioSelector({ scenarioRegistry: registry });
    const modeManager = new ModeManager();

    const strategyEngine = new StrategyEngine({
      strategies: {
        default: new DefaultStrategy(),
        onboarding: new OnboardingStrategy()
      }
    });

    const cooldownStore = {
      isOnCooldown: () => false
    };
    const availabilityChecker = {
      isAvailable: () => true
    };
    const compatibilityChecker = {
      isCompatible: () => true
    };

    const filterEngine = new FilterEngine({
      cooldownStore,
      availabilityChecker,
      compatibilityChecker
    });

    const events = [];
    const hyperOrchestrator = {
      enqueueEvent: (event) => events.push(event)
    };

    const eventAdapter = new AIDirectorEventAdapter({ hyperOrchestrator });

    const engine = new AIDirectorEngine({
      scenarioSelector,
      modeManager,
      strategyEngine,
      filterEngine,
      eventAdapter
    });

    const context = {
      isNewUser: true,
      isInFestivalEvent: false,
      hasCrisis: false,
      isProgressing: false,
      isSocialMoment: false,
      mode: "onboarding",
      userId: "user-1",
      scenarioName: "Welcome Tour"
    };

    const steps = engine.runTick(context);

    expect(steps.length).toBeGreaterThan(0);
    expect(events.length).toBeGreaterThan(0);

    const event = events[0];
    expect(event.type).toBe("AI_DIRECTOR_SCENARIO_STEP");
    expect(event.stepId).toBe("welcome-tour-1");
    expect(event.payload.visual.overlay).toBe("CITY_INTRO");
    expect(event.payload.visual.highlight).toBe("CITY_HALL");
  });
});

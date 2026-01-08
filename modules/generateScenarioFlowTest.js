// modules/generateScenarioFlowTest.js
const fs = require("fs");
const path = require("path");

const TEST_DIR = path.join("tests", "integration");
const TEST_FILE = path.join(TEST_DIR, "scenarioFlow.integration.test.js");

const content = `
// tests/integration/scenarioFlow.integration.test.js

/**
 * Test integracyjny pełnego przepływu:
 *
 * SCENARIO → AI Director → HyperOrchestrator → Sync Engine → CityAdapter
 * → ScenarioEventAdapter → CityVisualizerController → Renderery/UI
 */

const AIDirectorEngine = require("../../AI_Director/AIDirectorEngine");
const ScenarioSelector = require("../../AI_Director/ScenarioSelector");
const ModeManager = require("../../AI_Director/ModeManager");
const StrategyEngine = require("../../AI_Director/StrategyEngine");
const FilterEngine = require("../../AI_Director/FilterEngine");
const AIDirectorEventAdapter = require("../../AI_Director/AIDirectorEventAdapter");
const ScenarioRegistry = require("../../AI_Director/ScenarioRegistry");

const HyperOrchestratorEngine = require("../../FE-05__Festival_HyperOrchestrator/engine/HyperOrchestratorEngine");

const SyncEngine = require("../../SYNC_ENGINE/bridge/SyncBridge"); // Twój realny SyncBridge
const CityAdapter = require("../../SYNC_ENGINE/bridge/CityAdapter");

const ScenarioEventAdapter = require("../../CITY_VISUALIZER/events/ScenarioEventAdapter");
const CityVisualizerController = require("../../CITY_VISUALIZER/controller/CityVisualizerController");

describe("FULL SCENARIO FLOW – integration test", () => {
    test("scenario step triggers visual overlay, highlight and message", () => {

        // 1. SCENARIO REGISTRY
        const registry = new ScenarioRegistry();
        registry.register("onboarding", {
            name: "Welcome Tour",
            steps: [
                {
                    id: "welcome-1",
                    priority: 5,
                    visual: {
                        overlay: "CITY_INTRO",
                        highlight: "CITY_HALL",
                        message: "Welcome to CITY_OF_GATE"
                    }
                }
            ]
        });

        // 2. AI DIRECTOR
        const scenarioSelector = new ScenarioSelector({ scenarioRegistry: registry });
        const modeManager = new ModeManager();

        const DefaultStrategy = require("../../AI_Director/strategies/defaultStrategy");
        const OnboardingStrategy = require("../../AI_Director/strategies/onboardingStrategy");

        const strategyEngine = new StrategyEngine({
            strategies: {
                default: new DefaultStrategy(),
                onboarding: new OnboardingStrategy()
            }
        });

        const filterEngine = new FilterEngine({
            cooldownStore: { isOnCooldown: () => false },
            availabilityChecker: { isAvailable: () => true },
            compatibilityChecker: { isCompatible: () => true }
        });

        // 3. CITY VISUALIZER MOCKS
        const overlayCalls = [];
        const highlightCalls = [];
        const messageCalls = [];

        const controller = new CityVisualizerController({
            overlayRenderer: { show: (name) => overlayCalls.push(name) },
            highlightRenderer: { highlight: (name) => highlightCalls.push(name) },
            messageUI: { show: (text) => messageCalls.push(text) }
        });

        const scenarioEventAdapter = new ScenarioEventAdapter({ controller });

        // 4. SYNC ENGINE + CITY ADAPTER
        const cityAdapter = new CityAdapter({ scenarioEventAdapter });

        const syncEngine = {
            handleEvent: (event) => cityAdapter.send(event)
        };

        // 5. HYPERORCHESTRATOR
        const orchestrator = new HyperOrchestratorEngine({ syncEngine });

        // 6. AI DIRECTOR EVENT ADAPTER
        const eventAdapter = new AIDirectorEventAdapter({ hyperOrchestrator: orchestrator });

        const aiDirector = new AIDirectorEngine({
            scenarioSelector,
            modeManager,
            strategyEngine,
            filterEngine,
            eventAdapter
        });

        // 7. CONTEXT
        const context = {
            isNewUser: true,
            mode: "onboarding",
            userId: "user-1"
        };

        // 8. RUN FLOW
        aiDirector.runTick(context);
        orchestrator.tick();

        // 9. ASSERTIONS
        expect(overlayCalls).toContain("CITY_INTRO");
        expect(highlightCalls).toContain("CITY_HALL");
        expect(messageCalls).toContain("Welcome to CITY_OF_GATE");
    });
});
`;

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log("CREATE DIR:", dir);
    }
}

function createTestFile() {
    if (!fs.existsSync(TEST_FILE)) {
        fs.writeFileSync(TEST_FILE, content, "utf8");
        console.log("CREATE:", TEST_FILE);
    } else {
        console.log("SKIP (exists):", TEST_FILE);
    }
}

console.log("=== Generating full scenario flow integration test ===");
ensureDir(TEST_DIR);
createTestFile();
console.log("=== Done ===");

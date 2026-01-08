// modules/generateScenarioLoadTest.js
const fs = require("fs");
const path = require("path");

const TEST_DIR = path.join("tests", "integration");
const TEST_FILE = path.join(TEST_DIR, "scenarioLoad.integration.test.js");

const content = `
// tests/integration/scenarioLoad.integration.test.js

/**
 * Test obciążeniowy:
 * 10 000 eventów scenariuszy przechodzi przez:
 * AI Director → HyperOrchestrator → Sync Engine → CityAdapter → CITY_VISUALIZER
 */

const AIDirectorEngine = require("../../AI_Director/AIDirectorEngine");
const ScenarioSelector = require("../../AI_Director/ScenarioSelector");
const ModeManager = require("../../AI_Director/ModeManager");
const StrategyEngine = require("../../AI_Director/StrategyEngine");
const FilterEngine = require("../../AI_Director/FilterEngine");
const AIDirectorEventAdapter = require("../../AI_Director/AIDirectorEventAdapter");
const ScenarioRegistry = require("../../AI_Director/ScenarioRegistry");

const HyperOrchestratorEngine = require("../../FE-05__Festival_HyperOrchestrator/engine/HyperOrchestratorEngine");
const CityAdapter = require("../../SYNC_ENGINE/bridge/CityAdapter");

const ScenarioEventAdapter = require("../../CITY_VISUALIZER/events/ScenarioEventAdapter");
const CityVisualizerController = require("../../CITY_VISUALIZER/controller/CityVisualizerController");

describe("SCENARIO LOAD – 10 000 events", () => {
    test("system handles 10 000 scenario steps without breaking", () => {
        const registry = new ScenarioRegistry();

        const steps = [];
        for (let i = 0; i < 10000; i++) {
            steps.push({
                id: "step-" + i,
                priority: i % 10,
                visual: {
                    overlay: "OVERLAY_" + (i % 5),
                    highlight: "DISTRICT_" + (i % 20),
                    message: "MSG_" + i
                }
            });
        }

        registry.register("onboarding", {
            name: "Stress Test Scenario",
            steps
        });

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

        const overlayCalls = [];
        const highlightCalls = [];
        const messageCalls = [];

        const controller = new CityVisualizerController({
            overlayRenderer: { show: (name) => overlayCalls.push(name) },
            highlightRenderer: { highlight: (name) => highlightCalls.push(name) },
            messageUI: { show: (text) => messageCalls.push(text) }
        });

        const scenarioEventAdapter = new ScenarioEventAdapter({ controller });
        const cityAdapter = new CityAdapter({ scenarioEventAdapter });

        const syncEngine = {
            handleEvent: (event) => cityAdapter.send(event)
        };

        const orchestrator = new HyperOrchestratorEngine({ syncEngine });
        const eventAdapter = new AIDirectorEventAdapter({ hyperOrchestrator: orchestrator });

        const aiDirector = new AIDirectorEngine({
            scenarioSelector,
            modeManager,
            strategyEngine,
            filterEngine,
            eventAdapter
        });

        const context = {
            isNewUser: true,
            mode: "onboarding",
            userId: "user-load-test"
        };

        for (let i = 0; i < 10000; i++) {
            aiDirector.runTick(context);
            orchestrator.tick();
        }

        expect(overlayCalls.length).toBeGreaterThan(0);
        expect(highlightCalls.length).toBeGreaterThan(0);
        expect(messageCalls.length).toBeGreaterThan(0);
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

console.log("=== Generating SCENARIO LOAD test (10 000 events) ===");
ensureDir(TEST_DIR);
createTestFile();
console.log("=== Done ===");

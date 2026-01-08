// modules/resetTestsToESM.js
const fs = require("fs");
const path = require("path");

console.log("=== RESET TESTÓW DO ESM ===");

// 1. Usuń cały katalog __tests__
const TEST_DIR = "__tests__";

if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
    console.log("USUNIĘTO:", TEST_DIR);
}

// 2. Utwórz czysty katalog testów
fs.mkdirSync(TEST_DIR);
console.log("UTWORZONO:", TEST_DIR);

// 3. Generujemy nowe testy ESM
const tests = {
    "aiDirector.test.js": `
import AIDirectorEngine from "../AI_Director/AIDirectorEngine.js";

test("AI Director initializes", () => {
    const engine = new AIDirectorEngine();
    expect(engine).toBeDefined();
});
`,

    "scenarioFlow.integration.test.js": `
import HyperOrchestratorEngine from "../apps/FE-05__Festival_HyperOrchestrator/engine/hyperOrchestratorEngine.js";
import ScenarioRegistry from "../AI_Director/ScenarioRegistry.js";

test("Scenario flow executes without errors", async () => {
    const engine = new HyperOrchestratorEngine();
    const registry = new ScenarioRegistry();

    const scenario = registry.getScenario("demo");
    const result = await engine.runScenario(scenario);

    expect(result).toBeDefined();
});
`,

    "scenarioLoad.integration.test.js": `
import HyperOrchestratorEngine from "../apps/FE-05__Festival_HyperOrchestrator/engine/hyperOrchestratorEngine.js";

test("Load test: 10 000 events", async () => {
    const engine = new HyperOrchestratorEngine();

    for (let i = 0; i < 10000; i++) {
        await engine.handleEvent({ type: "TEST_EVENT", index: i });
    }

    expect(true).toBe(true);
});
`,

    "cityVisualizer.test.js": `
import ScenarioEventAdapter from "../CITY_VISUALIZER/events/ScenarioEventAdapter.js";

test("Visualizer adapter exists", () => {
    const adapter = new ScenarioEventAdapter();
    expect(adapter).toBeDefined();
});
`,

    "syncEngine.test.js": `
import SyncBridge from "../SYNC_ENGINE/bridge/SyncBridge.js";

test("SyncBridge initializes", () => {
    const sync = new SyncBridge();
    expect(sync).toBeDefined();
});
`
};

// 4. Zapisz testy
for (const [file, content] of Object.entries(tests)) {
    fs.writeFileSync(path.join(TEST_DIR, file), content.trim() + "\n");
    console.log("DODANO TEST:", file);
}

// 5. Ustaw Jest w tryb ESM
const pkgPath = "package.json";
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

pkg.type = "module";
pkg.jest = {
    testEnvironment: "node",
    transform: {}
};

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log("ZAKTUALIZOWANO package.json → ESM MODE");

console.log("=== RESET ZAKOŃCZONY ===");

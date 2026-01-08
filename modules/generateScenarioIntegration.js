// modules/generateScenarioIntegration.js
const fs = require("fs");
const path = require("path");

function safeAppend(filePath, marker, content) {
    if (!fs.existsSync(filePath)) {
        console.log("SKIP (file not found):", filePath);
        return;
    }

    const existing = fs.readFileSync(filePath, "utf8");
    if (existing.includes(marker)) {
        console.log("SKIP (already integrated):", filePath);
        return;
    }

    fs.writeFileSync(filePath, existing + "\n\n" + content, "utf8");
    console.log("UPDATE:", filePath);
}

function ensureFile(filePath, content) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content, "utf8");
        console.log("CREATE:", filePath);
    } else {
        console.log("SKIP (exists):", filePath);
    }
}

console.log("=== Integracja SCENARIO → CITY_VISUALIZER ===");

// 1. CityAdapter.js
const cityAdapterPath = path.join("SYNC_ENGINE", "bridge", "CityAdapter.js");
const cityAdapterMarker = "// [SCENARIO_INTEGRATION]";
const cityAdapterContent = `${cityAdapterMarker}
handleScenarioEvent(event) {
    const visual = event.payload?.visual;
    if (!visual) return;

    if (visual.overlay) {
        this.scenarioEventAdapter.handle({ type: "SHOW_OVERLAY", name: visual.overlay });
    }
    if (visual.highlight) {
        this.scenarioEventAdapter.handle({ type: "HIGHLIGHT_DISTRICT", name: visual.highlight });
    }
    if (visual.message) {
        this.scenarioEventAdapter.handle({ type: "SHOW_MESSAGE", text: visual.message });
    }
}`;

safeAppend(cityAdapterPath, cityAdapterMarker, cityAdapterContent);

// 2. ScenarioEventAdapter.js
const scenarioAdapterPath = path.join("CITY_VISUALIZER", "events", "ScenarioEventAdapter.js");
const scenarioAdapterMarker = "// [SCENARIO_EVENT_HANDLERS]";
const scenarioAdapterContent = `${scenarioAdapterMarker}
handle(event) {
    switch (event.type) {
        case "SHOW_OVERLAY":
            this.controller.showOverlay(event.name);
            break;
        case "HIGHLIGHT_DISTRICT":
            this.controller.highlightDistrict(event.name);
            break;
        case "SHOW_MESSAGE":
            this.controller.showMessage(event.text);
            break;
    }
}`;

safeAppend(scenarioAdapterPath, scenarioAdapterMarker, scenarioAdapterContent);

// 3. CityVisualizerController.js
const controllerPath = path.join("CITY_VISUALIZER", "controller", "CityVisualizerController.js");
const controllerMarker = "// [SCENARIO_CONTROLLER_METHODS]";
const controllerContent = `${controllerMarker}
showOverlay(name) {
    this.overlayRenderer.show(name);
}

highlightDistrict(name) {
    this.highlightRenderer.highlight(name);
}

showMessage(text) {
    this.messageUI.show(text);
}`;

safeAppend(controllerPath, controllerMarker, controllerContent);

console.log("=== Integracja zakończona ===");

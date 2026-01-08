const fs = require("fs");
const path = require("path");

// ------------------------------
// CONFIG
// ------------------------------

const overlays = [
  "CityHeatmapOverlay",
  "CityPulseOverlay",
  "CityMoodOverlay",
  "CityWeatherOverlay",
  "CityRhythmOverlay",
  "CityBroadcastOverlay",
  "CityMemoryOverlay",
  "CityAIOverlay",
  "CityPersonalityOverlay",
  "CityNarrativeOverlay",
  "CityEconomyOverlay",
  "CityReputationOverlay",
  "CityGovernanceOverlay",
  "CitySimulationOverlay",
  "CityEmergenceOverlay"
];

const baseViews = path.resolve("src/views");
const baseUI = path.resolve("src/ui");
const baseMap = path.resolve("src/map");

// ------------------------------
// HELPERS
// ------------------------------

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeFileIfMissing(file, content) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, content);
    console.log("✔ Created:", file);
  } else {
    console.log("• Exists:", file);
  }
}

// ------------------------------
// BASIC UI TEMPLATES
// ------------------------------

function overlayTemplate(name) {
  return (
    "import React from \"react\";\n\n" +
    "export function " + name + "({ data }) {\n" +
    "  return (\n" +
    "    <div className=\"" + name + "-overlay\">\n" +
    "      <pre>{JSON.stringify(data, null, 2)}</pre>\n" +
    "    </div>\n" +
    "  );\n" +
    "}\n"
  );
}

function viewsTemplate() {
  return (
    "import React from \"react\";\n" +
    "import CityMapView from \"../views/CityMapView.jsx\";\n\n" +
    "export function Views({ activeView }) {\n" +
    "  if (!activeView) return null;\n\n" +
    "  switch (activeView) {\n" +
    "    case \"map\":\n" +
    "      return <CityMapView />;\n" +
    "    default:\n" +
    "      return <div>Unknown view: {activeView}</div>;\n" +
    "  }\n" +
    "}\n"
  );
}

function panelsTemplate() {
  return (
    "import React from \"react\";\n\n" +
    "export function Panels({ activePanel }) {\n" +
    "  if (!activePanel) return null;\n\n" +
    "  return (\n" +
    "    <div className=\"panel\">\n" +
    "      <h2>{activePanel}</h2>\n" +
    "      <p>Panel content for {activePanel} will appear here.</p>\n" +
    "    </div>\n" +
    "  );\n" +
    "}\n"
  );
}

function glowTemplate() {
  return (
    "export function cityMapGlow(ctx) {\n" +
    "  ctx.fillStyle = \"rgba(255,255,255,0.1)\";\n" +
    "  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);\n" +
    "}\n"
  );
}

// ------------------------------
// ADVANCED GENERATORS
// ------------------------------

const { generatePanels } = require("./generators/panels");
const { generateMenu } = require("./generators/menu");
const { generateMapLayers } = require("./generators/mapLayers");
const { generateHeartbeatInspector } = require("./generators/heartbeatInspector");
const { generateCityMapView } = require("./generators/cityMapView");
const { generateUIDocs } = require("./generators/uiDocs");
const { generateUIEndpointTests } = require("./generators/uiEndpointTests");
const { generateMapGrid } = require("./generators/mapGrid");

// ------------------------------
// ENGINE MOCK
// ------------------------------

const engine = require("../src/engineMock");

// ------------------------------
// EXECUTION
// ------------------------------

console.log("✨ Generating UI 12.x…");

// Basic dirs
ensureDir(baseViews);
ensureDir(baseUI);
ensureDir(baseMap);

// Overlays
overlays.forEach((name) => {
  const file = path.join(baseViews, name + ".jsx");
  writeFileIfMissing(file, overlayTemplate(name));
});

// Views.jsx
writeFileIfMissing(path.join(baseUI, "Views.jsx"), viewsTemplate());

// Panels.jsx
writeFileIfMissing(path.join(baseUI, "Panels.jsx"), panelsTemplate());

// Glow
writeFileIfMissing(path.join(baseMap, "cityMapGlow.js"), glowTemplate());

// Advanced generators
generatePanels(engine.getPanels());
generateMenu(engine.getMenuItems());
generateMapLayers(engine.getMapLayers());
generateHeartbeatInspector();
generateCityMapView(engine.getOverlayList());
generateUIDocs(engine);
generateUIEndpointTests(engine);
generateMapGrid();

console.log("\n🌆 UI 12.x generation complete.");

const fs = require("fs");
const path = require("path");

function generateUIEndpointTests(engine) {
  const testsDir = path.resolve("tests/ui");
  if (!fs.existsSync(testsDir)) fs.mkdirSync(testsDir, { recursive: true });

  const panels = engine.getPanels();
  const menu = engine.getMenuItems();

  let content =
    "import { describe, it } from \"vitest\";\n" +
    "import { engine } from \"../../DistrictEngine_12.x/engine.js\";\n\n";

  content += "describe(\"UI endpoints\", () => {\n";

  menu.forEach(item => {
    content +=
      "  it(\"menu item '" + item.id + "' is available\", async () => {\n" +
      "    const res = await engine.ui.menu.get(\"" + item.id + "\");\n" +
      "    if (!res) throw new Error(\"Missing menu item: " + item.id + "\");\n" +
      "  });\n";
  });

  panels.forEach(panel => {
    content +=
      "  it(\"panel '" + panel.id + "' is available\", async () => {\n" +
      "    const res = await engine.ui.panels.get(\"" + panel.id + "\");\n" +
      "    if (!res) throw new Error(\"Missing panel: " + panel.id + "\");\n" +
      "  });\n";
  });

  content += "});\n";

  const file = path.join(testsDir, "ui.endpoints.test.jsx");
  fs.writeFileSync(file, content);
  console.log("✔ UI endpoint tests:", file);
}

module.exports = { generateUIEndpointTests };

const fs = require("fs");
const path = require("path");

function generatePanels(enginePanels) {
  const panelsDir = path.resolve("src/ui/panels");
  if (!fs.existsSync(panelsDir)) fs.mkdirSync(panelsDir, { recursive: true });

  enginePanels.forEach(panel => {
    const file = path.join(panelsDir, `${panel.id}.jsx`);
    const content =
      "import React from \"react\";\n\n" +
      "export function " + panel.id.replace(/-/g, "_") + "() {\n" +
      "  return (\n" +
      "    <div className=\"panel\">\n" +
      "      <h2>" + panel.title + "</h2>\n" +
      "      <p>Panel: " + panel.id + "</p>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n";

    fs.writeFileSync(file, content);
    console.log("✔ Panel:", panel.id);
  });
}

module.exports = { generatePanels };

const fs = require("fs");
const path = require("path");

function generateUIDocs(engine) {
  const docsDir = path.resolve("docs");
  if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

  const panels = engine.getPanels();
  const menu = engine.getMenuItems();
  const layers = engine.getMapLayers();
  const overlays = engine.getOverlayList();

  let md = "# UI 12.x – Dokumentacja\n\n";

  md += "## Menu\n\n";
  menu.forEach(item => {
    md += "- **" + item.id + "** — " + item.label + "\n";
  });

  md += "\n## Panele\n\n";
  panels.forEach(panel => {
    md += "- **" + panel.id + "** — " + panel.title + "\n";
  });

  md += "\n## Warstwy mapy\n\n";
  layers.forEach(layer => {
    md += "- **" + layer.id + "** — typ: `" + layer.type + "`\n";
  });

  md += "\n## Overlaye\n\n";
  overlays.forEach(o => {
    md += "- **" + o + "**\n";
  });

  const file = path.join(docsDir, "UI_12x.md");
  fs.writeFileSync(file, md);
  console.log("✔ UI docs:", file);
}

module.exports = { generateUIDocs };

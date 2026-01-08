const fs = require("fs");
const path = require("path");

function generateMapLayers(layers) {
  const dir = path.resolve("src/map/layers");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  layers.forEach(layer => {
    const file = path.join(dir, `${layer.id}.js`);
    const content =
      "export function " + layer.id.replace(/-/g, "_") + "(ctx, data) {\n" +
      "  // TODO: draw " + layer.type + " layer\n" +
      "}\n";

    fs.writeFileSync(file, content);
    console.log("✔ Map layer:", layer.id);
  });
}

module.exports = { generateMapLayers };

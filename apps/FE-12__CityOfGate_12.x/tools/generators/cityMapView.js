const fs = require("fs");
const path = require("path");

function generateCityMapView(overlays) {
  const file = path.resolve("src/views/CityMapView.jsx");

  let imports = "";
  let overlayCalls = "";

  overlays.forEach(name => {
    imports += "import { " + name + " } from \"./" + name + ".jsx\";\n";
    overlayCalls += "      <" + name + " data={heartbeat." + name.replace("City", "").replace("Overlay", "").toLowerCase() + "} />\n";
  });

  const content =
    "import React from \"react\";\n" +
    imports +
    "\nexport default function CityMapView({ heartbeat }) {\n" +
    "  return (\n" +
    "    <div className=\"city-map-view\">\n" +
    overlayCalls +
    "    </div>\n" +
    "  );\n" +
    "}\n";

  fs.writeFileSync(file, content);
  console.log("✔ CityMapView generated");
}

module.exports = { generateCityMapView };

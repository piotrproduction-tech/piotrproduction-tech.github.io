const fs = require("fs");
const path = require("path");

function generateHeartbeatInspector() {
  const file = path.resolve("src/ui/HeartbeatInspector.jsx");

  const content =
    "import React from \"react\";\n\n" +
    "export function HeartbeatInspector({ heartbeat }) {\n" +
    "  return (\n" +
    "    <div className=\"heartbeat-inspector\">\n" +
    "      <h2>City Heartbeat</h2>\n" +
    "      <pre>{JSON.stringify(heartbeat, null, 2)}</pre>\n" +
    "    </div>\n" +
    "  );\n" +
    "}\n";

  fs.writeFileSync(file, content);
  console.log("✔ Heartbeat Inspector generated");
}

module.exports = { generateHeartbeatInspector };

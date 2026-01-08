const fs = require("fs");
const path = require("path");

function generateMenu(menuItems) {
  const file = path.resolve("src/ui/Menu.jsx");

  let imports = "";
  let items = "";

  menuItems.forEach(item => {
    items +=
      "      <button onClick={() => onMenuClick(\"" + item.id + "\")}>"
      + item.label + "</button>\n";
  });

  const content =
    "import React from \"react\";\n\n" +
    "export function Menu({ onMenuClick }) {\n" +
    "  return (\n" +
    "    <div className=\"menu\">\n" +
    items +
    "    </div>\n" +
    "  );\n" +
    "}\n";

  fs.writeFileSync(file, content);
  console.log("✔ Menu generated");
}

module.exports = { generateMenu };

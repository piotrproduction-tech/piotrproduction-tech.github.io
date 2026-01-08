// tools/validate-exports.js
import fs from "fs";
import path from "path";
import { isLegacy } from "./legacy-filter.js";

const ROOT = process.cwd();

function walk(dir, files = []) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (file.endsWith(".js") || file.endsWith(".jsx")) files.push(full);
  }
  return files;
}

function validate() {
  console.log("🔍 VALIDATOR EKSPORTÓW 12.x…\n");

  const files = walk(ROOT).filter(f => !isLegacy(f));
  const errors = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");

    const importLines = content.match(/import .* from ["'][^"']+["']/g) || [];

    for (const line of importLines) {
      const match = line.match(/import\s+{([^}]+)}/);
      if (!match) continue;

      const names = match[1].split(",").map(s => s.trim());
      const from = line.match(/from ["']([^"']+)["']/)[1];

      if (!from.startsWith(".")) continue;

      const resolved =
        path.resolve(path.dirname(file), from + ".jsx") ||
        path.resolve(path.dirname(file), from + ".js");

      if (!fs.existsSync(resolved)) continue;

      const target = fs.readFileSync(resolved, "utf8");

      names.forEach(name => {
        if (
          !target.includes(`export function ${name}`) &&
          !target.includes(`export const ${name}`) &&
          !target.includes(`export class ${name}`)
        ) {
          errors.push(
            `❌ ${file}\n    → Importuje ${name}, ale ${resolved} nie eksportuje tej nazwy.`
          );
        }
      });
    }
  }

  if (errors.length === 0) {
    console.log("✅ Wszystkie eksporty w 12.x są poprawne.");
  } else {
    console.log("\n🚨 PROBLEMY:\n");
    console.log(errors.join("\n\n"));
  }
}

validate();

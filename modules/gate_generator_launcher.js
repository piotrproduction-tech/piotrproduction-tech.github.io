/**
 * CITYOF-GATE :: Generator Launcher (ESM)
 */

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

export async function run() {
  const name = process.argv[2];

  if (!name) {
    console.log("Użycie: node modules/gate_generator_launcher.js <generator_name>");
    return;
  }

  const file = path.join(ROOT, "modules", `gate_${name}_generator.js`);

  try {
    const module = await import(`file://${file}`);
    module.run();
  } catch (err) {
    console.error("❌ Nie znaleziono generatora:", file);
  }
}

run();

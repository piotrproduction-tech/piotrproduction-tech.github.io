/**
 * AUTO-LOADER GENERATOR dla FE-00__City
 *
 * Co robi:
 * - skanuje katalog apps/
 * - znajduje wszystkie moduły FE-XX__*
 * - ignoruje FE-00__City
 * - generuje apps/FE-00__City/modules/ModuleLoader.js
 *   z:
 *     - importami modułów
 *     - tablicą modules[]
 *     - prostą nawigacją
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APPS = path.join(ROOT, "apps");
const FE00_DIR = path.join(APPS, "FE-00__City");
const FE00_MODULES_DIR = path.join(FE00_DIR, "modules");
const TARGET = path.join(FE00_MODULES_DIR, "ModuleLoader.js");

function getFeModules() {
  if (!fs.existsSync(APPS)) return [];
  return fs
    .readdirSync(APPS)
    .filter(
      (name) =>
        name.startsWith("FE-") &&
        name !== "FE-00__City" &&
        fs.statSync(path.join(APPS, name)).isDirectory()
    )
    .sort();
}

function buildModuleLoader(modules) {
  const imports = modules
    .map((name) => {
      const [idPart] = name.split("__"); // FE-01
      const exportName = `${idPart.replace(/-/g, "_")}_Module`;
      return `import { ${exportName} } from "../../${name}/index.js";`;
    })
    .join("\n");

  const modulesArray = modules
    .map((name) => {
      const [idPart] = name.split("__");
      const exportName = `${idPart.replace(/-/g, "_")}_Module`;
      return `  ${exportName}`;
    })
    .join(",\n");

  return `import React, { useState } from "react";
${imports}

const modules = [
${modulesArray}
];

export function ModuleLoader() {
  const [route, setRoute] = useState(
    modules[0]?.config?.baseRoute || "/"
  );

  const handleNav = (newRoute) => (e) => {
    e.preventDefault();
    setRoute(newRoute);
  };

  const activeModule =
    modules.find((m) => route.startsWith(m.config.baseRoute)) || modules[0];

  return (
    <div>
      <nav>
        {modules.map((m) => (
          <a
            key={m.config.id}
            href={m.config.baseRoute}
            onClick={handleNav(m.config.baseRoute)}
            style={{ marginRight: "12px" }}
          >
            {m.config.name}
          </a>
        ))}
      </nav>
      <hr />
      {activeModule ? (
        activeModule.router(route)
      ) : (
        <div>Brak aktywnego modułu dla ścieżki: {route}</div>
      )}
    </div>
  );
}
`;
}

console.log("🏙️  GENERATOR AUTO-LOADERA FE-00__City — START...");

const feModules = getFeModules();

if (feModules.length === 0) {
  console.log("❌ Nie znaleziono żadnych modułów FE-XX w apps/");
  process.exit(1);
}

console.log(`Znalezione moduły FE: ${feModules.join(", ")}`);

if (!fs.existsSync(FE00_DIR)) {
  console.log("❌ Brak katalogu FE-00__City w apps/");
  process.exit(1);
}

if (!fs.existsSync(FE00_MODULES_DIR)) {
  fs.mkdirSync(FE00_MODULES_DIR, { recursive: true });
}

const content = buildModuleLoader(feModules);
fs.writeFileSync(TARGET, content);

console.log(`✅ Wygenerowano auto-loader: ${path.relative(ROOT, TARGET)}`);
console.log("🎉 GENERATOR AUTO-LOADERA — ZAKOŃCZONY.");

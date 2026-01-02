const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const CITY_FOLDER = path.join(ROOT, "FE-00__City");

function ensureDir(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

function writeFileForce(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
  console.log(`✅ Utworzono: ${path.relative(ROOT, filePath)}`);
}

console.log("🏙️ CITY FRONTEND GENERATOR v1 start...");

// 1. index.js
writeFileForce(
  path.join(CITY_FOLDER, "index.js"),
  `import React from "react";
import { createRoot } from "react-dom/client";
import { CityApp } from "./CityApp";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<CityApp />);
`
);

// 2. CityApp.jsx
writeFileForce(
  path.join(CITY_FOLDER, "CityApp.jsx"),
  `import React, { useState, useEffect } from "react";
import { CityMenu } from "./CityMenu";
import { CityRouter } from "./CityRouter";
import { loadModules } from "./ModuleLoader";
import "./styles.css";

export function CityApp() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const loaded = loadModules();
    setModules(loaded);
  }, []);

  const [route, setRoute] = useState(window.location.pathname);

  function navigate(path) {
    window.history.pushState({}, "", path);
    setRoute(path);
  }

  useEffect(() => {
    const handler = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  return (
    <div className="city-layout">
      <CityMenu modules={modules} navigate={navigate} />
      <main className="city-content">
        <CityRouter route={route} modules={modules} />
      </main>
    </div>
  );
}
`
);

// 3. CityMenu.jsx
writeFileForce(
  path.join(CITY_FOLDER, "CityMenu.jsx"),
  `import React from "react";

export function CityMenu({ modules, navigate }) {
  return (
    <nav className="city-menu">
      <h2>CITYOF-GATE</h2>
      <ul>
        {modules.map((m) => (
          <li key={m.id}>
            <button onClick={() => navigate(m.baseRoute)}>
              {m.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
`
);

// 4. CityRouter.jsx
writeFileForce(
  path.join(CITY_FOLDER, "CityRouter.jsx"),
  `import React from "react";

export function CityRouter({ route, modules }) {
  for (const mod of modules) {
    if (route.startsWith(mod.baseRoute)) {
      return mod.router(route);
    }
  }

  return (
    <div>
      <h2>Witaj w CITYOF-GATE</h2>
      <p>Wybierz moduł z menu po lewej.</p>
    </div>
  );
}
`
);

// 5. ModuleLoader.js
writeFileForce(
  path.join(CITY_FOLDER, "ModuleLoader.js"),
  `export function loadModules() {
  const modules = [];

  // FESTIWAL (FE-01)
  try {
    const { FestivalPavilionModule } = require("../../apps/FE-01__Festival_Pavilion/index.js");

    modules.push({
      id: "FE-01",
      name: "Festival Pavilion",
      baseRoute: "/festival",
      router: FestivalPavilionModule.router
    });
  } catch (e) {
    console.warn("⚠️ FE-01__Festival_Pavilion not found");
  }

  // tutaj automatycznie dodamy kolejne moduły FE-XX

  return modules;
}
`
);

// 6. styles.css
writeFileForce(
  path.join(CITY_FOLDER, "styles.css"),
  `.city-layout {
  display: flex;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

.city-menu {
  width: 240px;
  border-right: 1px solid #ccc;
  padding: 16px;
}

.city-content {
  flex: 1;
  padding: 24px;
}
`
);

// 7. module.config.json
writeFileForce(
  path.join(CITY_FOLDER, "module.config.json"),
  `{
  "id": "FE-00",
  "name": "City Frontend",
  "version": "1.0.0",
  "description": "Główny frontend miasta CITYOF-GATE"
}
`
);

// 8. README
writeFileForce(
  path.join(CITY_FOLDER, "README_FE-00__City.md"),
  `# FE-00__City

Główny frontend miasta CITYOF-GATE.

## Funkcje
- automatyczne ładowanie modułów FE-XX z \`apps/\`
- routing
- menu
- layout
- integracja modułów

## Struktura
- CityApp.jsx
- CityRouter.jsx
- CityMenu.jsx
- ModuleLoader.js
- index.js
`
);

console.log("🏙️ CITY FRONTEND GENERATOR v1 zakończony.");

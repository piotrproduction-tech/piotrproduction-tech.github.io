// tools/generateCityShell.js
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "apps/FE-12__CityOfGate_12.x/src/ui");

// =========================
//  PLIKI DO WYGENEROWANIA
// =========================

const FILES = {
  "CityShell.jsx": `
import React from "react";
import CityMenu from "./CityMenu.jsx";
import CityRouter from "./CityRouter.jsx";
import CityStatusBar from "./CityStatusBar.jsx";
import CityMapPanel from "./CityMapPanel.jsx";
import { useHeartbeat } from "./CityHeartbeat.js";
import { useCityEngine } from "./CityEngineBridge.js";

export default function CityShell() {
  const heartbeat = useHeartbeat();
  const engine = useCityEngine();

  return (
    <div className="city-shell">
      <CityStatusBar heartbeat={heartbeat} />
      <div className="city-layout">
        <CityMenu engine={engine} />
        <div className="city-content">
          <CityRouter engine={engine} />
        </div>
        <CityMapPanel engine={engine} />
      </div>
    </div>
  );
}
`,

  "CityMenu.jsx": `
import React from "react";
import { Link } from "react-router-dom";

const DISTRICTS = [
  { id: "marketplace", name: "Marketplace District" },
  { id: "creator", name: "Creator District" },
  { id: "street", name: "Marketplace Street" }
];

export default function CityMenu() {
  return (
    <nav className="city-menu">
      <h2>City Menu</h2>
      <ul>
        {DISTRICTS.map((d) => (
          <li key={d.id}>
            <Link to={\`/district/\${d.id}\`}>{d.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
`,

  "CityRouter.jsx": `
import React from "react";
import { Routes, Route } from "react-router-dom";

export default function CityRouter() {
  return (
    <Routes>
      <Route path="/" element={<div>Welcome to City of Gate 12.x</div>} />
      <Route path="/district/:id" element={<DistrictLoader />} />
    </Routes>
  );
}

function DistrictLoader() {
  return <div>District loading… (dynamic loader will be added)</div>;
}
`,

  "CityStatusBar.jsx": `
import React from "react";

export default function CityStatusBar({ heartbeat }) {
  return (
    <div className="city-statusbar">
      <span>Heartbeat: {heartbeat}</span>
    </div>
  );
}
`,

  "CityMapPanel.jsx": `
import React from "react";

export default function CityMapPanel() {
  return (
    <div className="city-map-panel">
      <h3>City Map</h3>
      <div className="map-placeholder">[MAPA 12.x — placeholder]</div>
    </div>
  );
}
`,

  "CityHeartbeat.js": `
import { useEffect, useState } from "react";

export function useHeartbeat() {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBeat((b) => b + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return beat;
}
`,

  "CityEngineBridge.js": `
import { useEffect, useState } from "react";
import engineMock from "../engineMock.js";

export function useCityEngine() {
  const [engine, setEngine] = useState(null);

  useEffect(() => {
    setEngine(engineMock);
  }, []);

  return engine;
}
`,

  "index.js": `
export { default as CityShell } from "./CityShell.jsx";
export { default as CityMenu } from "./CityMenu.jsx";
export { default as CityRouter } from "./CityRouter.jsx";
export { default as CityStatusBar } from "./CityStatusBar.jsx";
export { default as CityMapPanel } from "./CityMapPanel.jsx";
`
};

// =========================
//  FUNKCJE GENERATORA
// =========================

function ensureDir() {
  if (!fs.existsSync(SRC)) {
    fs.mkdirSync(SRC, { recursive: true });
    console.log("📁 Utworzono folder:", SRC);
  } else {
    console.log("📁 Folder istnieje:", SRC);
  }
}

function writeFiles() {
  for (const [name, content] of Object.entries(FILES)) {
    const filePath = path.join(SRC, name);
    fs.writeFileSync(filePath, content.trimStart(), "utf8");
    console.log("🟩 Utworzono:", name);
  }
}

function patchMain() {
  const mainPath = path.join(ROOT, "apps/FE-12__CityOfGate_12.x/src/main.jsx");

  if (!fs.existsSync(mainPath)) {
    console.log("⚠️ main.jsx nie istnieje — pomijam patchowanie.");
    return;
  }

  let content = `
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CityShell from "./ui/CityShell.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CityShell />
    </BrowserRouter>
  </React.StrictMode>
);
`;

  fs.writeFileSync(mainPath, content.trimStart(), "utf8");
  console.log("🔧 main.jsx został podmieniony na wersję z CityShell.");
}

// =========================
//  START GENERATORA
// =========================

function run() {
  console.log("🏙  GENERATOR CITY SHELL 12.x — START\n");
  ensureDir();
  writeFiles();
  patchMain();
  console.log("\n✅ GENERATOR ZAKOŃCZONY — CityShell gotowy.");
}

run();

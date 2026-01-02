const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APPS = path.join(ROOT, "apps");
const BACKEND = path.join(ROOT, "backend");

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

function parseModuleName(raw) {
  // np. "FE-02__Marketplace"
  const [idPart, namePart] = raw.split("__");
  if (!idPart || !namePart) {
    throw new Error(
      `Nieprawidłowa nazwa modułu: ${raw}. Użyj formatu FE-XX__Name`
    );
  }
  const id = idPart; // FE-02
  const rawName = namePart; // Marketplace
  const humanName = rawName.replace(/_/g, " ");
  const slug = rawName.toLowerCase(); // marketplace

  return { id, rawName, humanName, slug };
}

function createFrontendModule(rawModuleName) {
  const { id, rawName, humanName, slug } = parseModuleName(rawModuleName);

  const feDir = path.join(APPS, rawModuleName);

  console.log(`\n🎨 Tworzę FE moduł: ${rawModuleName}`);

  // Warstwy FE (kanoniczne)
  const feLayers = [
    "MODULES",
    "PANELS",
    "FORMS",
    "AI",
    "ADMIN",
    "JURY",
    "WORKFLOW",
    "DATA",
    "RELATIONS",
    "ANALYTICS"
  ];

  feLayers.forEach((layer) => {
    ensureDir(path.join(feDir, layer));
  });

  // module.config.json
  writeFileForce(
    path.join(feDir, "module.config.json"),
    `{
  "id": "${id}",
  "name": "${humanName}",
  "baseRoute": "/${slug}",
  "description": "Moduł ${humanName} w CITYOF-GATE"
}
`
  );

  // api.js – kontrakt do wypełnienia per moduł
  writeFileForce(
    path.join(feDir, "api.js"),
    `// Kontrakt API modułu ${humanName}
// Uzupełnij konkretną logiką BE dla tego modułu.

export async function getItems() {
  // TODO: implementacja
  return [];
}

export async function getItemById(id) {
  // TODO: implementacja
  return null;
}

export async function createItem(payload) {
  // TODO: implementacja
  return { success: true, id: String(Date.now()) };
}
`
  );

  // index.js – router modułu (szkielet)
  writeFileForce(
    path.join(feDir, "index.js"),
    `import React from "react";

// Importy paneli – do uzupełnienia per moduł
// import MainPanel from "./PANELS/MainPanel.jsx";
// import DetailsPanel from "./PANELS/DetailsPanel.jsx";
// import FormPanel from "./FORMS/FormPanel.jsx";
// import AdminPanel from "./ADMIN/AdminPanel.jsx";
// import AIPanel from "./AI/AIPanel.jsx";
// import JuryPanel from "./JURY/JuryPanel.jsx";

export const ${id.replace(/-/g, "_")}_Module = {
  config: {
    id: "${id}",
    name: "${humanName}",
    baseRoute: "/${slug}"
  },

  router: (route) => {
    // Przykładowy szkic routingu – dostosuj per moduł
    if (route === "/${slug}") {
      return <div>${humanName} – główny panel (do uzupełnienia)</div>;
    }

    if (route === "/${slug}/new") {
      return <div>${humanName} – formularz (do uzupełnienia)</div>;
    }

    if (route.startsWith("/${slug}/item/")) {
      const id = route.split("/").pop();
      return (
        <div>
          ${humanName} – szczegóły elementu {id} (do uzupełnienia)
        </div>
      );
    }

    if (route === "/${slug}/admin") {
      return <div>${humanName} – panel admina (do uzupełnienia)</div>;
    }

    if (route === "/${slug}/ai") {
      return <div>${humanName} – panel AI (do uzupełnienia)</div>;
    }

    if (route === "/${slug}/jury") {
      return <div>${humanName} – panel jury (do uzupełnienia)</div>;
    }

    return (
      <div>
        <h2>${humanName}</h2>
        <p>Nie znaleziono strony modułu dla ścieżki: {route}</p>
      </div>
    );
  }
};
`
  );

  // Proste README w DATA jako przypomnienie warstw
  writeFileForce(
    path.join(feDir, "DATA", "README_DATA.md"),
    `# DATA – warstwa danych modułu ${humanName}

Tu możesz trzymać mocki danych, pliki JSON, konfiguracje,
z których korzystają panele i workflow tego modułu.
`
  );

  console.log(`🎨 FE moduł ${rawModuleName} – struktura warstw gotowa.`);
}

function createBackendModule(rawModuleName) {
  const { id, rawName, humanName, slug } = parseModuleName(rawModuleName);

  const beId = id.replace("FE-", "BE-"); // FE-02 → BE-02
  const beDirName = `${beId}__${rawName}_Engine`;
  const beDir = path.join(BACKEND, beDirName);

  console.log(`\n🛠️  Tworzę BE moduł: ${beDirName}`);

  // Warstwy BE (kanoniczne)
  const beLayers = [
    "api",
    "data",
    "workflow",
    "config",
    "security",
    "relations",
    "analytics"
  ];

  beLayers.forEach((layer) => {
    ensureDir(path.join(beDir, layer));
  });

  // index.js – router modułu (szkielet)
  writeFileForce(
    path.join(beDir, "index.js"),
    `import express from "express";

// Importy endpointów – do uzupełnienia per moduł
// import { getItems } from "./api/getItems.js";
// import { getItemById } from "./api/getItemById.js";
// import { createItem } from "./api/createItem.js";

export const ${beId.replace(/-/g, "_")}_Engine = express.Router();

// Przykładowy szkic endpointów – dostosuj per moduł
// ${beId.replace(/-/g, "_")}_Engine.get("/getItems", getItems);
// ${beId.replace(/-/g, "_")}_Engine.get("/getItemById/:id", getItemById);
// ${beId.replace(/-/g, "_")}_Engine.post("/createItem", createItem);
`
  );

  // config – puste szablony
  writeFileForce(
    path.join(beDir, "config", "functions.json"),
    `{
  // "functionName": true
}
`
  );

  writeFileForce(
    path.join(beDir, "config", "roles.json"),
    `{
  // "roleName": ["functionName1", "functionName2"]
}
`
  );

  writeFileForce(
    path.join(beDir, "config", "levels.json"),
    `{
  // "levelName": ["roleName1", "roleName2"]
}
`
  );

  writeFileForce(
    path.join(beDir, "config", "certificates.json"),
    `{
  // "certificateName": true
}
`
  );

  // data – placeholder
  writeFileForce(
    path.join(beDir, "data", "README_DATA.md"),
    `# DATA – warstwa danych modułu ${humanName}

Tu możesz trzymać dane modułu (JSON, cache, snapshoty),
z których korzystają endpointy API i workflow.
`
  );

  // workflow – placeholder
  writeFileForce(
    path.join(beDir, "workflow", "README_WORKFLOW.md"),
    `# WORKFLOW – przepływy modułu ${humanName}

Tu możesz opisać lub zaimplementować przepływy biznesowe:
- stany,
- przejścia,
- akcje automatyczne,
- powiązania z rolami i poziomami.
`
  );

  // security – placeholder
  writeFileForce(
    path.join(beDir, "security", "README_SECURITY.md"),
    `# SECURITY – bezpieczeństwo modułu ${humanName}

Tu możesz trzymać:
- reguły dostępu,
- mapowanie ról na endpointy,
- dodatkowe zasady ochrony modułu.
`
  );

  // relations – placeholder
  writeFileForce(
    path.join(beDir, "relations", "README_RELATIONS.md"),
    `# RELATIONS – relacje modułu ${humanName}

Tu możesz opisać lub skonfigurować relacje:
- z innymi modułami,
- z obiektami globalnymi,
- z zewnętrznymi systemami.
`
  );

  // analytics – placeholder
  writeFileForce(
    path.join(beDir, "analytics", "README_ANALYTICS.md"),
    `# ANALYTICS – analityka modułu ${humanName}

Tu możesz trzymać:
- definicje metryk,
- raporty,
- konfiguracje dashboardów analitycznych.
`
  );

  console.log(`🛠️  BE moduł ${beDirName} – struktura warstw gotowa.`);
}

// ENTRY POINT
const rawModuleName = process.argv[2];

if (!rawModuleName) {
  console.log("❌ Podaj nazwę modułu, np.:");
  console.log("   node modules/gate_module_generator.js FE-02__Marketplace");
  process.exit(1);
}

try {
  console.log("🏙️  MODULE GENERATOR (FE/BE + WARSTWY) START...");
  createFrontendModule(rawModuleName);
  createBackendModule(rawModuleName);
  console.log("\n🎉 MODULE GENERATOR zakończony sukcesem.");
} catch (err) {
  console.error("❌ Błąd generatora:", err.message);
  process.exit(1);
}

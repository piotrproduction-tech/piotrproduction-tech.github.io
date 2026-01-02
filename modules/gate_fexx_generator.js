const fs = require("fs");
const path = require("path");

// ROOT = katalog główny repo
const ROOT = process.cwd();
const APPS = path.join(ROOT, "apps");

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

function createModule(moduleName) {
  const moduleFolder = path.join(APPS, moduleName);

  console.log(`\n🎬 GENERATOR FE‑XX start: ${moduleName}`);

  // 1. module.config.json
  writeFileForce(
    path.join(moduleFolder, "module.config.json"),
    `{
  "id": "${moduleName.split("__")[0]}",
  "name": "${moduleName.split("__")[1].replace(/_/g, " ")}",
  "baseRoute": "/${moduleName.split("__")[1].toLowerCase()}",
  "description": "Moduł ${moduleName}"
}
`
  );

  // 2. api.js (mock backend)
  writeFileForce(
    path.join(moduleFolder, "api.js"),
    `export async function getItems() {
  return [
    { id: "1", name: "Element 1", status: "active" },
    { id: "2", name: "Element 2", status: "inactive" }
  ];
}

export async function getItemById(id) {
  return {
    id,
    name: "Element " + id,
    status: "active",
    description: "Opis elementu " + id
  };
}

export async function createItem(payload) {
  console.log("createItem (mock)", payload);
  return { success: true, id: String(Date.now()) };
}
`
  );

  // 3. index.js — moduł React zgodny z FE‑00__City
  const baseRoute = "/" + moduleName.split("__")[1].toLowerCase();

  writeFileForce(
    path.join(moduleFolder, "index.js"),
    `import React from "react";
import MainPanel from "./panels/MainPanel.jsx";
import DetailsPanel from "./panels/DetailsPanel.jsx";
import FormPanel from "./FORMS/FormPanel.jsx";
import AdminPanel from "./ADMIN/AdminPanel.jsx";
import AIPanel from "./AI/AIPanel.jsx";
import JuryPanel from "./JURY/JuryPanel.jsx";

export const ${moduleName.replace(/-/g, "_")}Module = {
  config: {
    id: "${moduleName.split("__")[0]}",
    name: "${moduleName.split("__")[1].replace(/_/g, " ")}",
    baseRoute: "${baseRoute}"
  },

  router: (route) => {
    if (route === "${baseRoute}") return <MainPanel />;
    if (route === "${baseRoute}/new") return <FormPanel />;

    if (route.startsWith("${baseRoute}/item/")) {
      const id = route.split("/").pop();
      return <DetailsPanel itemId={id} />;
    }

    if (route === "${baseRoute}/admin") return <AdminPanel />;
    if (route === "${baseRoute}/ai") return <AIPanel />;
    if (route === "${baseRoute}/jury") return <JuryPanel />;

    return (
      <div>
        <h2>${moduleName}</h2>
        <p>Nie znaleziono strony modułu dla ścieżki: {route}</p>
      </div>
    );
  },

  panels: {
    MainPanel,
    DetailsPanel,
    FormPanel,
    AdminPanel,
    AIPanel,
    JuryPanel
  }
};
`
  );

  // 4. Panele React
  writeFileForce(
    path.join(moduleFolder, "panels", "MainPanel.jsx"),
    `import React, { useEffect, useState } from "react";
import { getItems } from "../api.js";

export default function MainPanel() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getItems();
      setItems(data);
    })();
  }, []);

  return (
    <div>
      <h2>Lista elementów</h2>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            {i.name} — {i.status}{" "}
            <a href={"${baseRoute}/item/" + i.id}>Szczegóły</a>
          </li>
        ))}
      </ul>
      <a href="${baseRoute}/new">Dodaj nowy</a>
    </div>
  );
}
`
  );

  writeFileForce(
    path.join(moduleFolder, "panels", "DetailsPanel.jsx"),
    `import React, { useEffect, useState } from "react";
import { getItemById } from "../api.js";

export default function DetailsPanel({ itemId }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getItemById(itemId);
      setItem(data);
    })();
  }, [itemId]);

  if (!item) return <div>Ładowanie...</div>;

  return (
    <div>
      <h2>Szczegóły elementu</h2>
      <p><strong>Nazwa:</strong> {item.name}</p>
      <p><strong>Status:</strong> {item.status}</p>
      <p><strong>Opis:</strong> {item.description}</p>
      <a href="${baseRoute}">← Powrót</a>
    </div>
  );
}
`
  );

  // 5. Formularz
  writeFileForce(
    path.join(moduleFolder, "FORMS", "FormPanel.jsx"),
    `import React, { useState } from "react";
import { createItem } from "../api.js";

export default function FormPanel() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await createItem({ name });
    setMessage("Zapisano (mock). ID: " + result.id);
  }

  return (
    <div>
      <h2>Nowy element</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nazwa"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Zapisz</button>
      </form>
      {message && <p>{message}</p>}
      <a href="${baseRoute}">← Powrót</a>
    </div>
  );
}
`
  );

  // 6. Admin
  writeFileForce(
    path.join(moduleFolder, "ADMIN", "AdminPanel.jsx"),
    `import React from "react";

export default function AdminPanel() {
  return (
    <div>
      <h2>Panel administracyjny</h2>
      <p>Tu pojawią się funkcje administracyjne modułu.</p>
    </div>
  );
}
`
  );

  // 7. AI
  writeFileForce(
    path.join(moduleFolder, "AI", "AIPanel.jsx"),
    `import React from "react";

export default function AIPanel() {
  return (
    <div>
      <h2>Panel AI</h2>
      <p>Tu pojawią się funkcje AI modułu.</p>
    </div>
  );
}
`
  );

  // 8. Jury
  writeFileForce(
    path.join(moduleFolder, "JURY", "JuryPanel.jsx"),
    `import React from "react";

export default function JuryPanel() {
  return (
    <div>
      <h2>Panel Jury</h2>
      <p>Tu pojawią się funkcje jury modułu.</p>
    </div>
  );
}
`
  );

  console.log(`🎉 GENERATOR FE‑XX zakończony: ${moduleName}\n`);
}

// ENTRY POINT
const moduleName = process.argv[2];

if (!moduleName) {
  console.log("❌ Podaj nazwę modułu, np.:");
  console.log("   node modules/gate_fexx_generator.js FE-02__Marketplace");
  process.exit(1);
}

createModule(moduleName);

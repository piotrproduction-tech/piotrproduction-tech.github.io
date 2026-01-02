/**
 * DUŻY KROK — Odtworzenie API i workflow dla FE-02 / BE-02 (Marketplace)
 *
 * Co robi:
 * - zakłada istnienie:
 *    - apps/FE-02__Marketplace
 *    - backend/BE-02__Marketplace_Engine
 * - dokłada:
 *    - API endpointy w BE-02/api/
 *    - plik workflow w BE-02/workflow/
 *    - prosty panel listy ofert w FE-02 (PANELS)
 *    - prostyczny hook API w FE-02 (DATA)
 *
 * NICZEGO nie usuwa, nie nadpisuje istniejących plików.
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APPS = path.join(ROOT, "apps");
const BACKEND = path.join(ROOT, "backend");

const FE02 = path.join(APPS, "FE-02__Marketplace");
const BE02 = path.join(BACKEND, "BE-02__Marketplace_Engine");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeFileIfMissing(filePath, content) {
  if (!fs.existsSync(filePath)) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, content);
    console.log(`📄 Utworzono: ${path.relative(ROOT, filePath)}`);
  } else {
    console.log(`⏭  Pomijam (istnieje): ${path.relative(ROOT, filePath)}`);
  }
}

console.log("🏙️  DUŻY KROK — Marketplace API + workflow START...");

// Walidacja
if (!fs.existsSync(FE02)) {
  console.error("❌ Brak modułu FE-02__Marketplace w apps/");
  process.exit(1);
}
if (!fs.existsSync(BE02)) {
  console.error("❌ Brak modułu BE-02__Marketplace_Engine w backend/");
  process.exit(1);
}

// ----------------------
// BACKEND — API
// ----------------------

const beApiDir = path.join(BE02, "api");
ensureDir(beApiDir);

const beApiFile = path.join(beApiDir, "marketplaceApi.js");
writeFileIfMissing(
  beApiFile,
  `// API Marketplace — BE-02__Marketplace_Engine
// Prosty kontrakt: lista ofert, szczegóły, tworzenie.

import express from "express";

export const marketplaceRouter = express.Router();

// In-memory mock — do zastąpienia storage'em
let ITEMS = [
  {
    id: "1",
    title: "Przykładowa oferta 1",
    description: "To jest przykładowa oferta w Marketplace.",
    price: 100,
    ownerId: "user-1",
    status: "active"
  }
];

marketplaceRouter.get("/items", (req, res) => {
  res.json(ITEMS);
});

marketplaceRouter.get("/items/:id", (req, res) => {
  const item = ITEMS.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

marketplaceRouter.post("/items", (req, res) => {
  const { title, description, price, ownerId } = req.body || {};
  const id = String(Date.now());
  const item = {
    id,
    title,
    description,
    price,
    ownerId: ownerId || "unknown",
    status: "active"
  };
  ITEMS.push(item);
  res.json({ success: true, item });
});
`
);

// ----------------------
// BACKEND — WORKFLOW
// ----------------------

const beWorkflowDir = path.join(BE02, "workflow");
ensureDir(beWorkflowDir);

const beWorkflowFile = path.join(beWorkflowDir, "marketplaceWorkflow.json");
writeFileIfMissing(
  beWorkflowFile,
  `{
  "entity": "marketplaceItem",
  "states": [
    "draft",
    "active",
    "paused",
    "archived"
  ],
  "transitions": {
    "draft": ["active"],
    "active": ["paused", "archived"],
    "paused": ["active", "archived"],
    "archived": []
  },
  "defaultState": "draft"
}
`
);

// ----------------------
// FRONTEND — API hook + panel
// ----------------------

const feDataDir = path.join(FE02, "DATA");
const fePanelsDir = path.join(FE02, "PANELS");
ensureDir(feDataDir);
ensureDir(fePanelsDir);

const feApiFile = path.join(feDataDir, "useMarketplaceApi.js");
writeFileIfMissing(
  feApiFile,
  `// Hook API dla Marketplace (FE-02)
// Zakłada, że backend wystawia /api/marketplace/...

import { useEffect, useState } from "react";

const BASE_URL = "/api/marketplace";

export function useMarketplaceItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`\${BASE_URL}/items\`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data || []);
        setLoading(false);
      })
      .catch(() => {
        setItems([]);
        setLoading(false);
      });
  }, []);

  return { items, loading };
}
`
);

const fePanelFile = path.join(fePanelsDir, "MarketplaceListPanel.js");
writeFileIfMissing(
  fePanelFile,
  `// Panel listy ofert Marketplace (FE-02)

import React from "react";
import { useMarketplaceItems } from "../DATA/useMarketplaceApi";

export function MarketplaceListPanel() {
  const { items, loading } = useMarketplaceItems();

  if (loading) return <div>Ładowanie ofert...</div>;

  if (!items.length) return <div>Brak ofert w Marketplace.</div>;

  return (
    <div>
      <h2>Marketplace — oferty</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "8px" }}>
            <strong>{item.title}</strong> — {item.description} — {item.price} GATE
          </li>
        ))}
      </ul>
    </div>
  );
}
`
);

// ----------------------
// FRONTEND — podpięcie panelu do index.js (jeśli jest prosty szkielet)
// ----------------------

const feIndexPath = path.join(FE02, "index.js");
if (fs.existsSync(feIndexPath)) {
  const indexContent = fs.readFileSync(feIndexPath, "utf8");
  if (!indexContent.includes("MarketplaceListPanel")) {
    const patched = indexContent.replace(
      /export const .*?_Module = \{/,
      `import { MarketplaceListPanel } from "./PANELS/MarketplaceListPanel";

$&
`
    );
    fs.writeFileSync(feIndexPath, patched);
    console.log(`🔗 Podpięto MarketplaceListPanel do ${path.relative(ROOT, feIndexPath)}`);
  } else {
    console.log("⏭  index.js FE-02 już zawiera MarketplaceListPanel — pomijam patchowanie.");
  }
} else {
  console.log("⚠️  Brak index.js w FE-02__Marketplace — nie podpinam panelu automatycznie.");
}

console.log("\n🎉 DUŻY KROK — Marketplace API + workflow ZAKOŃCZONE.");

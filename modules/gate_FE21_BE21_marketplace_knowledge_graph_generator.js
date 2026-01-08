/**
 * CITYOF-GATE :: Marketplace 5.0 — Knowledge Graph Generator (ESM)
 * FE21 / BE21 — Nowa Generacja
 *
 * Tworzy:
 *  - knowledge/marketplace/knowledgeGraphEngine.js
 *  - knowledge/marketplace/knowledgeGraphSchema.js
 *
 * Niczego nie nadpisuje.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

const FILES = [
  {
    path: "knowledge/marketplace/knowledgeGraphEngine.js",
    content: `/**
 * Marketplace Knowledge Graph Engine 5.0
 * Powiązania semantyczne Marketplace
 */

export const MarketplaceKnowledgeGraphEngine = {
  linkCreators(a, b) {
    return { linked: true, type: "creatorCreator" };
  },

  linkItems(a, b) {
    return { linked: true, type: "itemItem" };
  },

  linkCreatorToItem(creator, item) {
    return { linked: true, type: "creatorItem" };
  },

  linkShopToZone(shop, zone) {
    return { linked: true, type: "shopZone" };
  },

  linkEventToZone(event, zone) {
    return { linked: true, type: "eventZone" };
  },

  linkTagToItem(tag, item) {
    return { linked: true, type: "tagItem" };
  },

  buildGraph(data) {
    return { nodes: [], edges: [] };
  }
};`
  },

  {
    path: "knowledge/marketplace/knowledgeGraphSchema.js",
    content: `/**
 * Marketplace Knowledge Graph Schema 5.0
 */

export const MarketplaceKnowledgeGraphSchema = {
  nodeTypes: [
    "creator",
    "item",
    "shop",
    "event",
    "zone",
    "tag",
    "category"
  ],

  edgeTypes: [
    "creatorCreator",
    "itemItem",
    "creatorItem",
    "shopZone",
    "eventZone",
    "tagItem"
  ]
};`
  }
];

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log("📁 Utworzono:", dir);
  }
}

function writeFile(file) {
  const full = path.join(ROOT, file.path);

  if (fs.existsSync(full)) {
    console.log("⏭ Istnieje:", file.path);
    return;
  }

  ensureDir(full);
  fs.writeFileSync(full, file.content);
  console.log("📄 Utworzono:", file.path);
}

export function run() {
  console.log("🧠 Marketplace Knowledge Graph Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Knowledge Graph Generator — DONE");
}

run();

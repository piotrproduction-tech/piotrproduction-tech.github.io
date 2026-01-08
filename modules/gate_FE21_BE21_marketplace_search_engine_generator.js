/**
 * CITYOF-GATE :: Marketplace 5.0 — Search Engine Generator (ESM)
 * FE21 / BE21 — Nowa Generacja
 *
 * Tworzy:
 *  - search/marketplace/searchEngine.js
 *  - search/marketplace/searchConfig.js
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
    path: "search/marketplace/searchEngine.js",
    content: `/**
 * Marketplace Search Engine 5.0
 * Keyword + Semantic Search
 */

export const MarketplaceSearchEngine = {
  keywordSearch(query, items) {
    return items.filter(i => i.title?.toLowerCase().includes(query.toLowerCase()));
  },

  tagSearch(tag, items) {
    return items.filter(i => i.tags?.includes(tag));
  },

  creatorSearch(creatorId, items) {
    return items.filter(i => i.creatorId === creatorId);
  },

  semanticSearch(query, graph) {
    return { results: [], query };
  },

  combinedSearch(query, data) {
    return {
      keyword: this.keywordSearch(query, data.items),
      semantic: this.semanticSearch(query, data.graph)
    };
  }
};`
  },

  {
    path: "search/marketplace/searchConfig.js",
    content: `/**
 * Marketplace Search Config 5.0
 */

export const MarketplaceSearchConfig = {
  enableSemantic: true,
  keywordWeight: 0.6,
  semanticWeight: 0.4,
  maxResults: 50
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
  console.log("🔍 Marketplace Search Engine Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Search Engine Generator — DONE");
}

run();

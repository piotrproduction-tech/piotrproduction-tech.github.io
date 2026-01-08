/**
 * CITYOF-GATE :: Marketplace 5.0 — Multi-Instance Router Generator (ESM)
 * FE21 / BE21 — Warstwa 8
 *
 * Tworzy:
 *  - router/marketplace/multiInstanceRouter.js
 *  - router/marketplace/routerConfig.js
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
    path: "router/marketplace/multiInstanceRouter.js",
    content: `/**
 * Marketplace Multi-Instance Router 5.0
 */

export const MarketplaceMultiInstanceRouter = {
  instances: {},

  registerInstance(id, ref) {
    this.instances[id] = ref;
    return { registered: true, id };
  },

  route(instanceId, action, payload) {
    const inst = this.instances[instanceId];
    if (!inst) return { error: "Instance not found" };
    if (typeof inst[action] !== "function") return { error: "Action not found" };
    return inst[action](payload);
  }
};`
  },

  {
    path: "router/marketplace/routerConfig.js",
    content: `/**
 * Marketplace Router Config 5.0
 */

export const MarketplaceRouterConfig = {
  enableRouting: true,
  fallbackInstance: "main"
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
  console.log("🚦 Marketplace Multi-Instance Router Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Multi-Instance Router Generator — DONE");
}

run();

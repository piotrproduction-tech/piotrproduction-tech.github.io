/**
 * CITYOF-GATE :: Marketplace 5.0 — Sync Scheduler Generator (ESM)
 * FE21 / BE21 — Warstwa 7 — Meta-World Systems
 *
 * Tworzy:
 *  - scheduler/marketplace/syncScheduler.js
 *  - scheduler/marketplace/schedulerConfig.js
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
    path: "scheduler/marketplace/syncScheduler.js",
    content: `/**
 * Marketplace Sync Scheduler 5.0
 * Harmonogram świata Marketplace:
 *  - ticki czasu
 *  - aktualizacje pogody
 *  - aktualizacje sezonów
 *  - aktualizacje ekonomii
 *  - aktualizacje społeczności
 *  - integracja z HyperOrchestrator
 */

export const MarketplaceSyncScheduler = {
  tasks: [],

  registerTask(name, intervalMs, callback) {
    this.tasks.push({ name, intervalMs, callback, lastRun: 0 });
    return { registered: true, name };
  },

  runTick(state) {
    const now = Date.now();

    const updatedTasks = this.tasks.map(task => {
      if (now - task.lastRun >= task.intervalMs) {
        task.callback(state);
        return { ...task, lastRun: now };
      }
      return task;
    });

    this.tasks = updatedTasks;
    return { tick: true, timestamp: now };
  }
};`
  },

  {
    path: "scheduler/marketplace/schedulerConfig.js",
    content: `/**
 * Marketplace Scheduler Config 5.0
 */

export const MarketplaceSchedulerConfig = {
  worldTickMs: 1000,
  weatherTickMs: 5000,
  seasonTickMs: 15000,
  economyTickMs: 3000,
  communityTickMs: 2000
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
  console.log("⏳ Marketplace Sync Scheduler Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Sync Scheduler Generator — DONE");
}

run();

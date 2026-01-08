/**
 * CITYOF-GATE :: Marketplace 5.0 — Notification Engine Generator (ESM)
 * FE21 / BE21 — Nowa Generacja
 *
 * Tworzy:
 *  - notifications/marketplace/notificationEngine.js
 *  - notifications/marketplace/notificationTemplates.js
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
    path: "notifications/marketplace/notificationEngine.js",
    content: `/**
 * Marketplace Notification Engine 5.0
 */

export const MarketplaceNotificationEngine = {
  sendPush(userId, payload) {
    return { sent: true, userId, payload };
  },

  sendInApp(userId, payload) {
    return { sent: true, userId, payload };
  },

  notifyDrop(userId, drop) {
    return { sent: true, type: "drop", drop };
  },

  notifyFlashSale(userId, sale) {
    return { sent: true, type: "flashSale", sale };
  },

  notifyEvent(userId, event) {
    return { sent: true, type: "event", event };
  },

  notifyProgression(userId, progression) {
    return { sent: true, type: "progression", progression };
  }
};`
  },

  {
    path: "notifications/marketplace/notificationTemplates.js",
    content: `/**
 * Marketplace Notification Templates 5.0
 */

export const MarketplaceNotificationTemplates = {
  drop: (item) => \`Nowy drop: \${item.title}\`,
  flashSale: (item) => \`Flash Sale: \${item.title}\`,
  event: (event) => \`Nowe wydarzenie: \${event.type}\`,
  progression: (level) => \`Awansowałeś na poziom \${level}\`
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
  console.log("🔔 Marketplace Notification Engine Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Notification Engine Generator — DONE");
}

run();

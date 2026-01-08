/**
 * CITYOF-GATE :: Marketplace 5.0 — Achievement System Generator (ESM)
 * FE21 / BE21 — Nowa Generacja
 *
 * Tworzy:
 *  - achievements/marketplace/achievementEngine.js
 *  - achievements/marketplace/achievementDefinitions.js
 *  - achievements/marketplace/missionDefinitions.js
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
    path: "achievements/marketplace/achievementEngine.js",
    content: `/**
 * Marketplace Achievement Engine 5.0
 */

export const MarketplaceAchievementEngine = {
  awardAchievement(userId, achievementId) {
    return { awarded: true, userId, achievementId };
  },

  completeMission(userId, missionId) {
    return { completed: true, userId, missionId };
  },

  calculateLevel(userStats) {
    return { level: Math.floor((userStats.points || 0) / 100) };
  },

  getRewards(level) {
    return { rewards: ["badge", "token"] };
  }
};`
  },

  {
    path: "achievements/marketplace/achievementDefinitions.js",
    content: `/**
 * Marketplace Achievement Definitions 5.0
 */

export const MarketplaceAchievementDefinitions = {
  firstPurchase: {
    id: "firstPurchase",
    title: "Pierwszy zakup",
    points: 50
  },

  firstSale: {
    id: "firstSale",
    title: "Pierwsza sprzedaż",
    points: 100
  },

  creatorLevel5: {
    id: "creatorLevel5",
    title: "Twórca Poziom 5",
    points: 500
  }
};`
  },

  {
    path: "achievements/marketplace/missionDefinitions.js",
    content: `/**
 * Marketplace Mission Definitions 5.0
 */

export const MarketplaceMissionDefinitions = {
  daily: [
    { id: "daily_buy", title: "Kup 1 przedmiot", reward: 20 },
    { id: "daily_like", title: "Polub 3 przedmioty", reward: 10 }
  ],

  weekly: [
    { id: "weekly_sell", title: "Sprzedaj 5 przedmiotów", reward: 100 },
    { id: "weekly_event", title: "Weź udział w 2 eventach", reward: 80 }
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
  console.log("🏆 Marketplace Achievement System Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Achievement System Generator — DONE");
}

run();

/**
 * CITYOF-GATE :: Marketplace 5.0 — Token Economy Generator (ESM)
 * FE21 / BE21 — Nowa Generacja
 *
 * Tworzy:
 *  - tokens/marketplace/tokenEngine.js
 *  - tokens/marketplace/tokenRewards.js
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
    path: "tokens/marketplace/tokenEngine.js",
    content: `/**
 * Marketplace Token Engine 5.0
 */

export const MarketplaceTokenEngine = {
  awardTokens(userId, amount) {
    return { awarded: true, userId, amount };
  },

  spendTokens(userId, amount) {
    return { spent: true, userId, amount };
  },

  convertReputationToTokens(reputation) {
    return Math.floor((reputation || 0) * 0.1);
  },

  rewardForAchievement(achievementId) {
    return 50;
  },

  rewardForMission(missionId) {
    return 20;
  }
};`
  },

  {
    path: "tokens/marketplace/tokenRewards.js",
    content: `/**
 * Marketplace Token Rewards 5.0
 */

export const MarketplaceTokenRewards = {
  cosmeticBadge: 100,
  premiumGlow: 250,
  shopBoost: 500,
  creatorBoost: 700,
  eventHighlight: 300
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
  console.log("🪙 Marketplace Token Economy Generator — START");
  FILES.forEach(writeFile);
  console.log("🏁 Marketplace Token Economy Generator — DONE");
}

run();

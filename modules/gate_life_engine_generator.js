/**
 * FAZA 4C — KROK 1
 * LIFE ENGINE GENERATOR
 *
 * Tworzy:
 * backend/BE-00__Life_Engine/
 *   index.js
 *   api/lifeApi.js
 *   core/eventRouter.js
 *   core/reactionEngine.js
 *   core/mapSignals.js
 *   core/notifications.js
 *   core/heartbeat.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BACKEND = path.join(ROOT, "backend");
const LIFE = path.join(BACKEND, "BE-00__Life_Engine");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeIfMissing(file, content) {
  ensureDir(path.dirname(file));
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, content);
    console.log("📄 Utworzono:", path.relative(ROOT, file));
  } else {
    console.log("⏭  Istnieje:", path.relative(ROOT, file));
  }
}

console.log("🏙️ FAZA 4C — KROK 1: LIFE ENGINE START...");

ensureDir(LIFE);

// index.js
writeIfMissing(
  path.join(LIFE, "index.js"),
  `import express from "express";
import { lifeRouter } from "./api/lifeApi.js";

export const LifeEngine = express.Router();
LifeEngine.use("/life", lifeRouter);
`
);

// api/lifeApi.js
writeIfMissing(
  path.join(LIFE, "api", "lifeApi.js"),
  `import express from "express";
import { routeEvent } from "../core/eventRouter.js";
import { getHeartbeat } from "../core/heartbeat.js";

export const lifeRouter = express.Router();

// odbiór zdarzeń z Event Bus
lifeRouter.post("/event", async (req, res) => {
  const { type, payload } = req.body;
  await routeEvent(type, payload);
  res.json({ success: true });
});

// heartbeat miasta
lifeRouter.get("/heartbeat", (req, res) => {
  res.json(getHeartbeat());
});
`
);

// core/eventRouter.js
writeIfMissing(
  path.join(LIFE, "core", "eventRouter.js"),
  `import { applyReactions } from "./reactionEngine.js";
import { sendMapSignal } from "./mapSignals.js";
import { sendNotification } from "./notifications.js";
import { logHeartbeat } from "./heartbeat.js";

export async function routeEvent(type, payload) {
  // 1. log
  logHeartbeat({ type, payload });

  // 2. animacje mapy
  sendMapSignal(type, payload);

  // 3. powiadomienia
  sendNotification(type, payload);

  // 4. reakcje systemowe (tokeny, reputacja, kary)
  await applyReactions(type, payload);
}
`
);

// core/reactionEngine.js
writeIfMissing(
  path.join(LIFE, "core", "reactionEngine.js"),
  `export async function applyReactions(type, payload) {
  const reactions = {
    "marketplace.item.created": { reward: "marketplace.create" },
    "festival.submission.accepted": { reward: "festival.submission.accepted" },
    "festival.submission.rejected": { reward: "festival.submission.rejected" },
    "abuse.detected": { reward: "user.spam" }
  };

  const r = reactions[type];
  if (!r) return;

  if (!payload || !payload.userId) return;

  await fetch("http://localhost:3000/api/rewards/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: payload.userId, action: r.reward })
  });
}
`
);

// core/mapSignals.js
writeIfMissing(
  path.join(LIFE, "core", "mapSignals.js"),
  `export function sendMapSignal(type, payload) {
  fetch("http://localhost:3000/api/city/map/signal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, payload })
  }).catch(() => {});
}
`
);

// core/notifications.js
writeIfMissing(
  path.join(LIFE, "core", "notifications.js"),
  `const MESSAGES = {
  "marketplace.item.created": "Nowa oferta na Marketplace Street",
  "festival.submission.accepted": "Zgłoszenie zaakceptowane w Festival District",
  "festival.submission.rejected": "Zgłoszenie odrzucone w Festival District",
  "creator.level.upgraded": "Twórca awansował na wyższy poziom"
};

export function sendNotification(type, payload) {
  const message = MESSAGES[type];
  if (!message) return;

  fetch("http://localhost:3000/api/city/notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, payload })
  }).catch(() => {});
}
`
);

// core/heartbeat.js
writeIfMissing(
  path.join(LIFE, "core", "heartbeat.js"),
  `let HEARTBEAT = [];

export function logHeartbeat(event) {
  HEARTBEAT.push({ ...event, ts: Date.now() });
  if (HEARTBEAT.length > 200) HEARTBEAT.shift();
}

export function getHeartbeat() {
  return HEARTBEAT;
}
`
);

console.log("🎉 FAZA 4C — KROK 1: LIFE ENGINE ZAKOŃCZONY.");

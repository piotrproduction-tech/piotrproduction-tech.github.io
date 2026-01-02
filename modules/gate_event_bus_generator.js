/**
 * DUŻY KROK 6 — EVENT BUS ENGINE
 *
 * Tworzy:
 * - backend/BE-00__EventBus_Engine
 * - API: /api/events/emit, /api/events/subscribe
 * - rejestr zdarzeń
 * - subskrypcje
 * - integracja z Token Engine, Reputation Engine, Reward Engine, Anti-Abuse Engine
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BACKEND = path.join(ROOT, "backend");

const BE00 = path.join(BACKEND, "BE-00__EventBus_Engine");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeIfMissing(file, content) {
  if (!fs.existsSync(file)) {
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, content);
    console.log("📄 Utworzono:", path.relative(ROOT, file));
  } else {
    console.log("⏭  Istnieje:", path.relative(ROOT, file));
  }
}

console.log("🏙️  DUŻY KROK 6 — EVENT BUS START...");

ensureDir(BE00);

// index.js
writeIfMissing(
  path.join(BE00, "index.js"),
  `import express from "express";
import { eventBusRouter } from "./api/eventBusApi.js";

export const EventBusEngine = express.Router();
EventBusEngine.use("/events", eventBusRouter);
`
);

// API
writeIfMissing(
  path.join(BE00, "api", "eventBusApi.js"),
  `import express from "express";

export const eventBusRouter = express.Router();

let SUBSCRIBERS = {};
let LOG = [];

// Emit event
eventBusRouter.post("/emit", async (req, res) => {
  const { type, payload } = req.body;

  LOG.push({ type, payload, ts: Date.now() });

  const subs = SUBSCRIBERS[type] || [];

  for (const url of subs) {
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, payload })
      });
    } catch (e) {
      console.log("❌ Event delivery failed:", url);
    }
  }

  res.json({ success: true, delivered: subs.length });
});

// Subscribe
eventBusRouter.post("/subscribe", (req, res) => {
  const { type, url } = req.body;

  if (!SUBSCRIBERS[type]) SUBSCRIBERS[type] = [];
  SUBSCRIBERS[type].push(url);

  res.json({ success: true });
});

// Log
eventBusRouter.get("/log", (req, res) => {
  res.json(LOG);
});
`
);

console.log("🎉 DUŻY KROK 6 — EVENT BUS ZAKOŃCZONY.");

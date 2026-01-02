/**
 * FAZA 4C — KROK 3
 * CITY FRONTEND API GENERATOR
 *
 * Tworzy:
 * backend/BE-00__City_Frontend_API/
 *   index.js
 *   api/cityFrontendApi.js
 *
 * Endpointy:
 *   POST /api/city/notify
 *   POST /api/city/map/signal
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BACKEND = path.join(ROOT, "backend");
const CITYAPI = path.join(BACKEND, "BE-00__City_Frontend_API");

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

console.log("🏙️ FAZA 4C — KROK 3: CITY FRONTEND API START...");

ensureDir(CITYAPI);

// index.js
writeIfMissing(
  path.join(CITYAPI, "index.js"),
  `import express from "express";
import { cityFrontendRouter } from "./api/cityFrontendApi.js";

export const CityFrontendAPI = express.Router();
CityFrontendAPI.use("/city", cityFrontendRouter);
`
);

// api/cityFrontendApi.js
writeIfMissing(
  path.join(CITYAPI, "api", "cityFrontendApi.js"),
  `import express from "express";

export const cityFrontendRouter = express.Router();

let NOTIFICATION_LISTENERS = [];
let MAP_SIGNAL_LISTENERS = [];

// FE-00 rejestruje listener powiadomień
cityFrontendRouter.get("/notify/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  NOTIFICATION_LISTENERS.push(res);

  req.on("close", () => {
    NOTIFICATION_LISTENERS = NOTIFICATION_LISTENERS.filter((r) => r !== res);
  });
});

// FE-00 rejestruje listener sygnałów mapy
cityFrontendRouter.get("/map/signal/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  MAP_SIGNAL_LISTENERS.push(res);

  req.on("close", () => {
    MAP_SIGNAL_LISTENERS = MAP_SIGNAL_LISTENERS.filter((r) => r !== res);
  });
});

// Life Engine wysyła powiadomienie
cityFrontendRouter.post("/notify", (req, res) => {
  const { message, payload } = req.body;

  const data = JSON.stringify({ message, payload });

  NOTIFICATION_LISTENERS.forEach((client) => {
    client.write(\`data: \${data}\\n\\n\`);
  });

  res.json({ success: true });
});

// Life Engine wysyła sygnał glow kafla
cityFrontendRouter.post("/map/signal", (req, res) => {
  const { type, payload } = req.body;

  const data = JSON.stringify({
    tileId: payload?.tileId || null,
    type,
    payload
  });

  MAP_SIGNAL_LISTENERS.forEach((client) => {
    client.write(\`data: \${data}\\n\\n\`);
  });

  res.json({ success: true });
});
`
);

console.log("🎉 FAZA 4C — KROK 3: CITY FRONTEND API ZAKOŃCZONY.");

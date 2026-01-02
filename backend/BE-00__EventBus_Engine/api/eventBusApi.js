import express from "express";

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

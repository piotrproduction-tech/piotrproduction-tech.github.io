import express from "express";
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

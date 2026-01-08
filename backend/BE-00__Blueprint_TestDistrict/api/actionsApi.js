import express from "express";

export const actionsApi = express.Router();

// Przykładowa akcja
actionsApi.post("/ping", (req, res) => {
  res.json({
    ok: true,
    action: "ping",
    received: req.body ?? {},
    ts: Date.now()
  });
});

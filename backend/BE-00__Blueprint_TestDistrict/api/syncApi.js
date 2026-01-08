import express from "express";

export const syncApi = express.Router();

// Minimalny endpoint synchronizacyjny
syncApi.get("/heartbeat", (req, res) => {
  res.json({
    ok: true,
    module: "BE-00-BLUEPRINT",
    heartbeat: true,
    ts: Date.now()
  });
});

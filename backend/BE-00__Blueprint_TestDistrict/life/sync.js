import express from "express";

export const syncLife = express.Router();

syncLife.get("/heartbeat", (req, res) => {
  res.json({
    ok: true,
    life: "sync",
    heartbeat: true,
    ts: Date.now()
  });
});

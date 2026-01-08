import express from "express";

export const glowLife = express.Router();

glowLife.post("/", (req, res) => {
  res.json({
    ok: true,
    life: "glow",
    state: req.body?.state ?? "neutral",
    ts: Date.now()
  });
});

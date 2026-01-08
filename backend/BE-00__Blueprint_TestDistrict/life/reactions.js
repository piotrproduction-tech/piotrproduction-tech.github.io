import express from "express";

export const reactionsLife = express.Router();

reactionsLife.post("/", (req, res) => {
  res.json({
    ok: true,
    life: "reactions",
    event: req.body?.event ?? "unknown",
    ts: Date.now()
  });
});

import express from "express";

export const narrationLife = express.Router();

narrationLife.get("/", (req, res) => {
  res.json({
    ok: true,
    life: "narration",
    message: "Narration layer is alive",
    ts: Date.now()
  });
});

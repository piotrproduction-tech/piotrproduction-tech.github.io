import express from "express";

export const notificationsLife = express.Router();

notificationsLife.post("/", (req, res) => {
  res.json({
    ok: true,
    life: "notifications",
    notify: req.body?.message ?? "no message",
    ts: Date.now()
  });
});

import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_25Api = express.Router();

BE_25Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_25Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_25Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

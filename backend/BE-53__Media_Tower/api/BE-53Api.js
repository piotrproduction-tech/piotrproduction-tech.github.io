import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_53Api = express.Router();

BE_53Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_53Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_53Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

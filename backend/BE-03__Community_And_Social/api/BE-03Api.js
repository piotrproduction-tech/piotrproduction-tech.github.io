import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_03Api = express.Router();

BE_03Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_03Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_03Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_37Api = express.Router();

BE_37Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_37Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_37Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

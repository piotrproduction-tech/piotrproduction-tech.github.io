import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_48Api = express.Router();

BE_48Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_48Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_48Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

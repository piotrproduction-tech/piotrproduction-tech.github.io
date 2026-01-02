import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_38Api = express.Router();

BE_38Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_38Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_38Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

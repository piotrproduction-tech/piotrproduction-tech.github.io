import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_26Api = express.Router();

BE_26Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_26Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_26Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_30Api = express.Router();

BE_30Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_30Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_30Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_39Api = express.Router();

BE_39Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_39Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_39Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_16Api = express.Router();

BE_16Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_16Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_16Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

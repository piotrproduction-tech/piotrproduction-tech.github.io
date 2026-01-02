import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_13Api = express.Router();

BE_13Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_13Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_13Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_23Api = express.Router();

BE_23Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_23Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_23Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

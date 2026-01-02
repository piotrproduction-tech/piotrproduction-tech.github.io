import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_22Api = express.Router();

BE_22Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_22Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_22Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

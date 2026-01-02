import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_50Api = express.Router();

BE_50Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_50Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_50Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

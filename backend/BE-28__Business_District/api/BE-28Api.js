import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_28Api = express.Router();

BE_28Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_28Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_28Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

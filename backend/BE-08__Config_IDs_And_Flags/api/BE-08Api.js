import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_08Api = express.Router();

BE_08Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_08Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_08Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

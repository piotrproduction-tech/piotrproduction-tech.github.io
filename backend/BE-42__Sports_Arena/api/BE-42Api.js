import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_42Api = express.Router();

BE_42Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_42Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_42Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

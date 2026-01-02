import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_19Api = express.Router();

BE_19Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_19Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_19Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

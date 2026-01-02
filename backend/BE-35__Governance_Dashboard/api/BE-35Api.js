import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_35Api = express.Router();

BE_35Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_35Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_35Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

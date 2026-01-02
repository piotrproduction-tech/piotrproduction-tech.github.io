import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_36Api = express.Router();

BE_36Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_36Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_36Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_49Api = express.Router();

BE_49Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_49Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_49Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_45Api = express.Router();

BE_45Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_45Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_45Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

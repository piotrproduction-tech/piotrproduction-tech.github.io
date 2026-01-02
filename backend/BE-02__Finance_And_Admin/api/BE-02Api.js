import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_02Api = express.Router();

BE_02Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_02Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_02Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_40Api = express.Router();

BE_40Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_40Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_40Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

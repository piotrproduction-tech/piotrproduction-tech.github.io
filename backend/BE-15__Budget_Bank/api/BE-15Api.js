import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_15Api = express.Router();

BE_15Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_15Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_15Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

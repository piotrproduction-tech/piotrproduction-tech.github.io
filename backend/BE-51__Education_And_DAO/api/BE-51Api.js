import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_51Api = express.Router();

BE_51Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_51Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_51Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

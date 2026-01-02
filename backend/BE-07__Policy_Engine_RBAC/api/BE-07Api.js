import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_07Api = express.Router();

BE_07Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_07Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_07Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

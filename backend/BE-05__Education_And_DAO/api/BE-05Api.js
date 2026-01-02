import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_05Api = express.Router();

BE_05Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_05Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_05Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

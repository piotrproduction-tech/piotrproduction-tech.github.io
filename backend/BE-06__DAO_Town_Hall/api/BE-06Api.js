import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_06Api = express.Router();

BE_06Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_06Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_06Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

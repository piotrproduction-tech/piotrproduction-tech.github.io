import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_34Api = express.Router();

BE_34Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_34Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_34Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

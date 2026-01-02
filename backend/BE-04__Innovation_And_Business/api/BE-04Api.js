import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_04Api = express.Router();

BE_04Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_04Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_04Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

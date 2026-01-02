import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_32Api = express.Router();

BE_32Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_32Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_32Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

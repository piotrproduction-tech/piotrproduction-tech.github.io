import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_09Api = express.Router();

BE_09Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_09Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_09Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

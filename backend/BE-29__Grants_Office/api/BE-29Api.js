import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_29Api = express.Router();

BE_29Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_29Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_29Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

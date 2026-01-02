import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_18Api = express.Router();

BE_18Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_18Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_18Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_46Api = express.Router();

BE_46Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_46Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_46Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

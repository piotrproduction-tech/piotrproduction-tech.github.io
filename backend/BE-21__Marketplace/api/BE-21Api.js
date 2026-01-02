import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_21Api = express.Router();

BE_21Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_21Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_21Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

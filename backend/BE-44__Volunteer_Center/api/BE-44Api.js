import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_44Api = express.Router();

BE_44Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_44Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_44Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

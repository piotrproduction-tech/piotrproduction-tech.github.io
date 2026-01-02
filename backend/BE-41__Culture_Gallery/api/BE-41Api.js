import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_41Api = express.Router();

BE_41Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_41Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_41Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

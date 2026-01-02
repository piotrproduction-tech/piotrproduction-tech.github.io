import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_27Api = express.Router();

BE_27Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_27Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_27Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_24Api = express.Router();

BE_24Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_24Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_24Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

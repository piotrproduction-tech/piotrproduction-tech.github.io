import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_43Api = express.Router();

BE_43Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_43Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_43Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

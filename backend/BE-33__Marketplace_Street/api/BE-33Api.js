import express from "express";
import { getStatus } from "../diagnostics/status.js";

export const BE_33Api = express.Router();

BE_33Api.get("/status", (req, res) => {
  res.json(getStatus());
});



BE_33Api.get("/events", (req, res) => {
  res.json({ events: [] });
});

BE_33Api.post("/actions", (req, res) => {
  res.json({ ok: true, action: req.body });
});

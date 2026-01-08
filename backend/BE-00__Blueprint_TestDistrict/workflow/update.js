import express from "express";

export const updateWorkflow = express.Router();

updateWorkflow.post("/", (req, res) => {
  res.json({
    ok: true,
    action: "update",
    payload: req.body ?? {},
    ts: Date.now()
  });
});

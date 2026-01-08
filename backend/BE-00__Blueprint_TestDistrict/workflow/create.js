import express from "express";

export const createWorkflow = express.Router();

createWorkflow.post("/", (req, res) => {
  res.json({
    ok: true,
    action: "create",
    payload: req.body ?? {},
    ts: Date.now()
  });
});

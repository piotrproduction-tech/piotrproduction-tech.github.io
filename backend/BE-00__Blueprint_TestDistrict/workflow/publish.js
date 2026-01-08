import express from "express";

export const publishWorkflow = express.Router();

publishWorkflow.post("/", (req, res) => {
  res.json({
    ok: true,
    action: "publish",
    payload: req.body ?? {},
    ts: Date.now()
  });
});

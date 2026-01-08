import express from "express";

export const archiveWorkflow = express.Router();

archiveWorkflow.post("/", (req, res) => {
  res.json({
    ok: true,
    action: "archive",
    payload: req.body ?? {},
    ts: Date.now()
  });
});

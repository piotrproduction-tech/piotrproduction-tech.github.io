import express from "express";

export const deleteWorkflow = express.Router();

deleteWorkflow.post("/", (req, res) => {
  res.json({
    ok: true,
    action: "delete",
    payload: req.body ?? {},
    ts: Date.now()
  });
});

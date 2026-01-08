import express from "express";

export const statusApi = express.Router();

// Status dzielnicy
statusApi.get("/", (req, res) => {
  res.json({
    ok: true,
    module: "BE-00-BLUEPRINT",
    status: "online",
    ts: Date.now()
  });
});

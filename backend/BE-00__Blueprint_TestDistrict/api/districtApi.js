import express from "express";

export const districtApi = express.Router();

// Główny endpoint informacyjny
districtApi.get("/", (req, res) => {
  res.json({
    ok: true,
    module: "BE-00-BLUEPRINT",
    message: "District API root",
    ts: Date.now()
  });
});

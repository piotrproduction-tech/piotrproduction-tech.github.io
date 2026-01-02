// BE-21__Marketplace - api/CreatorApi.js
// API dla Creator Pathway

const express = require("express");
const router = express.Router();

const {
  syncCreatorProgress,
  syncCreatorPortfolio,
  syncCreatorToFestivalHub
} = require("../life/creatorSync");

router.post("/creator/progress", async (req, res) => {
  const { userId, stats } = req.body;
  const result = await syncCreatorProgress(userId, stats);
  res.json(result);
});

router.post("/creator/portfolio", async (req, res) => {
  const { userId, portfolio } = req.body;
  const result = await syncCreatorPortfolio(userId, portfolio);
  res.json(result);
});

router.post("/creator/festival", async (req, res) => {
  const { userId, stats } = req.body;
  const result = await syncCreatorToFestivalHub(userId, stats);
  res.json(result);
});

module.exports = router;

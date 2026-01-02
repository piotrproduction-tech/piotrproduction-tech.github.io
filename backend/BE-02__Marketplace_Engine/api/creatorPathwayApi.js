// API Creator Pathway — BE-02__Marketplace_Engine
// Uproszczone obliczanie etapu na podstawie mockowanych danych.

import express from "express";
import fs from "fs";
import path from "path";

export const creatorPathwayRouter = express.Router();

const ROOT = process.cwd();
const CONFIG_PATH = path.join(
  ROOT,
  "backend",
  "BE-02__Marketplace_Engine",
  "config",
  "creatorPathway.json"
);

// TODO: podpiąć prawdziwe dane użytkownika i ofert
function getMockUserStats(userId) {
  return {
    userId,
    itemsCount: 4,
    activeDays: 20,
    festivalParticipation: false,
    communityApproval: false
  };
}

function loadConfig() {
  const raw = fs.readFileSync(CONFIG_PATH, "utf8");
  return JSON.parse(raw);
}

function evaluateStage(stats, config) {
  const stages = config.stages || [];
  let current = stages[0] || null;

  for (const stage of stages) {
    const reqs = stage.requirements || [];
    const ok = reqs.every((r) => {
      if (r.startsWith("minItems:")) {
        const v = parseInt(r.split(":")[1], 10);
        return stats.itemsCount >= v;
      }
      if (r.startsWith("minActiveDays:")) {
        const v = parseInt(r.split(":")[1], 10);
        return stats.activeDays >= v;
      }
      if (r === "festivalParticipation:true") {
        return stats.festivalParticipation === true;
      }
      if (r === "communityApproval:true") {
        return stats.communityApproval === true;
      }
      return true;
    });
    if (ok) current = stage;
    else break;
  }

  return current;
}

creatorPathwayRouter.get("/creatorPathway/:userId", (req, res) => {
  const userId = req.params.userId;
  const config = loadConfig();
  const stats = getMockUserStats(userId);
  const stage = evaluateStage(stats, config);

  res.json({
    userId,
    stats,
    stage,
    stages: config.stages
  });
});

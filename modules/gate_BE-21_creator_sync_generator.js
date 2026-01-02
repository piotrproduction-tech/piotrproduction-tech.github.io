const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BACKEND = path.join(ROOT, "backend");
const MODULE_ID = "BE-21__Marketplace";
const MODULE_PATH = path.join(BACKEND, MODULE_ID);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log("[DIR] created:", dir);
  }
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
  console.log("[FILE] updated:", filePath);
}

function writeFileIfMissing(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("[FILE] created:", filePath);
  } else {
    console.log("[FILE] exists, skipped:", filePath);
  }
}

function creatorSyncTemplate() {
  return `// BE-21__Marketplace - life/creatorSync.js
// Rozszerzona integracja Creator Pathway + Festival Hub

const { CitySuperEngine } = require("../../CitySuperEngine");

// EVENT EMITTER
function emitCreatorEvent(type, payload) {
  const event = {
    type,
    districtId: "BE-21",
    districtType: "marketplace",
    timestamp: Date.now(),
    payload
  };
  return CitySuperEngine.process(event);
}

// OBLICZANIE PROGRESJI TWÓRCY
function calculateCreatorProgress(stats) {
  const progress = {
    level: "Creator",
    badge: null,
    nextLevel: null
  };

  if (stats.creations >= 10 && stats.reputation >= 150) {
    progress.level = "Certified Creator";
    progress.badge = "Certified Creator";
    progress.nextLevel = "Master Creator";
  }

  if (stats.creations >= 50 && stats.reputation >= 500) {
    progress.level = "Master Creator";
    progress.badge = "Master Creator";
    progress.nextLevel = null;
  }

  return progress;
}

// SYNC DO CREATOR PATHWAY
function syncCreatorProgress(userId, stats) {
  const progress = calculateCreatorProgress(stats);

  return emitCreatorEvent("creator.progress.updated", {
    userId,
    stats,
    progress
  });
}

// SYNC PORTFOLIO
function syncCreatorPortfolio(userId, portfolio) {
  return emitCreatorEvent("creator.portfolio.updated", {
    userId,
    portfolio
  });
}

// SYNC DO FESTIVAL HUB
function syncCreatorToFestivalHub(userId, stats) {
  return emitCreatorEvent("festival.creator.synced", {
    userId,
    stats
  });
}

module.exports = {
  syncCreatorProgress,
  syncCreatorPortfolio,
  syncCreatorToFestivalHub,
  calculateCreatorProgress
};
`;
}

function creatorApiTemplate() {
  return `// BE-21__Marketplace - api/CreatorApi.js
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
`;
}

function creatorWorkflowTemplate() {
  return `// BE-21__Marketplace - workflow/creator.js
// Workflow twórców

const {
  syncCreatorProgress,
  syncCreatorPortfolio,
  syncCreatorToFestivalHub
} = require("../life/creatorSync");

async function updateCreatorProgress(data) {
  return syncCreatorProgress(data.userId, data.stats);
}

async function updateCreatorPortfolio(data) {
  return syncCreatorPortfolio(data.userId, data.portfolio);
}

async function updateCreatorFestival(data) {
  return syncCreatorToFestivalHub(data.userId, data.stats);
}

module.exports = {
  updateCreatorProgress,
  updateCreatorPortfolio,
  updateCreatorFestival
};
`;
}

function main() {
  console.log("=== BE-21 CreatorSync Integration generator start ===");

  if (!fs.existsSync(MODULE_PATH)) {
    console.error("[ERROR] Module path not found:", MODULE_PATH);
    process.exit(1);
  }

  const lifeDir = path.join(MODULE_PATH, "life");
  const apiDir = path.join(MODULE_PATH, "api");
  const workflowDir = path.join(MODULE_PATH, "workflow");

  ensureDir(lifeDir);
  ensureDir(apiDir);
  ensureDir(workflowDir);

  writeFile(path.join(lifeDir, "creatorSync.js"), creatorSyncTemplate());
  writeFileIfMissing(path.join(apiDir, "CreatorApi.js"), creatorApiTemplate());
  writeFileIfMissing(path.join(workflowDir, "creator.js"), creatorWorkflowTemplate());

  console.log("=== BE-21 CreatorSync Integration generator done ===");
}

if (require.main === module) {
  main();
}

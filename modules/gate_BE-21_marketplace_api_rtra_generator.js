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

function writeFileIfMissing(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("[FILE] created:", filePath);
  } else {
    console.log("[FILE] exists, skipped:", filePath);
  }
}

function getApiTemplate() {
  return `// BE-21__Marketplace - api/MarketplaceApi.js

const express = require("express");
const router = express.Router();

const offers = require("../workflow/offers");
const transactions = require("../workflow/transactions");
const reviews = require("../workflow/reviews");
const categories = require("../workflow/categories");
const licenses = require("../workflow/licenses");
const services = require("../workflow/services");

const { runRTRA } = require("../life/rtra"); 
const rtraConfig = require("../life/rtra.config.json");

// Helper: wrap workflow → SuperEngine → RTRA → response
async function processAction(actionFn, data) {
  const eventResult = await actionFn(data);

  const rtra = runRTRA(eventResult.event, rtraConfig);

  return {
    ...eventResult,
    rtra: {
      reputationDelta: rtra.reputationDelta,
      tokensDelta: rtra.tokensDelta,
      rewards: rtra.rewards,
      abuse: rtra.abuse
    }
  };
}

// OFFERS
router.post("/offers/create", async (req, res) => {
  res.json(await processAction(offers.createOffer, req.body));
});

router.post("/offers/update", async (req, res) => {
  res.json(await processAction(offers.updateOffer, req.body));
});

router.post("/offers/publish", async (req, res) => {
  res.json(await processAction(offers.publishOffer, req.body));
});

router.post("/offers/unpublish", async (req, res) => {
  res.json(await processAction(offers.unpublishOffer, req.body));
});

router.post("/offers/archive", async (req, res) => {
  res.json(await processAction(offers.archiveOffer, req.body));
});

router.post("/offers/sell", async (req, res) => {
  res.json(await processAction(offers.sellOffer, req.body));
});

// TRANSACTIONS
router.post("/transactions/start", async (req, res) => {
  res.json(await processAction(transactions.startTransaction, req.body));
});

router.post("/transactions/complete", async (req, res) => {
  res.json(await processAction(transactions.completeTransaction, req.body));
});

router.post("/transactions/fail", async (req, res) => {
  res.json(await processAction(transactions.failTransaction, req.body));
});

// REVIEWS
router.post("/reviews/add", async (req, res) => {
  res.json(await processAction(reviews.addReview, req.body));
});

router.post("/reviews/positive", async (req, res) => {
  res.json(await processAction(reviews.positiveReview, req.body));
});

router.post("/reviews/negative", async (req, res) => {
  res.json(await processAction(reviews.negativeReview, req.body));
});

router.post("/reviews/flag", async (req, res) => {
  res.json(await processAction(reviews.flagReview, req.body));
});

// CATEGORIES
router.post("/categories/create", async (req, res) => {
  res.json(await processAction(categories.createCategory, req.body));
});

router.post("/categories/update", async (req, res) => {
  res.json(await processAction(categories.updateCategory, req.body));
});

router.post("/categories/delete", async (req, res) => {
  res.json(await processAction(categories.deleteCategory, req.body));
});

// LICENSES
router.post("/licenses/issue", async (req, res) => {
  res.json(await processAction(licenses.issueLicense, req.body));
});

router.post("/licenses/revoke", async (req, res) => {
  res.json(await processAction(licenses.revokeLicense, req.body));
});

// SERVICES
router.post("/services/book", async (req, res) => {
  res.json(await processAction(services.bookService, req.body));
});

router.post("/services/complete", async (req, res) => {
  res.json(await processAction(services.completeService, req.body));
});

module.exports = router;
`;
}

function main() {
  console.log("=== BE-21 Marketplace: KROK 12–13 generator start ===");

  if (!fs.existsSync(MODULE_PATH)) {
    console.error("[ERROR] Module path not found:", MODULE_PATH);
    process.exit(1);
  }

  const apiDir = path.join(MODULE_PATH, "api");
  ensureDir(apiDir);

  writeFileIfMissing(
    path.join(apiDir, "MarketplaceApi.js"),
    getApiTemplate()
  );

  console.log("=== BE-21 Marketplace: KROK 12–13 generator done ===");
}

if (require.main === module) {
  main();
}

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

function getEmittersTemplate() {
  return `// BE-21__Marketplace - events/emitters.js

const { CitySuperEngine } = require("../../CitySuperEngine"); // dostosuj ścieżkę jeśli masz inną

function emitEvent(type, payload) {
  const event = {
    type,
    districtId: "BE-21",
    districtType: "marketplace",
    timestamp: Date.now(),
    payload,
  };
  return CitySuperEngine.process(event);
}

// OFFERS
function emitOfferCreated(data) { return emitEvent("marketplace.offer.created", data); }
function emitOfferUpdated(data) { return emitEvent("marketplace.offer.updated", data); }
function emitOfferPublished(data) { return emitEvent("marketplace.offer.published", data); }
function emitOfferUnpublished(data) { return emitEvent("marketplace.offer.unpublished", data); }
function emitOfferSold(data) { return emitEvent("marketplace.offer.sold", data); }
function emitOfferArchived(data) { return emitEvent("marketplace.offer.archived", data); }

// TRANSACTIONS
function emitTransactionStarted(data) { return emitEvent("marketplace.transaction.started", data); }
function emitTransactionCompleted(data) { return emitEvent("marketplace.transaction.completed", data); }
function emitTransactionFailed(data) { return emitEvent("marketplace.transaction.failed", data); }

// REVIEWS
function emitReviewAdded(data) { return emitEvent("marketplace.review.added", data); }
function emitReviewPositive(data) { return emitEvent("marketplace.review.positive", data); }
function emitReviewNegative(data) { return emitEvent("marketplace.review.negative", data); }
function emitReviewFlagged(data) { return emitEvent("marketplace.review.flagged", data); }

// CATEGORIES
function emitCategoryCreated(data) { return emitEvent("marketplace.category.created", data); }
function emitCategoryUpdated(data) { return emitEvent("marketplace.category.updated", data); }
function emitCategoryDeleted(data) { return emitEvent("marketplace.category.deleted", data); }

// LICENSES
function emitLicenseIssued(data) { return emitEvent("marketplace.license.issued", data); }
function emitLicenseRevoked(data) { return emitEvent("marketplace.license.revoked", data); }

// SERVICES
function emitServiceBooked(data) { return emitEvent("marketplace.service.booked", data); }
function emitServiceCompleted(data) { return emitEvent("marketplace.service.completed", data); }

module.exports = {
  emitOfferCreated,
  emitOfferUpdated,
  emitOfferPublished,
  emitOfferUnpublished,
  emitOfferSold,
  emitOfferArchived,
  emitTransactionStarted,
  emitTransactionCompleted,
  emitTransactionFailed,
  emitReviewAdded,
  emitReviewPositive,
  emitReviewNegative,
  emitReviewFlagged,
  emitCategoryCreated,
  emitCategoryUpdated,
  emitCategoryDeleted,
  emitLicenseIssued,
  emitLicenseRevoked,
  emitServiceBooked,
  emitServiceCompleted,
};
`;
}

function getListenersTemplate() {
  return `// BE-21__Marketplace - events/listeners.js
// miejsce na ewentualne nasłuchy wewnętrzne (np. logi, integracje wewnątrz modułu)

function onMarketplaceEvent(event) {
  // placeholder – możesz tu dodać logikę reakcji lokalnych
  // console.log("[BE-21 listener]", event.type, event.payload);
}

module.exports = {
  onMarketplaceEvent,
};
`;
}

function getOffersWorkflowTemplate() {
  return `// BE-21__Marketplace - workflow/offers.js

const {
  emitOfferCreated,
  emitOfferUpdated,
  emitOfferPublished,
  emitOfferUnpublished,
  emitOfferSold,
  emitOfferArchived,
} = require("../events/emitters");

async function createOffer(data) {
  // TODO: zapisz ofertę w storage (DB / plik / inny backend)
  const result = await emitOfferCreated(data);
  return result;
}

async function updateOffer(data) {
  const result = await emitOfferUpdated(data);
  return result;
}

async function publishOffer(data) {
  const result = await emitOfferPublished(data);
  return result;
}

async function unpublishOffer(data) {
  const result = await emitOfferUnpublished(data);
  return result;
}

async function archiveOffer(data) {
  const result = await emitOfferArchived(data);
  return result;
}

async function sellOffer(data) {
  const result = await emitOfferSold(data);
  return result;
}

module.exports = {
  createOffer,
  updateOffer,
  publishOffer,
  unpublishOffer,
  archiveOffer,
  sellOffer,
};
`;
}

function getTransactionsWorkflowTemplate() {
  return `// BE-21__Marketplace - workflow/transactions.js

const {
  emitTransactionStarted,
  emitTransactionCompleted,
  emitTransactionFailed,
} = require("../events/emitters");

async function startTransaction(data) {
  const result = await emitTransactionStarted(data);
  return result;
}

async function completeTransaction(data) {
  const result = await emitTransactionCompleted(data);
  return result;
}

async function failTransaction(data) {
  const result = await emitTransactionFailed(data);
  return result;
}

module.exports = {
  startTransaction,
  completeTransaction,
  failTransaction,
};
`;
}

function getReviewsWorkflowTemplate() {
  return `// BE-21__Marketplace - workflow/reviews.js

const {
  emitReviewAdded,
  emitReviewPositive,
  emitReviewNegative,
  emitReviewFlagged,
} = require("../events/emitters");

async function addReview(data) {
  const result = await emitReviewAdded(data);
  return result;
}

async function positiveReview(data) {
  const result = await emitReviewPositive(data);
  return result;
}

async function negativeReview(data) {
  const result = await emitReviewNegative(data);
  return result;
}

async function flagReview(data) {
  const result = await emitReviewFlagged(data);
  return result;
}

module.exports = {
  addReview,
  positiveReview,
  negativeReview,
  flagReview,
};
`;
}

function getCategoriesWorkflowTemplate() {
  return `// BE-21__Marketplace - workflow/categories.js

const {
  emitCategoryCreated,
  emitCategoryUpdated,
  emitCategoryDeleted,
} = require("../events/emitters");

async function createCategory(data) {
  const result = await emitCategoryCreated(data);
  return result;
}

async function updateCategory(data) {
  const result = await emitCategoryUpdated(data);
  return result;
}

async function deleteCategory(data) {
  const result = await emitCategoryDeleted(data);
  return result;
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
};
`;
}

function getLicensesWorkflowTemplate() {
  return `// BE-21__Marketplace - workflow/licenses.js

const {
  emitLicenseIssued,
  emitLicenseRevoked,
} = require("../events/emitters");

async function issueLicense(data) {
  const result = await emitLicenseIssued(data);
  return result;
}

async function revokeLicense(data) {
  const result = await emitLicenseRevoked(data);
  return result;
}

module.exports = {
  issueLicense,
  revokeLicense,
};
`;
}

function getServicesWorkflowTemplate() {
  return `// BE-21__Marketplace - workflow/services.js

const {
  emitServiceBooked,
  emitServiceCompleted,
} = require("../events/emitters");

async function bookService(data) {
  const result = await emitServiceBooked(data);
  return result;
}

async function completeService(data) {
  const result = await emitServiceCompleted(data);
  return result;
}

module.exports = {
  bookService,
  completeService,
};
`;
}

function main() {
  console.log("=== BE-21 Marketplace: KROK 10–11 generator start ===");

  if (!fs.existsSync(MODULE_PATH)) {
    console.error("[ERROR] Module path not found:", MODULE_PATH);
    process.exit(1);
  }

  const eventsDir = path.join(MODULE_PATH, "events");
  const workflowDir = path.join(MODULE_PATH, "workflow");

  ensureDir(eventsDir);
  ensureDir(workflowDir);

  // events
  writeFileIfMissing(path.join(eventsDir, "emitters.js"), getEmittersTemplate());
  writeFileIfMissing(path.join(eventsDir, "listeners.js"), getListenersTemplate());

  // workflow
  writeFileIfMissing(path.join(workflowDir, "offers.js"), getOffersWorkflowTemplate());
  writeFileIfMissing(path.join(workflowDir, "transactions.js"), getTransactionsWorkflowTemplate());
  writeFileIfMissing(path.join(workflowDir, "reviews.js"), getReviewsWorkflowTemplate());
  writeFileIfMissing(path.join(workflowDir, "categories.js"), getCategoriesWorkflowTemplate());
  writeFileIfMissing(path.join(workflowDir, "licenses.js"), getLicensesWorkflowTemplate());
  writeFileIfMissing(path.join(workflowDir, "services.js"), getServicesWorkflowTemplate());

  console.log("=== BE-21 Marketplace: KROK 10–11 generator done ===");
}

if (require.main === module) {
  main();
}

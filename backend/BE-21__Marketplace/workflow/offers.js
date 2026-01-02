// BE-21__Marketplace - workflow/offers.js

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

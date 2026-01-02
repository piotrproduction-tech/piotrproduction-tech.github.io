// BE-21__Marketplace - life/streetSync.js
// Synchronizuje dane Marketplace z Marketplace Street (BE-33)

function syncSellerToStreet(userData) {
  return {
    type: "street.update.seller",
    payload: userData
  };
}

function syncCreatorToStreet(creatorData) {
  return {
    type: "street.update.creator",
    payload: creatorData
  };
}

function syncOfferToStreet(offerData) {
  return {
    type: "street.update.offer",
    payload: offerData
  };
}

function syncEventToStreet(event) {
  return {
    type: "street.feed.event",
    payload: event
  };
}

module.exports = {
  syncSellerToStreet,
  syncCreatorToStreet,
  syncOfferToStreet,
  syncEventToStreet
};

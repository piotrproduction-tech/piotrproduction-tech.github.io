// backend/BE-23/routes.integrations.js

import * as service from "./service.integrations.js";

export function registerCultureGalleryIntegrationRoutes(app) {

  // Marketplace
  app.post("/culture/link/marketplace", (req, res) => {
    const { artworkId, productId } = req.body;
    res.json(service.Gallery_linkMarketplace(artworkId, productId));
  });

  // Stream Square
  app.post("/culture/link/stream", (req, res) => {
    const { contentId, streamId } = req.body;
    res.json(service.Media_linkStream(contentId, streamId));
  });

  // Community House
  app.post("/culture/link/community", (req, res) => {
    const { eventId, initiativeId } = req.body;
    res.json(service.Culture_linkCommunity(eventId, initiativeId));
  });
}

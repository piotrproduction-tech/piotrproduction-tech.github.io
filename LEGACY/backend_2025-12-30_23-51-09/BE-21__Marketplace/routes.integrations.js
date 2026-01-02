import * as service from "./service.integrations.js";

export function registerMarketplaceIntegrationRoutes(app) {
  app.post("/marketplace/link/artwork", (req, res) => {
    const { artworkId, productId } = req.body;
    res.json(service.Marketplace_linkArtwork(artworkId, productId));
  });
}

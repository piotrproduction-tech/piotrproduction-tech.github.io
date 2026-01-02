import * as service from "./service.js";

export function registerMarketplaceStreetRoutes(app) {

  // Kategorie
  app.get("/marketplace-street/categories", (req, res) => {
    res.json({ list: service.MarketplaceStreet_listCategories() });
  });

  // Produkty
  app.get("/marketplace-street/items", (req, res) => {
    const { category } = req.query;
    res.json({ list: service.MarketplaceStreet_listItems(category) });
  });

  // Koszyk
  app.post("/marketplace-street/cart/add", (req, res) => {
    const { userId, itemId } = req.body;
    res.json(service.MarketplaceStreet_addToCart(userId, itemId));
  });

  app.post("/marketplace-street/checkout", (req, res) => {
    const { userId, cart } = req.body;
    res.json(service.MarketplaceStreet_checkout(userId, cart || []));
  });

  // Raporty
  app.get("/marketplace-street/sales/report", (req, res) => {
    const { range } = req.query;
    res.json(service.MarketplaceStreet_salesReport(range));
  });

  // Filtry
  app.get("/marketplace-street/items/filter", (req, res) => {
    const filters = req.query || {};
    res.json(service.MarketplaceStreet_filterItems(filters));
  });

  // Wishlist
  app.get("/marketplace-street/wishlist/:userId", (req, res) => {
    res.json({ list: service.MarketplaceStreet_wishlist(req.params.userId) });
  });

  // Recenzje
  app.get("/marketplace-street/reviews/:itemId", (req, res) => {
    res.json({ list: service.MarketplaceStreet_reviews(req.params.itemId) });
  });

  // Settlement
  app.post("/marketplace-street/settlement", (req, res) => {
    const { partnerId } = req.body;
    res.json(service.MarketplaceStreet_settlement(partnerId));
  });
}

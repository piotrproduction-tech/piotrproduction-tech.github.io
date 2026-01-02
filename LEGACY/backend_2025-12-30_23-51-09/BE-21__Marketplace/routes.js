import * as service from "./service.js";

export function registerMarketplaceRoutes(app) {

  // Produkty
  app.get("/marketplace/products", (req, res) => {
    res.json({ list: service.Marketplace_getProducts() });
  });

  app.post("/marketplace/product/add", (req, res) => {
    const { userId, title, price, stock } = req.body;
    res.json(service.Marketplace_addProduct(userId, title, price, stock));
  });

  // Koszyk
  app.post("/marketplace/cart/add", (req, res) => {
    const { userId, productId, qty } = req.body;
    res.json(service.Marketplace_addToCart(userId, productId, qty));
  });

  app.get("/marketplace/cart/:userId", (req, res) => {
    res.json({ list: service.Marketplace_getCart(req.params.userId) });
  });

  app.post("/marketplace/checkout", (req, res) => {
    const { userId } = req.body;
    res.json(service.Marketplace_checkout(userId));
  });

  // Recenzje
  app.post("/marketplace/review/add", (req, res) => {
    const { userId, productId, rating, text } = req.body;
    res.json(service.Marketplace_addReview(userId, productId, rating, text));
  });

  app.get("/marketplace/reviews/:productId", (req, res) => {
    res.json({ list: service.Marketplace_getReviews(req.params.productId) });
  });

  // Integracje
  app.post("/marketplace/link/budget", (req, res) => {
    const { userId, accountId, amount } = req.body;
    res.json(service.Marketplace_linkBudget(userId, accountId, amount));
  });

  // Raporty legacy
  app.get("/marketplace/reports/legacy", (req, res) => {
    res.json({ list: service.Marketplace_getReportsLegacy() });
  });
}

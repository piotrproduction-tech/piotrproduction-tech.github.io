import * as service from "./service.js";

export function registerTreasureVaultRoutes(app) {

  // Zasoby
  app.post("/treasure/item/add", (req, res) => {
    const { userId, title, description, value } = req.body;
    res.json(service.Treasure_addItem(userId, title, description, value));
  });

  app.get("/treasure/items", (req, res) => {
    res.json({ list: service.Treasure_getItems() });
  });

  // Przechowywanie
  app.post("/treasure/store", (req, res) => {
    const { userId, itemId } = req.body;
    res.json(service.Treasure_storeItem(userId, itemId));
  });

  app.get("/treasure/stored/:userId", (req, res) => {
    res.json({ list: service.Treasure_getStored(req.params.userId) });
  });

  // Integracje
  app.post("/treasure/link/marketplace", (req, res) => {
    const { itemId, offerId } = req.body;
    res.json(service.Treasure_linkMarketplace(itemId, offerId));
  });

  app.post("/treasure/link/profile", (req, res) => {
    const { userId, itemId } = req.body;
    res.json(service.Treasure_linkProfile(userId, itemId));
  });

  // Osiągnięcia
  app.post("/treasure/achievement/add", (req, res) => {
    const { userId, title } = req.body;
    res.json(service.Treasure_addAchievement(userId, title));
  });

  app.get("/treasure/achievements/:userId", (req, res) => {
    res.json({ list: service.Treasure_getAchievements(req.params.userId) });
  });

  // Raporty legacy
  app.get("/treasure/reports/legacy", (req, res) => {
    res.json({ list: service.Treasure_getReports() });
  });
}

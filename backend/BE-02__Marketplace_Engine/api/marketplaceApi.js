// API Marketplace — BE-02__Marketplace_Engine
// Prosty kontrakt: lista ofert, szczegóły, tworzenie.

import express from "express";

export const marketplaceRouter = express.Router();

// In-memory mock — do zastąpienia storage'em
let ITEMS = [
  {
    id: "1",
    title: "Przykładowa oferta 1",
    description: "To jest przykładowa oferta w Marketplace.",
    price: 100,
    ownerId: "user-1",
    status: "active"
  }
];

marketplaceRouter.get("/items", (req, res) => {
  res.json(ITEMS);
});

marketplaceRouter.get("/items/:id", (req, res) => {
  const item = ITEMS.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

marketplaceRouter.post("/items", (req, res) => {
  const { title, description, price, ownerId } = req.body || {};
  const id = String(Date.now());
  const item = {
    id,
    title,
    description,
    price,
    ownerId: ownerId || "unknown",
    status: "active"
  };
  ITEMS.push(item);
  res.json({ success: true, item });
});

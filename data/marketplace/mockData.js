/**
 * Marketplace 5.0 — Mock Data
 */

export const mockCreators = [
  { id: "c1", name: "Creator One", reputation: 120 },
  { id: "c2", name: "Creator Two", reputation: 300 }
];

export const mockItems = [
  { id: "i1", title: "Item One", creatorId: "c1", price: 10 },
  { id: "i2", title: "Item Two", creatorId: "c2", price: 20 }
];

export const mockShops = [
  { id: "s1", creatorId: "c1", name: "Shop One" },
  { id: "s2", creatorId: "c2", name: "Shop Two" }
];

export const mockEvents = [
  { id: "e1", type: "drop", items: ["i1"] },
  { id: "e2", type: "flashSale", items: ["i2"] }
];

export const mockTransactions = [
  { id: "t1", buyerId: "u1", sellerId: "c1", itemId: "i1", price: 10 },
  { id: "t2", buyerId: "u2", sellerId: "c2", itemId: "i2", price: 20 }
];
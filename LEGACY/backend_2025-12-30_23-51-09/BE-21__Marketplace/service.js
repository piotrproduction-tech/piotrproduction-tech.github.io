// ==== Produkty ====
export function Marketplace_getProducts() {
  return [
    { id: "prod_01", title: "Bilet VR Festiwal", price: 100, stock: 50 },
    { id: "prod_02", title: "Obraz cyfrowy DAO", price: 250, stock: 10 }
  ];
}

export function Marketplace_addProduct(userId, title, price, stock) {
  const product = { id: "prod_" + Date.now(), userId, title, price, stock };
  return { ok: true, product };
}

// ==== Koszyk ====
export function Marketplace_addToCart(userId, productId, qty) {
  return { ok: true, userId, productId, qty };
}

export function Marketplace_getCart(userId) {
  return [
    { productId: "prod_01", qty: 2 },
    { productId: "prod_02", qty: 1 }
  ];
}

export function Marketplace_checkout(userId) {
  return { ok: true, userId, status: "completed" };
}

// ==== Integracja z Budget Bank ====
export function Marketplace_linkBudget(userId, accountId, amount) {
  return { ok: true, userId, accountId, amount };
}

// ==== Recenzje ====
export function Marketplace_addReview(userId, productId, rating, text) {
  const review = { id: "rev_" + Date.now(), userId, productId, rating, text };
  return { ok: true, review };
}

export function Marketplace_getReviews(productId) {
  return [
    { id: "rev_01", productId, rating: 5, text: "Świetny produkt!" },
    { id: "rev_02", productId, rating: 4, text: "Bardzo dobra jakość." }
  ];
}

// ==== Raporty legacy (2025) ====
export function Marketplace_getReportsLegacy() {
  return [
    { id: "rep_mp_01", title: "Raport sprzedaży grudzień 2025", summary: "Sprzedano 120 produktów" },
    { id: "rep_mp_02", title: "Raport sprzedaży styczeń 2026", summary: "Sprzedano 150 produktów" }
  ];
}

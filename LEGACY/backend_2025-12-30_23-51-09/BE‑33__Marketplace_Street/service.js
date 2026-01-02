// ==== Kategorie Street ====
export function MarketplaceStreet_listCategories() {
  return ["Książki", "Muzyka", "Filmy", "Rękodzieło", "Licencje"];
}

// ==== Produkty Street ====
export function MarketplaceStreet_listItems(category) {
  const items = {
    "Książki": [
      { id: "bk_01", title: "Powrót VR", price: 29 }
    ],
    "Muzyka": [
      { id: "mu_01", title: "Album Festiwalowy", price: 49 }
    ],
    "Filmy": [
      { id: "fm_01", title: "Film Gate VR", price: 99 }
    ],
    "Rękodzieło": [
      { id: "rk_01", title: "Obraz VR", price: 199 }
    ],
    "Licencje": [
      { id: "lc_01", title: "Licencja dzieła", price: 299 }
    ]
  };

  return items[category] || [];
}

// ==== Koszyk Street ====
export function MarketplaceStreet_addToCart(userId, itemId) {
  const cartItem = { userId, itemId };
  return { ok: true, ...cartItem };
}

export function MarketplaceStreet_checkout(userId, cart) {
  const total = (cart || []).reduce((sum, i) => sum + (i.price || 0), 0);
  const tx = {
    id: "mkt_tx_street_" + Date.now(),
    userId,
    cart,
    total
  };
  return { ok: true, ...tx };
}

// ==== Raporty Street ====
export function MarketplaceStreet_salesReport(range) {
  return {
    range: range || "30d",
    totalSales: 5000,
    topCategory: "Muzyka"
  };
}

// ==== Filtry Street ====
export function MarketplaceStreet_filterItems(filters) {
  return { ok: true, filters, results: [] };
}

// ==== Wishlist Street ====
export function MarketplaceStreet_wishlist(userId) {
  return [
    { id: "mu_02", title: "Album VR Deluxe" }
  ];
}

// ==== Recenzje Street ====
export function MarketplaceStreet_reviews(itemId) {
  return [
    { user: "u_01", rating: 5, text: "Świetne dzieło!" },
    { user: "u_02", rating: 4, text: "Polecam." }
  ];
}

// ==== Settlement Street ====
export function MarketplaceStreet_settlement(partnerId) {
  return { partnerId, amount: 1200, status: "paid" };
}

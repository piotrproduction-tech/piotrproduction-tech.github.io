// Panel listy ofert Marketplace (FE-02)

import React from "react";
import { useMarketplaceItems } from "../DATA/useMarketplaceApi";

export function MarketplaceListPanel() {
  const { items, loading } = useMarketplaceItems();

  if (loading) return <div>Ładowanie ofert...</div>;

  if (!items.length) return <div>Brak ofert w Marketplace.</div>;

  return (
    <div>
      <h2>Marketplace — oferty</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "8px" }}>
            <strong>{item.title}</strong> — {item.description} — {item.price} GATE
          </li>
        ))}
      </ul>
    </div>
  );
}

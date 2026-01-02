// Hook API dla Marketplace (FE-02)
// Zakłada, że backend wystawia /api/marketplace/...

import { useEffect, useState } from "react";

const BASE_URL = "/api/marketplace";

export function useMarketplaceItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/items`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data || []);
        setLoading(false);
      })
      .catch(() => {
        setItems([]);
        setLoading(false);
      });
  }, []);

  return { items, loading };
}

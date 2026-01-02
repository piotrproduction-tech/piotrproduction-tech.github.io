import React, { useEffect, useState } from "react";
import { getItemById } from "../api.js";

export default function DetailsPanel({ itemId }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getItemById(itemId);
      setItem(data);
    })();
  }, [itemId]);

  if (!item) return <div>Ładowanie...</div>;

  return (
    <div>
      <h2>Szczegóły elementu</h2>
      <p><strong>Nazwa:</strong> {item.name}</p>
      <p><strong>Status:</strong> {item.status}</p>
      <p><strong>Opis:</strong> {item.description}</p>
      <a href="/marketplace">← Powrót</a>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { getItems } from "../api.js";

export default function MainPanel() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getItems();
      setItems(data);
    })();
  }, []);

  return (
    <div>
      <h2>Lista elementów</h2>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            {i.name} — {i.status}{" "}
            <a href={"/marketplace/item/" + i.id}>Szczegóły</a>
          </li>
        ))}
      </ul>
      <a href="/marketplace/new">Dodaj nowy</a>
    </div>
  );
}

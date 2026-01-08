// apps/FE-12__CityOfGate_12.x/src/ui/CityMenu.jsx

import React from "react";
import { Link } from "react-router-dom";

const DISTRICTS = [
  { id: "marketplace", name: "Marketplace District" },
  { id: "creator", name: "Creator District" },
  { id: "street", name: "Marketplace Street" }
];

export default function CityMenu() {
  return (
    <nav className="city-menu">
      <h2>City Menu</h2>
      <ul>
        {DISTRICTS.map((d) => (
          <li key={d.id}>
            <Link to={`/district/${d.id}`}>{d.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

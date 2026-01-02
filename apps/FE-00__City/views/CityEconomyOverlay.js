import { useEffect, useState } from "react";
import { cityEconomy } from "../economy/cityEconomyEngine";

export default function CityEconomyOverlay() {
  const [econ, setEcon] = useState(cityEconomy);

  useEffect(() => {
    cityEconomy.subscribe(e => setEcon({ ...e }));
  }, []);

  const tokens = econ.tokens || {};
  const inflation = econ.inflation || {};

  return (
    <div
      className="city-economy-overlay"
      style={{
        position: "absolute",
        top: "80px",
        right: "20px",
        padding: "12px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        borderRadius: "10px",
        fontSize: "12px",
        width: "260px"
      }}
    >
      <strong>Ekonomia miasta:</strong>
      <div>Cykl: {econ.cycle}</div>
      <ul style={{ margin: "8px 0 0", paddingLeft: "16px" }}>
        {Object.entries(tokens).map(([symbol, data]) => (
          <li key={symbol}>
            {symbol}: cena {data.price.toFixed(2)}, popyt {data.demand}, podaż {data.supply}, inflacja{" "}
            {Math.round((inflation[symbol] || 0) * 100)}%
          </li>
        ))}
      </ul>
    </div>
  );
}
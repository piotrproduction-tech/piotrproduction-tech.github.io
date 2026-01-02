import React, { useEffect, useState } from "react";

let listeners = [];

export function pushCityNotification(notification) {
  listeners.forEach((l) => l(notification));
}

export function CityNotifications() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const listener = (n) => {
      setItems((prev) => {
        const next = [...prev, { ...n, id: Date.now() }];
        return next.slice(-4);
      });
    };
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  if (!items.length) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        zIndex: 9999
      }}
    >
      {items.map((n) => (
        <div
          key={n.id}
          style={{
            minWidth: 260,
            maxWidth: 360,
            padding: "10px 14px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.96)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.06)",
            fontSize: 13,
            color: "#111",
            display: "flex",
            flexDirection: "column",
            gap: 4
          }}
        >
          <div style={{ fontWeight: 600 }}>{n.title || "Miasto"}</div>
          <div>{n.message}</div>
        </div>
      ))}
    </div>
  );
}

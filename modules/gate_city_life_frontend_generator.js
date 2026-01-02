/**
 * FAZA 4C — KROK 2
 * CITY LIFE FRONTEND GENERATOR
 *
 * Tworzy w FE-00__City:
 * - LIFE/CityLifePanel.js
 * - LIFE/CityNotifications.js
 * - MAP/CityMapAnimations.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APPS = path.join(ROOT, "apps");
const FE00 = path.join(APPS, "FE-00__City");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeIfMissing(file, content) {
  ensureDir(path.dirname(file));
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, content);
    console.log("📄 Utworzono:", path.relative(ROOT, file));
  } else {
    console.log("⏭  Istnieje:", path.relative(ROOT, file));
  }
}

console.log("🏙️ FAZA 4C — KROK 2: CITY LIFE FRONTEND START...");

// LIFE/CityNotifications.js
writeIfMissing(
  path.join(FE00, "LIFE", "CityNotifications.js"),
  `import React, { useEffect, useState } from "react";

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
`
);

// MAP/CityMapAnimations.js
writeIfMissing(
  path.join(FE00, "MAP", "CityMapAnimations.js"),
  `import { useEffect, useState } from "react";

let mapSignalListeners = [];

export function emitMapSignal(signal) {
  mapSignalListeners.forEach((l) => l(signal));
}

export function useTileGlow(tileId) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const listener = (signal) => {
      if (signal.tileId === tileId) {
        setActive(true);
        setTimeout(() => setActive(false), 1200);
      }
    };
    mapSignalListeners.push(listener);
    return () => {
      mapSignalListeners = mapSignalListeners.filter((l) => l !== listener);
    };
  }, [tileId]);

  return active;
}
`
);

// LIFE/CityLifePanel.js
writeIfMissing(
  path.join(FE00, "LIFE", "CityLifePanel.js"),
  `import React, { useEffect, useState } from "react";

export function CityLifePanel() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/life/heartbeat")
      .then((res) => res.json())
      .then((data) => setEvents(data || []));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 12 }}>Życie Miasta</h2>
      <div
        style={{
          borderRadius: 16,
          border: "1px solid rgba(0,0,0,0.06)",
          background: "rgba(255,255,255,0.96)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.04)",
          padding: 16,
          maxHeight: 320,
          overflow: "auto"
        }}
      >
        {events.length === 0 && (
          <div style={{ fontSize: 13, color: "#666" }}>
            Miasto jest spokojne. Brak zarejestrowanych zdarzeń.
          </div>
        )}
        {events
          .slice()
          .reverse()
          .map((e, i) => (
            <div
              key={i}
              style={{
                padding: "6px 0",
                borderBottom:
                  i === events.length - 1
                    ? "none"
                    : "1px solid rgba(0,0,0,0.04)",
                fontSize: 13,
                display: "flex",
                justifyContent: "space-between",
                gap: 12
              }}
            >
              <span style={{ color: "#111" }}>{e.type}</span>
              <span style={{ color: "#999" }}>
                {new Date(e.ts).toLocaleTimeString()}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
`
);

console.log("🎉 FAZA 4C — KROK 2: CITY LIFE FRONTEND ZAKOŃCZONY.");

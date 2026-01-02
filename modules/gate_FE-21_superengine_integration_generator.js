const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APPS = path.join(ROOT, "apps");
const FE21 = path.join(APPS, "FE-21__Marketplace");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log("[DIR] created:", dir);
  }
}

function writeFileIfMissing(filePath, content) {
  const dir = path.dirname(filePath);
  ensureDir(dir);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("[FILE] created:", filePath);
  } else {
    console.log("[FILE] exists, skipped:", filePath);
  }
}

// =========================
// SUPERENGINE CLIENT
// =========================

function superEngineClient() {
  return `// FE-21__Marketplace - utils/SuperEngineClient.js
// Klient odbierający eventy z City SuperEngine

class SuperEngineClient {
  constructor() {
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  emit(event) {
    this.listeners.forEach(cb => cb(event));
  }
}

export const superEngineClient = new SuperEngineClient();
`;
}

// =========================
// LIVE EVENT BUS
// =========================

function liveEventBus() {
  return `// FE-21__Marketplace - state/liveEventBus.js
// Event Bus dla FE-21 (Marketplace, Creator, Street)

import { superEngineClient } from "../utils/SuperEngineClient";

let state = {
  lastEvent: null,
  street: {
    events: [],
    seller: null,
    creator: null
  },
  creator: {
    progress: null,
    timeline: []
  }
};

const listeners = [];

export function subscribeLive(callback) {
  listeners.push(callback);
}

function notify() {
  listeners.forEach(cb => cb(state));
}

// Obsługa eventów z City SuperEngine
superEngineClient.subscribe(event => {
  state.lastEvent = event;

  // Marketplace Street
  if (event.type.startsWith("marketplace.")) {
    state.street.events.push(event);
  }

  // Creator Pathway
  if (event.type.startsWith("creator.")) {
    state.creator.timeline.push({
      title: event.type,
      description: JSON.stringify(event.payload),
      date: new Date().toISOString()
    });

    if (event.type === "creator.progress.updated") {
      state.creator.progress = event.payload.progress;
    }
  }

  notify();
});

export function getLiveState() {
  return state;
}
`;
}

// =========================
// HOOK: useSuperEngine
// =========================

function useSuperEngineHook() {
  return `// FE-21__Marketplace - api/useSuperEngine.js

import { useEffect, useState } from "react";
import { subscribeLive, getLiveState } from "../state/liveEventBus";

export function useSuperEngine() {
  const [live, setLive] = useState(getLiveState());

  useEffect(() => {
    subscribeLive(newState => {
      setLive({ ...newState });
    });
  }, []);

  return live;
}
`;
}

// =========================
// INTEGRACJA Z WIDOKAMI
// =========================

function integratedStreetLiveView() {
  return `// FE-21__Marketplace - views/StreetLiveIntegratedView.js

import { useSuperEngine } from "../api/useSuperEngine";
import StreetLiveView from "./StreetLiveView";

export default function StreetLiveIntegratedView() {
  const live = useSuperEngine();
  return <StreetLiveView street={live.street} />;
}
`;
}

function integratedCreatorLiveView() {
  return `// FE-21__Marketplace - views/CreatorLiveIntegratedView.js

import { useSuperEngine } from "../api/useSuperEngine";
import CreatorAdvancedView from "./CreatorAdvancedView";

export default function CreatorLiveIntegratedView() {
  const live = useSuperEngine();
  return <CreatorAdvancedView creator={live.creator} />;
}
`;
}

function integratedDashboardLiveView() {
  return `// FE-21__Marketplace - views/DashboardLiveIntegratedView.js

import { useSuperEngine } from "../api/useSuperEngine";
import DashboardView from "./DashboardView";

export default function DashboardLiveIntegratedView() {
  const live = useSuperEngine();

  const dashboard = {
    stats: {
      totalSales: live.street.events.length,
      totalRevenue: live.street.events.length * 10,
      totalReviews: live.creator.timeline.length,
      reputation: live.creator.progress?.reputation || 0
    },
    activity: live.street.events.map((e, i) => ({ value: i + 1 })),
    transactions: live.street.events.map(e => ({
      title: e.type,
      amount: 10,
      date: new Date().toISOString()
    })),
    reviews: [],
    creatorProgress: live.creator.timeline,
    streetSignals: live.street.events
  };

  return <DashboardView dashboard={dashboard} />;
}
`;
}

function main() {
  console.log("=== FE‑21 ↔ City SuperEngine Integration generator start ===");

  if (!fs.existsSync(FE21)) {
    console.error("[ERROR] FE‑21__Marketplace not found:", FE21);
    process.exit(1);
  }

  // utils
  writeFileIfMissing(
    path.join(FE21, "utils", "SuperEngineClient.js"),
    superEngineClient()
  );

  // state
  writeFileIfMissing(
    path.join(FE21, "state", "liveEventBus.js"),
    liveEventBus()
  );

  // hook
  writeFileIfMissing(
    path.join(FE21, "api", "useSuperEngine.js"),
    useSuperEngineHook()
  );

  // integrated views
  writeFileIfMissing(
    path.join(FE21, "views", "StreetLiveIntegratedView.js"),
    integratedStreetLiveView()
  );

  writeFileIfMissing(
    path.join(FE21, "views", "CreatorLiveIntegratedView.js"),
    integratedCreatorLiveView()
  );

  writeFileIfMissing(
    path.join(FE21, "views", "DashboardLiveIntegratedView.js"),
    integratedDashboardLiveView()
  );

  console.log("=== FE‑21 ↔ City SuperEngine Integration generator done ===");
}

if (require.main === module) {
  main();
}

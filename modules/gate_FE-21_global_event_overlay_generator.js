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
// GLOBAL EVENT OVERLAY COMPONENT
// =========================

function overlayComponent() {
  return `// FE-21__Marketplace - components/GlobalEventOverlay.js

import { useEffect, useState } from "react";
import { subscribeLive } from "../state/liveEventBus";

export default function GlobalEventOverlay() {
  const [visible, setVisible] = useState(false);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    subscribeLive(live => {
      if (live.lastEvent) {
        setEvent(live.lastEvent);
        setVisible(true);

        setTimeout(() => setVisible(false), 3000);
      }
    });
  }, []);

  if (!visible || !event) return null;

  return (
    <div className="global-event-overlay">
      <div className="overlay-box">
        <strong>{event.type}</strong>
        <div>{JSON.stringify(event.payload)}</div>
      </div>
    </div>
  );
}
`;
}

// =========================
// GLOBAL WRAPPER
// =========================

function globalWrapper() {
  return `// FE-21__Marketplace - views/GlobalWrapper.js

import GlobalEventOverlay from "../components/GlobalEventOverlay";

export default function GlobalWrapper({ children }) {
  return (
    <div className="global-wrapper">
      <GlobalEventOverlay />
      {children}
    </div>
  );
}
`;
}

// =========================
// INTEGRACJA Z INDEX.JS
// =========================

function patchedIndex() {
  return `// FE-21__Marketplace - index.js (patched with GlobalWrapper)

import GlobalWrapper from "./views/GlobalWrapper";
import DashboardLiveIntegratedView from "./views/DashboardLiveIntegratedView";

export default function MarketplaceRoot() {
  return (
    <GlobalWrapper>
      <DashboardLiveIntegratedView />
    </GlobalWrapper>
  );
}
`;
}

function main() {
  console.log("=== FE‑21 Global Event Overlay generator start ===");

  if (!fs.existsSync(FE21)) {
    console.error("[ERROR] FE‑21__Marketplace not found:", FE21);
    process.exit(1);
  }

  // components
  writeFileIfMissing(
    path.join(FE21, "components", "GlobalEventOverlay.js"),
    overlayComponent()
  );

  // wrapper
  writeFileIfMissing(
    path.join(FE21, "views", "GlobalWrapper.js"),
    globalWrapper()
  );

  // patched index
  writeFileIfMissing(
    path.join(FE21, "index.js"),
    patchedIndex()
  );

  console.log("=== FE‑21 Global Event Overlay generator done ===");
}

if (require.main === module) {
  main();
}

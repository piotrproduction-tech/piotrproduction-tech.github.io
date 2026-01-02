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
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("[FILE] created:", filePath);
  } else {
    console.log("[FILE] exists, skipped:", filePath);
  }
}

// =========================
// LIVE SIGNALS COMPONENTS
// =========================

function liveSignalPulse() {
  return `// FE-21__Marketplace - components/LiveSignalPulse.js

import { useEffect, useState } from "react";

export default function LiveSignalPulse({ active }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!visible) return null;

  return (
    <div className="live-signal-pulse">
      <div className="pulse-circle" />
    </div>
  );
}
`;
}

function liveEventBubble() {
  return `// FE-21__Marketplace - components/LiveEventBubble.js

import { useEffect, useState } from "react";

export default function LiveEventBubble({ event }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (event) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [event]);

  if (!visible) return null;

  return (
    <div className="live-event-bubble">
      <strong>{event.type}</strong>
      <div>{JSON.stringify(event.payload)}</div>
    </div>
  );
}
`;
}

function liveStorefrontActivity() {
  return `// FE-21__Marketplace - components/LiveStorefrontActivity.js

export default function LiveStorefrontActivity({ activity }) {
  if (!activity) return null;

  return (
    <div className="live-storefront-activity">
      <h4>Storefront Activity</h4>
      {activity.map((a, i) => (
        <div key={i} className="activity-item">
          <strong>{a.action}</strong>
          <div>{a.details}</div>
        </div>
      ))}
    </div>
  );
}
`;
}

function liveCreatorSignal() {
  return `// FE-21__Marketplace - components/LiveCreatorSignal.js

export default function LiveCreatorSignal({ creator }) {
  if (!creator) return null;

  return (
    <div className="live-creator-signal">
      <h4>{creator.name} is active</h4>
      <div>Level: {creator.level}</div>
      <div>Creations: {creator.creations}</div>
    </div>
  );
}
`;
}

// =========================
// LIVE STREET VIEW
// =========================

function streetLiveView() {
  return `// FE-21__Marketplace - views/StreetLiveView.js

import LiveSignalPulse from "../components/LiveSignalPulse";
import LiveEventBubble from "../components/LiveEventBubble";
import LiveStorefrontActivity from "../components/LiveStorefrontActivity";
import LiveCreatorSignal from "../components/LiveCreatorSignal";

export default function StreetLiveView({ live }) {
  if (!live) return null;

  return (
    <div className="street-live-view">
      <LiveSignalPulse active={live.active} />
      <LiveEventBubble event={live.event} />
      <LiveStorefrontActivity activity={live.storefrontActivity} />
      <LiveCreatorSignal creator={live.creator} />
    </div>
  );
}
`;
}

function main() {
  console.log("=== FE-21 Street Live Signals UI generator start ===");

  if (!fs.existsSync(FE21)) {
    console.error("[ERROR] FE-21__Marketplace not found:", FE21);
    process.exit(1);
  }

  const componentsDir = path.join(FE21, "components");
  const viewsDir = path.join(FE21, "views");

  ensureDir(componentsDir);
  ensureDir(viewsDir);

  writeFileIfMissing(path.join(componentsDir, "LiveSignalPulse.js"), liveSignalPulse());
  writeFileIfMissing(path.join(componentsDir, "LiveEventBubble.js"), liveEventBubble());
  writeFileIfMissing(path.join(componentsDir, "LiveStorefrontActivity.js"), liveStorefrontActivity());
  writeFileIfMissing(path.join(componentsDir, "LiveCreatorSignal.js"), liveCreatorSignal());

  writeFileIfMissing(path.join(viewsDir, "StreetLiveView.js"), streetLiveView());

  console.log("=== FE-21 Street Live Signals UI generator done ===");
}

if (require.main === module) {
  main();
}

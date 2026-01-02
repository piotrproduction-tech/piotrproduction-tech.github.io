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
// NARRATION UI COMPONENTS
// =========================

function narrationPanel() {
  return `// FE-21__Marketplace - components/NarrationPanel.js

import Badge from "./Badge";
import RoleTag from "./RoleTag";
import LevelIndicator from "./LevelIndicator";
import CreatorProgress from "./CreatorProgress";
import RTRAAnimation from "./RTRAAnimation";

export default function NarrationPanel({ life }) {
  if (!life) return null;

  const { roles, levels, badges, rewards, rtra, creatorProgress } = life;

  return (
    <div className="narration-panel">
      <h2>Your Marketplace Life</h2>

      <div className="roles">
        {roles?.map((r, i) => <RoleTag key={i} role={r} />)}
      </div>

      <div className="levels">
        {Object.entries(levels || {}).map(([k, v]) => (
          <LevelIndicator key={k} level={v} />
        ))}
      </div>

      <div className="badges">
        {badges?.map((b, i) => <Badge key={i} label={b} />)}
      </div>

      <div className="rewards">
        {rewards?.map((r, i) => <Badge key={i} label={r} />)}
      </div>

      <CreatorProgress progress={creatorProgress} />

      <RTRAAnimation
        reputationDelta={rtra?.reputationDelta}
        tokensDelta={rtra?.tokensDelta}
      />
    </div>
  );
}
`;
}

// =========================
// STREET UI COMPONENTS
// =========================

function streetFeed() {
  return `// FE-21__Marketplace - components/StreetFeed.js

export default function StreetFeed({ events }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="street-feed">
      <h2>Marketplace Street</h2>
      {events.map((e, i) => (
        <div key={i} className="street-event">
          <strong>{e.type}</strong>
          <div>{JSON.stringify(e.payload)}</div>
        </div>
      ))}
    </div>
  );
}
`;
}

function streetStorefront() {
  return `// FE-21__Marketplace - components/StreetStorefront.js

export default function StreetStorefront({ seller }) {
  if (!seller) return null;

  return (
    <div className="street-storefront">
      <h3>{seller.name}'s Storefront</h3>
      <div className="storefront-stats">
        <div>Sales: {seller.sales}</div>
        <div>Reputation: {seller.reputation}</div>
      </div>
      <div className="storefront-items">
        {seller.items?.map((item, i) => (
          <div key={i} className="storefront-item">
            <strong>{item.title}</strong>
            <div>{item.price} tokens</div>
          </div>
        ))}
      </div>
    </div>
  );
}
`;
}

function streetGallery() {
  return `// FE-21__Marketplace - components/StreetGallery.js

export default function StreetGallery({ creator }) {
  if (!creator) return null;

  return (
    <div className="street-gallery">
      <h3>{creator.name}'s Gallery</h3>
      <div className="gallery-items">
        {creator.portfolio?.map((item, i) => (
          <div key={i} className="gallery-item">
            <strong>{item.title}</strong>
            <div>{item.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
`;
}

// =========================
// VIEWS
// =========================

function narrationView() {
  return `// FE-21__Marketplace - views/NarrationView.js

import NarrationPanel from "../components/NarrationPanel";

export default function NarrationView({ life }) {
  return (
    <div className="narration-view">
      <NarrationPanel life={life} />
    </div>
  );
}
`;
}

function streetView() {
  return `// FE-21__Marketplace - views/StreetView.js

import StreetFeed from "../components/StreetFeed";
import StreetStorefront from "../components/StreetStorefront";
import StreetGallery from "../components/StreetGallery";

export default function StreetView({ street }) {
  return (
    <div className="street-view">
      <StreetFeed events={street?.events} />
      <StreetStorefront seller={street?.seller} />
      <StreetGallery creator={street?.creator} />
    </div>
  );
}
`;
}

function main() {
  console.log("=== FE-21 Narration UI + Street UI generator start ===");

  if (!fs.existsSync(FE21)) {
    console.error("[ERROR] FE-21__Marketplace not found:", FE21);
    process.exit(1);
  }

  const componentsDir = path.join(FE21, "components");
  const viewsDir = path.join(FE21, "views");

  ensureDir(componentsDir);
  ensureDir(viewsDir);

  // Narration UI
  writeFileIfMissing(path.join(componentsDir, "NarrationPanel.js"), narrationPanel());

  // Street UI
  writeFileIfMissing(path.join(componentsDir, "StreetFeed.js"), streetFeed());
  writeFileIfMissing(path.join(componentsDir, "StreetStorefront.js"), streetStorefront());
  writeFileIfMissing(path.join(componentsDir, "StreetGallery.js"), streetGallery());

  // Views
  writeFileIfMissing(path.join(viewsDir, "NarrationView.js"), narrationView());
  writeFileIfMissing(path.join(viewsDir, "StreetView.js"), streetView());

  console.log("=== FE-21 Narration UI + Street UI generator done ===");
}

if (require.main === module) {
  main();
}

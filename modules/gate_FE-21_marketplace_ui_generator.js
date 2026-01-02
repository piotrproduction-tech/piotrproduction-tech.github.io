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

function badgeComponent() {
  return `// FE-21__Marketplace - components/Badge.js

export default function Badge({ label }) {
  return (
    <span className="badge">
      {label}
    </span>
  );
}
`;
}

function roleComponent() {
  return `// FE-21__Marketplace - components/RoleTag.js

export default function RoleTag({ role }) {
  return (
    <span className="role-tag">
      {role}
    </span>
  );
}
`;
}

function levelComponent() {
  return `// FE-21__Marketplace - components/LevelIndicator.js

export default function LevelIndicator({ level }) {
  return (
    <div className="level-indicator">
      Level: {level}
    </div>
  );
}
`;
}

function rtraAnimationComponent() {
  return `// FE-21__Marketplace - components/RTRAAnimation.js

import { useEffect, useState } from "react";

export default function RTRAAnimation({ reputationDelta, tokensDelta }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reputationDelta !== 0 || tokensDelta !== 0) {
      setVisible(true);
      setTimeout(() => setVisible(false), 2000);
    }
  }, [reputationDelta, tokensDelta]);

  if (!visible) return null;

  return (
    <div className="rtra-animation">
      {reputationDelta !== 0 && (
        <div className="rep-change">
          Reputation: {reputationDelta > 0 ? "+" : ""}{reputationDelta}
        </div>
      )}
      {tokensDelta !== 0 && (
        <div className="token-change">
          Tokens: {tokensDelta > 0 ? "+" : ""}{tokensDelta}
        </div>
      )}
    </div>
  );
}
`;
}

function creatorProgressComponent() {
  return `// FE-21__Marketplace - components/CreatorProgress.js

export default function CreatorProgress({ progress }) {
  if (!progress) return null;

  return (
    <div className="creator-progress">
      <h3>Creator Level: {progress.level}</h3>
      {progress.badge && <div className="creator-badge">{progress.badge}</div>}
      {progress.nextLevel && (
        <div className="next-level">
          Next: {progress.nextLevel}
        </div>
      )}
    </div>
  );
}
`;
}

function main() {
  console.log("=== FE-21 Marketplace UI generator start ===");

  if (!fs.existsSync(FE21)) {
    console.error("[ERROR] FE-21__Marketplace not found:", FE21);
    process.exit(1);
  }

  const componentsDir = path.join(FE21, "components");
  ensureDir(componentsDir);

  writeFileIfMissing(path.join(componentsDir, "Badge.js"), badgeComponent());
  writeFileIfMissing(path.join(componentsDir, "RoleTag.js"), roleComponent());
  writeFileIfMissing(path.join(componentsDir, "LevelIndicator.js"), levelComponent());
  writeFileIfMissing(path.join(componentsDir, "RTRAAnimation.js"), rtraAnimationComponent());
  writeFileIfMissing(path.join(componentsDir, "CreatorProgress.js"), creatorProgressComponent());

  console.log("=== FE-21 Marketplace UI generator done ===");
}

if (require.main === module) {
  main();
}

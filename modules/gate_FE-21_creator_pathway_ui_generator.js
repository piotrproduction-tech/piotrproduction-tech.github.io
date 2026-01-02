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
// COMPONENTS
// =========================

function creatorProfile() {
  return `// FE-21__Marketplace - components/CreatorProfile.js

export default function CreatorProfile({ creator }) {
  if (!creator) return null;

  return (
    <div className="creator-profile">
      <h2>{creator.name}</h2>
      <div className="creator-meta">
        <div>Level: {creator.level}</div>
        <div>Reputation: {creator.reputation}</div>
        <div>Creations: {creator.creations}</div>
      </div>
    </div>
  );
}
`;
}

function creatorPortfolio() {
  return `// FE-21__Marketplace - components/CreatorPortfolio.js

export default function CreatorPortfolio({ portfolio }) {
  if (!portfolio) return null;

  return (
    <div className="creator-portfolio">
      <h3>Portfolio</h3>
      <div className="portfolio-grid">
        {portfolio.map((item, i) => (
          <div key={i} className="portfolio-item">
            <strong>{item.title}</strong>
            <div>{item.type}</div>
            <div>{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
`;
}

function creatorAchievements() {
  return `// FE-21__Marketplace - components/CreatorAchievements.js

export default function CreatorAchievements({ achievements }) {
  if (!achievements) return null;

  return (
    <div className="creator-achievements">
      <h3>Achievements</h3>
      <ul>
        {achievements.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </div>
  );
}
`;
}

function creatorLevels() {
  return `// FE-21__Marketplace - components/CreatorLevels.js

export default function CreatorLevels({ progress }) {
  if (!progress) return null;

  return (
    <div className="creator-levels">
      <h3>Creator Level</h3>
      <div>Current: {progress.level}</div>
      {progress.badge && <div>Badge: {progress.badge}</div>}
      {progress.nextLevel && <div>Next: {progress.nextLevel}</div>}
    </div>
  );
}
`;
}

function creatorTimeline() {
  return `// FE-21__Marketplace - components/CreatorTimeline.js

export default function CreatorTimeline({ timeline }) {
  if (!timeline) return null;

  return (
    <div className="creator-timeline">
      <h3>Creator Timeline</h3>
      <ul>
        {timeline.map((event, i) => (
          <li key={i}>
            <strong>{event.title}</strong> — {event.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
`;
}

// =========================
// VIEW
// =========================

function creatorView() {
  return `// FE-21__Marketplace - views/CreatorView.js

import CreatorProfile from "../components/CreatorProfile";
import CreatorPortfolio from "../components/CreatorPortfolio";
import CreatorAchievements from "../components/CreatorAchievements";
import CreatorLevels from "../components/CreatorLevels";
import CreatorTimeline from "../components/CreatorTimeline";

export default function CreatorView({ creator }) {
  if (!creator) return null;

  return (
    <div className="creator-view">
      <CreatorProfile creator={creator} />
      <CreatorLevels progress={creator.progress} />
      <CreatorPortfolio portfolio={creator.portfolio} />
      <CreatorAchievements achievements={creator.achievements} />
      <CreatorTimeline timeline={creator.timeline} />
    </div>
  );
}
`;
}

function main() {
  console.log("=== FE-21 Creator Pathway UI generator start ===");

  if (!fs.existsSync(FE21)) {
    console.error("[ERROR] FE-21__Marketplace not found:", FE21);
    process.exit(1);
  }

  const componentsDir = path.join(FE21, "components");
  const viewsDir = path.join(FE21, "views");

  ensureDir(componentsDir);
  ensureDir(viewsDir);

  writeFileIfMissing(path.join(componentsDir, "CreatorProfile.js"), creatorProfile());
  writeFileIfMissing(path.join(componentsDir, "CreatorPortfolio.js"), creatorPortfolio());
  writeFileIfMissing(path.join(componentsDir, "CreatorAchievements.js"), creatorAchievements());
  writeFileIfMissing(path.join(componentsDir, "CreatorLevels.js"), creatorLevels());
  writeFileIfMissing(path.join(componentsDir, "CreatorTimeline.js"), creatorTimeline());

  writeFileIfMissing(path.join(viewsDir, "CreatorView.js"), creatorView());

  console.log("=== FE-21 Creator Pathway UI generator done ===");
}

if (require.main === module) {
  main();
}

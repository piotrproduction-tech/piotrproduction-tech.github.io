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
// ADVANCED COMPONENTS
// =========================

function creatorShowcase() {
  return `// FE-21__Marketplace - components/CreatorShowcase.js

export default function CreatorShowcase({ showcase }) {
  if (!showcase) return null;

  return (
    <div className="creator-showcase">
      <h3>Showcase</h3>
      <div className="showcase-grid">
        {showcase.map((item, i) => (
          <div key={i} className="showcase-item">
            <img src={item.thumbnail} alt={item.title} className="showcase-thumb" />
            <div className="showcase-title">{item.title}</div>
            <div className="showcase-type">{item.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
`;
}

function creatorAchievementsGrid() {
  return `// FE-21__Marketplace - components/CreatorAchievementsGrid.js

export default function CreatorAchievementsGrid({ achievements }) {
  if (!achievements) return null;

  return (
    <div className="creator-achievements-grid">
      <h3>Achievements</h3>
      <div className="achievements-grid">
        {achievements.map((a, i) => (
          <div key={i} className="achievement-card">
            <div className="achievement-icon">{a.icon}</div>
            <div className="achievement-title">{a.title}</div>
            <div className="achievement-desc">{a.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
`;
}

function creatorLevelLadder() {
  return `// FE-21__Marketplace - components/CreatorLevelLadder.js

export default function CreatorLevelLadder({ ladder }) {
  if (!ladder) return null;

  return (
    <div className="creator-level-ladder">
      <h3>Level Ladder</h3>
      <ul>
        {ladder.map((step, i) => (
          <li key={i} className={step.completed ? "completed" : ""}>
            <strong>{step.level}</strong> — {step.requirement}
          </li>
        ))}
      </ul>
    </div>
  );
}
`;
}

function creatorFestivalPanel() {
  return `// FE-21__Marketplace - components/CreatorFestivalPanel.js

export default function CreatorFestivalPanel({ festival }) {
  if (!festival) return null;

  return (
    <div className="creator-festival-panel">
      <h3>Festival Hub</h3>
      <ul>
        {festival.map((f, i) => (
          <li key={i}>
            <strong>{f.project}</strong> — {f.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
`;
}

function creatorTimelineAdvanced() {
  return `// FE-21__Marketplace - components/CreatorTimelineAdvanced.js

export default function CreatorTimelineAdvanced({ timeline }) {
  if (!timeline) return null;

  return (
    <div className="creator-timeline-advanced">
      <h3>Creator Timeline</h3>
      <div className="timeline">
        {timeline.map((event, i) => (
          <div key={i} className="timeline-event">
            <div className="timeline-icon">{event.icon}</div>
            <div className="timeline-content">
              <strong>{event.title}</strong>
              <div>{event.description}</div>
              <div className="timeline-date">{event.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`;
}

function creatorStatsPanel() {
  return `// FE-21__Marketplace - components/CreatorStatsPanel.js

export default function CreatorStatsPanel({ stats }) {
  if (!stats) return null;

  return (
    <div className="creator-stats-panel">
      <h3>Creator Stats</h3>
      <div className="stats-grid">
        <div className="stat-box">
          <strong>Creations</strong>
          <div>{stats.creations}</div>
        </div>
        <div className="stat-box">
          <strong>Sales</strong>
          <div>{stats.sales}</div>
        </div>
        <div className="stat-box">
          <strong>Reputation</strong>
          <div>{stats.reputation}</div>
        </div>
        <div className="stat-box">
          <strong>Festival Entries</strong>
          <div>{stats.festivalEntries}</div>
        </div>
      </div>
    </div>
  );
}
`;
}

// =========================
// ADVANCED VIEW
// =========================

function creatorAdvancedView() {
  return `// FE-21__Marketplace - views/CreatorAdvancedView.js

import CreatorShowcase from "../components/CreatorShowcase";
import CreatorAchievementsGrid from "../components/CreatorAchievementsGrid";
import CreatorLevelLadder from "../components/CreatorLevelLadder";
import CreatorFestivalPanel from "../components/CreatorFestivalPanel";
import CreatorTimelineAdvanced from "../components/CreatorTimelineAdvanced";
import CreatorStatsPanel from "../components/CreatorStatsPanel";

export default function CreatorAdvancedView({ creator }) {
  if (!creator) return null;

  return (
    <div className="creator-advanced-view">
      <CreatorStatsPanel stats={creator.stats} />
      <CreatorShowcase showcase={creator.showcase} />
      <CreatorAchievementsGrid achievements={creator.achievements} />
      <CreatorLevelLadder ladder={creator.ladder} />
      <CreatorFestivalPanel festival={creator.festival} />
      <CreatorTimelineAdvanced timeline={creator.timeline} />
    </div>
  );
}
`;
}

function main() {
  console.log("=== FE-21 Creator Pathway Advanced UI generator start ===");

  if (!fs.existsSync(FE21)) {
    console.error("[ERROR] FE-21__Marketplace not found:", FE21);
    process.exit(1);
  }

  const componentsDir = path.join(FE21, "components");
  const viewsDir = path.join(FE21, "views");

  ensureDir(componentsDir);
  ensureDir(viewsDir);

  writeFileIfMissing(path.join(componentsDir, "CreatorShowcase.js"), creatorShowcase());
  writeFileIfMissing(path.join(componentsDir, "CreatorAchievementsGrid.js"), creatorAchievementsGrid());
  writeFileIfMissing(path.join(componentsDir, "CreatorLevelLadder.js"), creatorLevelLadder());
  writeFileIfMissing(path.join(componentsDir, "CreatorFestivalPanel.js"), creatorFestivalPanel());
  writeFileIfMissing(path.join(componentsDir, "CreatorTimelineAdvanced.js"), creatorTimelineAdvanced());
  writeFileIfMissing(path.join(componentsDir, "CreatorStatsPanel.js"), creatorStatsPanel());

  writeFileIfMissing(path.join(viewsDir, "CreatorAdvancedView.js"), creatorAdvancedView());

  console.log("=== FE-21 Creator Pathway Advanced UI generator done ===");
}

if (require.main === module) {
  main();
}

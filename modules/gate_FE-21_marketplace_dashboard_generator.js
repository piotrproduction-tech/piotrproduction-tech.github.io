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
// DASHBOARD COMPONENTS
// =========================

function statsOverview() {
  return `// FE-21__Marketplace - components/DashboardStatsOverview.js

export default function DashboardStatsOverview({ stats }) {
  if (!stats) return null;

  return (
    <div className="dashboard-stats-overview">
      <h2>Marketplace Overview</h2>
      <div className="stats-grid">
        <div className="stat-box">
          <strong>Total Sales</strong>
          <div>{stats.totalSales}</div>
        </div>
        <div className="stat-box">
          <strong>Total Revenue</strong>
          <div>{stats.totalRevenue}</div>
        </div>
        <div className="stat-box">
          <strong>Reviews</strong>
          <div>{stats.totalReviews}</div>
        </div>
        <div className="stat-box">
          <strong>Reputation</strong>
          <div>{stats.reputation}</div>
        </div>
      </div>
    </div>
  );
}
`;
}

function activityChart() {
  return `// FE-21__Marketplace - components/DashboardActivityChart.js

export default function DashboardActivityChart({ activity }) {
  if (!activity) return null;

  return (
    <div className="dashboard-activity-chart">
      <h3>Activity Chart</h3>
      <div className="chart-placeholder">
        {/* Placeholder for chart library */}
        {activity.map((point, i) => (
          <div key={i} className="chart-point">
            {point.value}
          </div>
        ))}
      </div>
    </div>
  );
}
`;
}

function transactionHistory() {
  return `// FE-21__Marketplace - components/DashboardTransactionHistory.js

export default function DashboardTransactionHistory({ transactions }) {
  if (!transactions) return null;

  return (
    <div className="dashboard-transaction-history">
      <h3>Transaction History</h3>
      <ul>
        {transactions.map((t, i) => (
          <li key={i}>
            <strong>{t.title}</strong> — {t.amount} tokens ({t.date})
          </li>
        ))}
      </ul>
    </div>
  );
}
`;
}

function reviewHistory() {
  return `// FE-21__Marketplace - components/DashboardReviewHistory.js

export default function DashboardReviewHistory({ reviews }) {
  if (!reviews) return null;

  return (
    <div className="dashboard-review-history">
      <h3>Review History</h3>
      <ul>
        {reviews.map((r, i) => (
          <li key={i}>
            <strong>{r.reviewer}</strong>: {r.rating}/5 — "{r.comment}"
          </li>
        ))}
      </ul>
    </div>
  );
}
`;
}

function creatorProgressHistory() {
  return `// FE-21__Marketplace - components/DashboardCreatorProgressHistory.js

export default function DashboardCreatorProgressHistory({ progress }) {
  if (!progress) return null;

  return (
    <div className="dashboard-creator-progress-history">
      <h3>Creator Progress</h3>
      <ul>
        {progress.map((p, i) => (
          <li key={i}>
            <strong>{p.level}</strong> — {p.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
`;
}

function streetSignalHistory() {
  return `// FE-21__Marketplace - components/DashboardStreetSignalHistory.js

export default function DashboardStreetSignalHistory({ signals }) {
  if (!signals) return null;

  return (
    <div className="dashboard-street-signal-history">
      <h3>Street Signals</h3>
      <ul>
        {signals.map((s, i) => (
          <li key={i}>
            <strong>{s.type}</strong> — {s.description} ({s.date})
          </li>
        ))}
      </ul>
    </div>
  );
}
`;
}

// =========================
// DASHBOARD VIEW
// =========================

function dashboardView() {
  return `// FE-21__Marketplace - views/DashboardView.js

import DashboardStatsOverview from "../components/DashboardStatsOverview";
import DashboardActivityChart from "../components/DashboardActivityChart";
import DashboardTransactionHistory from "../components/DashboardTransactionHistory";
import DashboardReviewHistory from "../components/DashboardReviewHistory";
import DashboardCreatorProgressHistory from "../components/DashboardCreatorProgressHistory";
import DashboardStreetSignalHistory from "../components/DashboardStreetSignalHistory";

export default function DashboardView({ dashboard }) {
  if (!dashboard) return null;

  return (
    <div className="dashboard-view">
      <DashboardStatsOverview stats={dashboard.stats} />
      <DashboardActivityChart activity={dashboard.activity} />
      <DashboardTransactionHistory transactions={dashboard.transactions} />
      <DashboardReviewHistory reviews={dashboard.reviews} />
      <DashboardCreatorProgressHistory progress={dashboard.creatorProgress} />
      <DashboardStreetSignalHistory signals={dashboard.streetSignals} />
    </div>
  );
}
`;
}

function main() {
  console.log("=== FE-21 Marketplace Dashboard generator start ===");

  if (!fs.existsSync(FE21)) {
    console.error("[ERROR] FE-21__Marketplace not found:", FE21);
    process.exit(1);
  }

  const componentsDir = path.join(FE21, "components");
  const viewsDir = path.join(FE21, "views");

  ensureDir(componentsDir);
  ensureDir(viewsDir);

  writeFileIfMissing(path.join(componentsDir, "DashboardStatsOverview.js"), statsOverview());
  writeFileIfMissing(path.join(componentsDir, "DashboardActivityChart.js"), activityChart());
  writeFileIfMissing(path.join(componentsDir, "DashboardTransactionHistory.js"), transactionHistory());
  writeFileIfMissing(path.join(componentsDir, "DashboardReviewHistory.js"), reviewHistory());
  writeFileIfMissing(path.join(componentsDir, "DashboardCreatorProgressHistory.js"), creatorProgressHistory());
  writeFileIfMissing(path.join(componentsDir, "DashboardStreetSignalHistory.js"), streetSignalHistory());

  writeFileIfMissing(path.join(viewsDir, "DashboardView.js"), dashboardView());

  console.log("=== FE-21 Marketplace Dashboard generator done ===");
}

if (require.main === module) {
  main();
}

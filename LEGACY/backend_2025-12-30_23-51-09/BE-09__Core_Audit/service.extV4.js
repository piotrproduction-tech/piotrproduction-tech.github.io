// backend/BE-09/service.extV4.js

let AUDIT_LOGS = Array.isArray(AUDIT_LOGS) ? AUDIT_LOGS : [];

function now() { return new Date().toISOString(); }

// ===== Trendy =====
export function Audit_trendReport(days) {
  const counts = {};
  AUDIT_LOGS.forEach(l => {
    const day = l.timestamp.substring(0, 10);
    counts[day] = (counts[day] || 0) + 1;
  });

  const keys = Object.keys(counts).sort();
  const trend = [];

  for (let i = 1; i < keys.length; i++) {
    const diff = counts[keys[i]] - counts[keys[i - 1]];
    trend.push({ day: keys[i], change: diff });
  }

  return trend.slice(-days);
}

// ===== Dashboard =====
export function Audit_dashboardData() {
  const counts = {};
  AUDIT_LOGS.forEach(l => {
    const day = l.timestamp.substring(0, 10);
    counts[day] = (counts[day] || 0) + 1;
  });

  return Object.keys(counts).map(day => ({
    day,
    count: counts[day]
  }));
}

// ===== Eksport PDF =====
export function Audit_exportPDFPlaceholder(title) {
  const content =
    "=== " + title + " ===\nGenerated at " + now() +
    "\n\nAudit Service report placeholder.";
  return { ok: true, content };
}

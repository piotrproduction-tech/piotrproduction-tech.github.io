// backend/BE-09/service.extV3.js

let AUDIT_LOGS = Array.isArray(AUDIT_LOGS) ? AUDIT_LOGS : [];

function now() { return new Date().toISOString(); }

// ===== Filtrowanie zaawansowane =====
export function Audit_filter(params) {
  return AUDIT_LOGS.filter(l => {
    let ok = true;
    if (params.actor) ok = ok && l.actor === params.actor;
    if (params.action) ok = ok && l.action === params.action;
    if (params.dateFrom) ok = ok && new Date(l.timestamp) >= new Date(params.dateFrom);
    if (params.dateTo) ok = ok && new Date(l.timestamp) <= new Date(params.dateTo);
    return ok;
  });
}

// ===== Grupowanie =====
export function Audit_groupBy(field) {
  const groups = {};
  AUDIT_LOGS.forEach(l => {
    const key = l[field] || "n/a";
    if (!groups[key]) groups[key] = [];
    groups[key].push(l);
  });
  return groups;
}

// ===== Eksport CSV =====
export function Audit_exportCSV(params) {
  const logs = Audit_filter(params || {});
  const header = ["timestamp", "action", "actor"];
  const rows = [header].concat(
    logs.map(l => [l.timestamp, l.action, l.actor])
  );
  const csv = rows.map(r => r.join(",")).join("\n");
  return { ok: true, csv };
}

// ===== Raport dzienny =====
export function Audit_dailyReport(dateISO) {
  const logs = AUDIT_LOGS.filter(l => l.timestamp.startsWith(dateISO));
  const actions = {};
  logs.forEach(l => actions[l.action] = (actions[l.action] || 0) + 1);
  return { date: dateISO, total: logs.length, actions };
}

// ===== Raport tygodniowy =====
export function Audit_weeklyReport(startISO) {
  const start = new Date(startISO);
  const end = new Date(start); end.setDate(start.getDate() + 7);

  const logs = AUDIT_LOGS.filter(l => {
    const d = new Date(l.timestamp);
    return d >= start && d < end;
  });

  const actions = {};
  logs.forEach(l => actions[l.action] = (actions[l.action] || 0) + 1);

  return { start: startISO, end: end.toISOString(), total: logs.length, actions };
}

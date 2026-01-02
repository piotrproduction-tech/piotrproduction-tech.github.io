// backend/BE-09/service.js

let AUDIT_LOGS = Array.isArray(AUDIT_LOGS) ? AUDIT_LOGS : [];

function now() { return new Date().toISOString(); }

// ===== Logowanie akcji =====
export function Audit_logAction(action, actor) {
  const entry = {
    id: "log_" + Date.now(),
    action,
    actor: actor || "system",
    timestamp: now()
  };
  AUDIT_LOGS.push(entry);
  return entry;
}

// ===== Pobranie wszystkich logów =====
export function Audit_getLogs() {
  return AUDIT_LOGS;
}

// ===== Filtrowanie podstawowe =====
export function Audit_filterByActor(actor) {
  return AUDIT_LOGS.filter(l => l.actor === actor);
}

export function Audit_filterByAction(action) {
  return AUDIT_LOGS.filter(l => l.action === action);
}

// ===== Czyszczenie logów =====
export function Audit_clearLogs(actor) {
  const cleared = AUDIT_LOGS.length;
  AUDIT_LOGS = [];
  Audit_logAction("clearAudit", actor || "admin");
  return { cleared };
}

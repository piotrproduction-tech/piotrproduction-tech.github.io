// ==== Podstawowe budżety ====
export function Budget_getAccounts() {
  return [
    { id: "acc_01", name: "Budżet Festiwalu", balance: 20000 },
    { id: "acc_02", name: "Budżet Edukacyjny", balance: 15000 }
  ];
}

export function Budget_createAccount(userId, name, initialBalance) {
  const account = { id: "acc_" + Date.now(), userId, name, balance: initialBalance };
  return { ok: true, account };
}

// ==== Transakcje i rozliczenia ====
export function Budget_addTransaction(accountId, amount, description) {
  const tx = { id: "tx_" + Date.now(), accountId, amount, description, ts: new Date().toISOString() };
  return { ok: true, tx };
}

export function Budget_getTransactions(accountId) {
  return [
    { id: "tx_01", accountId, amount: -500, description: "Opłata techniczna" },
    { id: "tx_02", accountId, amount: 2000, description: "Grant edukacyjny" }
  ];
}

// ==== Integracja z Grants Office ====
export function Budget_linkGrant(accountId, grantId) {
  return { ok: true, accountId, grantId };
}

// ==== Raporty i transparentność (v2) ====
export function Budget_getReports() {
  return [
    { id: "rep_budget_01", title: "Raport budżetowy grudzień 2025", summary: "Saldo końcowe 35 000 PLN" },
    { id: "rep_budget_02", title: "Raport budżetowy styczeń 2026", summary: "Saldo końcowe 40 000 PLN" }
  ];
}

// ==== Audyt i bezpieczeństwo ====
export function Budget_getAuditLogs() {
  return [
    { id: "audit_01", action: "Dodano konto", ts: "2025-12-01T12:00:00Z" },
    { id: "audit_02", action: "Powiązano grant", ts: "2025-12-05T14:00:00Z" }
  ];
}

export function Budget_archiveAccount(accountId) {
  return { ok: true, accountId, archived: true };
}

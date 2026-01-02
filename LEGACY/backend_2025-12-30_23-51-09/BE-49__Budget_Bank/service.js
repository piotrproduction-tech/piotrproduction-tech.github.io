// backend/BE-49/service.js

// ===== Budżety =====
export function Budget_addBudget(title, description, amount) {
  const budget = { id: "budget_" + Date.now(), title, description, amount, status: "open" };
  return { ok: true, budget };
}

export function Budget_getBudgets() {
  return [
    { id: "budget_01", title: "Budżet Festiwalu VR", description: "Finansowanie wydarzenia", amount: 10000, status: "open" },
    { id: "budget_02", title: "DAO Kultura", description: "Wsparcie inicjatyw kulturalnych", amount: 5000, status: "closed" }
  ];
}

// ===== Transakcje =====
export function Budget_addTransaction(budgetId, userId, amount, type) {
  const transaction = { id: "budget_tx_" + Date.now(), budgetId, userId, amount, type };
  return { ok: true, transaction };
}

export function Budget_getTransactions(budgetId) {
  return [
    { id: "budget_tx_01", budgetId, userId: "u_01", amount: 200, type: "deposit" },
    { id: "budget_tx_02", budgetId, userId: "u_02", amount: 150, type: "withdrawal" }
  ];
}

// ===== Raporty =====
export function Budget_getReports() {
  return [
    { id: "rep_budget_01", title: "Raport Budget Bank wrzesień 2026", summary: "2 budżety, 5 transakcji" },
    { id: "rep_budget_02", title: "Raport Budget Bank październik 2026", summary: "3 budżety, 8 transakcji" }
  ];
}

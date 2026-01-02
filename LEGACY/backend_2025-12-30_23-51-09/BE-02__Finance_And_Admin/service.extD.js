// backend/BE-02/service.extD.js

import { BudgetBank_getTransactions } from "./service.js";

// ===== Dashboard dzienny =====

export function BudgetBank_dashboardData() {
  const data = {};

  BudgetBank_getTransactions().forEach(t => {
    const day = new Date(t.createdAt).toISOString().split("T")[0];
    data[day] = (data[day] || 0) + t.amount;
  });

  return Object.keys(data).map(day => ({
    day,
    total: data[day]
  }));
}

// ===== Audyt z polityką =====

export function BudgetBank_auditWithPolicy(txId, role, action) {
  const tx = BudgetBank_getTransactions().find(t => t.id === txId);
  if (!tx) return { error: "Transaction not found" };

  const allowed = true; // placeholder

  tx.policyCheck = {
    role,
    action,
    allowed,
    checkedAt: new Date().toISOString()
  };

  return tx;
}

// ===== Trendy =====

export function BudgetBank_trendReport(days) {
  const data = BudgetBank_dashboardData();
  const trend = [];

  for (let i = 1; i < data.length; i++) {
    const diff = data[i].total - data[i - 1].total;
    trend.push({
      day: data[i].day,
      change: diff
    });
  }

  return trend.slice(-days);
}

// ===== Eksport PDF (placeholder) =====

export function BudgetBank_exportPDFPlaceholder(title) {
  return (
    "=== " +
    title +
    " ===\nGenerated at " +
    new Date().toISOString() +
    "\n\nFinancial report placeholder."
  );
}

// backend/BE-02/service.extC.js

import { BudgetBank_getTransactions } from "./service.js";

let GRANTS = []; // lokalne rozszerzenie

// ===== Raporty miesięczne =====

export function BudgetBank_summaryByMonth(year) {
  const summary = {};

  BudgetBank_getTransactions().forEach(t => {
    const d = new Date(t.createdAt);
    if (d.getFullYear() === year) {
      const m = d.getMonth() + 1;
      summary[m] = (summary[m] || 0) + t.amount;
    }
  });

  return summary;
}

// ===== Powiązanie transakcji z grantem =====

export function BudgetBank_linkGrant(txId, grantId) {
  const tx = BudgetBank_getTransactions().find(t => t.id === txId);
  if (!tx) return { error: "Transaction not found" };

  tx.grantId = grantId;
  tx.updatedAt = new Date().toISOString();

  return tx;
}

// ===== Audyt transakcji =====

export function BudgetBank_auditTransaction(txId, status, note) {
  const tx = BudgetBank_getTransactions().find(t => t.id === txId);
  if (!tx) return { error: "Transaction not found" };

  tx.audit = {
    status,
    note,
    auditedAt: new Date().toISOString()
  };

  return tx;
}

// ===== Plan wieloletni =====

export function BudgetBank_multiYearPlan(years) {
  return years.map(y => ({
    year: y,
    summary: BudgetBank_summaryByMonth(y)
  }));
}

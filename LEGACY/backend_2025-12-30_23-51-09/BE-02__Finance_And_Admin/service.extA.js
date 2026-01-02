// backend/BE-02/service.extA.js

// Dane współdzielone z service.js
import {
  BudgetBank_getTransactions,
  BudgetBank_calculateBalance
} from "./service.js";

// Lokalne struktury danych
let BUDGET_PERIODS = [];
let TREASURE_CLAIMS = [];

// ===== Helpers =====

function BE02_todayISO() {
  return new Date().toISOString();
}

// ===== Budget Bank — filtrowanie i paginacja =====

export function BudgetBank_filter(params) {
  const page = Number(params.page || 1);
  const size = Number(params.pageSize || 20);

  const filtered = BudgetBank_getTransactions().filter(t => {
    let ok = true;
    if (params.type) ok = ok && t.type === params.type;
    if (params.actor) ok = ok && t.actor === params.actor;
    if (params.dateFrom) ok = ok && new Date(t.createdAt) >= new Date(params.dateFrom);
    if (params.dateTo) ok = ok && new Date(t.createdAt) <= new Date(params.dateTo);
    return ok;
  });

  const total = filtered.length;
  const start = (page - 1) * size;
  const end = Math.min(start + size, total);

  return {
    total,
    page,
    pageSize: size,
    items: filtered.slice(start, end)
  };
}

export function BudgetBank_exportCSV(params) {
  const data = BudgetBank_filter(params).items;
  const header = ["id", "amount", "type", "createdAt", "actor"];
  const rows = [header].concat(
    data.map(t => [
      t.id,
      t.amount,
      t.type || "",
      t.createdAt || "",
      t.actor || ""
    ])
  );

  const csv = rows.map(r => r.join(",")).join("\n");
  return csv;
}

// ===== Budget Bank — zamykanie okresów =====

export function BudgetBank_closePeriod(label) {
  const balance = BudgetBank_calculateBalance();
  const period = {
    id: "per_" + Date.now(),
    label,
    closedAt: BE02_todayISO(),
    balance
  };
  BUDGET_PERIODS.push(period);
  return period;
}

export function BudgetBank_getPeriods() {
  return BUDGET_PERIODS;
}

// ===== Treasure Vault — statusy i claimy =====

export function TreasureVault_setStatus(rewardId, status) {
  return { ok: true, rewardId, status };
}

export function TreasureVault_claim(rewardId, user) {
  const claim = {
    id: "clm_" + Date.now(),
    rewardId,
    user,
    claimedAt: BE02_todayISO()
  };
  TREASURE_CLAIMS.push(claim);
  return claim;
}

export function TreasureVault_getClaims() {
  return TREASURE_CLAIMS;
}

// backend/BE-02/service.js

// Dane w pamięci (placeholder)
let BUDGET_TRANSACTIONS = [];
let TREASURE_REWARDS = [];
let ADMIN_ROLES = [];
let GRANTS = [];

// ===== Budget Bank =====

export function BudgetBank_getTransactions() {
  return BUDGET_TRANSACTIONS;
}

export function BudgetBank_addTransaction(amount, type, actor) {
  const tx = {
    id: "txn_" + Date.now(),
    amount,
    type: type || "general",
    actor: actor || "system",
    createdAt: new Date().toISOString()
  };
  BUDGET_TRANSACTIONS.push(tx);
  return tx;
}

export function BudgetBank_calculateBalance() {
  return BUDGET_TRANSACTIONS.reduce((sum, t) => sum + t.amount, 0);
}

// ===== Treasure Vault =====

export function TreasureVault_getRewards() {
  return TREASURE_REWARDS;
}

export function TreasureVault_addReward(title, value, actor) {
  const reward = {
    id: "rew_" + Date.now(),
    title,
    value,
    actor: actor || "system",
    createdAt: new Date().toISOString()
  };
  TREASURE_REWARDS.push(reward);
  return reward;
}

// ===== Admin Tower =====

export function AdminTower_getRoles() {
  return ADMIN_ROLES;
}

export function AdminTower_assignRole(user, role, actor) {
  const assignment = {
    id: "role_" + Date.now(),
    user,
    role,
    actor: actor || "admin",
    createdAt: new Date().toISOString()
  };
  ADMIN_ROLES.push(assignment);
  return assignment;
}

// ===== Grants Office =====

export function GrantsOffice_getGrants() {
  return GRANTS;
}

export function GrantsOffice_updateStatus(applicant, status, actor) {
  const grant = {
    id: "grt_" + Date.now(),
    applicant,
    status,
    actor: actor || "admin",
    createdAt: new Date().toISOString()
  };
  GRANTS.push(grant);
  return grant;
}

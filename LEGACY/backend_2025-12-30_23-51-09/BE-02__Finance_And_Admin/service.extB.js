// backend/BE-02/service.extB.js

import {
  BudgetBank_addTransaction,
  AdminTower_assignRole
} from "./service.js";

// ===== Walidacja transakcji =====

export function BudgetBank_validateTransaction(tx) {
  const errors = [];
  if (typeof tx.amount !== "number") errors.push("amount must be number");
  if (!tx.type) errors.push("type required");
  return { valid: errors.length === 0, errors };
}

export function BudgetBank_addTransaction_safe(amount, type, actor) {
  const tx = { amount, type };
  const v = BudgetBank_validateTransaction(tx);
  if (!v.valid) return { error: v.errors };
  return BudgetBank_addTransaction(amount, type, actor);
}

// ===== Grants Office — workflow etapów =====

let GRANTS = []; // lokalne rozszerzenie workflow

export function GrantsOffice_setWorkflow(grantId, status, reviewer, note, actor) {
  const allowed = ["received", "review", "approved", "rejected"];

  if (!allowed.includes(status)) return { error: "Invalid status" };

  const idx = GRANTS.findIndex(g => g.id === grantId);
  if (idx < 0) return { error: "Not found" };

  GRANTS[idx].status = status;
  GRANTS[idx].reviewer = reviewer || GRANTS[idx].reviewer || null;
  GRANTS[idx].note = note || "";
  GRANTS[idx].updatedAt = new Date().toISOString();

  return GRANTS[idx];
}

export function GrantsOffice_registerGrant(grant) {
  GRANTS.push(grant);
  return grant;
}

export function GrantsOffice_getAllWorkflow() {
  return GRANTS;
}

// ===== Admin Tower — bulk assign + expirations =====

let ADMIN_ROLES = [];

export function AdminTower_bulkAssign(assignments, actor) {
  const results = assignments.map(a =>
    AdminTower_assignRole(a.user, a.role, actor)
  );
  return results;
}

export function AdminTower_setRoleExpiry(user, expiryISO, actor) {
  const idx = ADMIN_ROLES.findIndex(r => r.user === user);
  if (idx < 0) return { error: "Not found" };

  ADMIN_ROLES[idx].expiry = expiryISO;
  ADMIN_ROLES[idx].updatedAt = new Date().toISOString();

  return ADMIN_ROLES[idx];
}

export function AdminTower_registerRole(role) {
  ADMIN_ROLES.push(role);
  return role;
}

export function AdminTower_getAllRoles() {
  return ADMIN_ROLES;
}

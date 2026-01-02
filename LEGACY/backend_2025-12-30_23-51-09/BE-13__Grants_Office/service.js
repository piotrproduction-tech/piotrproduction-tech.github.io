// backend/BE-13/service.js

// In-memory storage (can be replaced by DB later)
let CONFIG_FLAGS = [];
let ID_SEQUENCES = {};

function now() {
  return new Date().toISOString();
}

// ===== ID Generator (simple) =====
export function Config_generateID(prefix) {
  // Simple random ID (core v2)
  const id = `${prefix}_${Math.floor(Math.random() * 1000000)}`;
  return id;
}

// ===== Flags (basic) =====
export function Config_setFlag(key, value, actor) {
  const flag = {
    id: Config_generateID("flg"),
    key,
    value,
    updatedAt: now(),
    actor: actor || "system",
  };
  CONFIG_FLAGS.push(flag);
  return { ok: true, flag };
}

export function Config_getFlag(key) {
  const flag = CONFIG_FLAGS.find(f => f.key === key);
  return flag || null;
}

export function Config_removeFlag(key, actor) {
  const idx = CONFIG_FLAGS.findIndex(f => f.key === key);
  if (idx < 0) return { error: "Not found" };
  const removed = CONFIG_FLAGS.splice(idx, 1)[0];
  return { ok: true, removed };
}

export function Config_getFlagsBasic() {
  return CONFIG_FLAGS;
}

// ===== Env & modules (basic) =====
export function Config_getEnv() {
  return { env: "dev", region: "EU", currency: "PLN" };
}

export function Config_getModuleIds() {
  return {
    profile: "mod_profile",
    marketplace: "mod_marketplace",
    community: "mod_community",
    innovation: "mod_innovation",
    education: "mod_education",
    dao: "mod_dao",
    audit: "mod_audit",
  };
}

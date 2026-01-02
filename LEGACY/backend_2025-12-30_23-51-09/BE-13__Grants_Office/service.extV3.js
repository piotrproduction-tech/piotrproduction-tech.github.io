// backend/BE-13/service.extV3.js

// Shared in-memory storages (can be centralized later)
let ID_SEQUENCES = {};
let CONFIG_FLAGS = [];
let CONFIG_HISTORY = [];

function now() {
  return new Date().toISOString();
}

// ===== ID Generator (sequence-based) =====
export function Config_generateID_sequence(prefix) {
  if (!ID_SEQUENCES[prefix]) ID_SEQUENCES[prefix] = 0;
  ID_SEQUENCES[prefix]++;
  const id = `${prefix}-${ID_SEQUENCES[prefix]}`;
  return id;
}

export function Config_validateID(id) {
  const parts = String(id).split("-");
  if (parts.length < 2) return false;
  const num = parseInt(parts[1], 10);
  return !isNaN(num) && num > 0;
}

export function Config_listIDs(prefix) {
  const list = [];
  const max = ID_SEQUENCES[prefix] || 0;
  for (let i = 1; i <= max; i++) {
    list.push(`${prefix}-${i}`);
  }
  return list;
}

// ===== Flags (env, rollout) =====
export function Config_setFlag_extended(key, value, actor, env, rollout) {
  let flag = CONFIG_FLAGS.find(f => f.key === key);
  if (!flag) {
    flag = {
      key,
      value,
      env: env || "global",
      rollout: typeof rollout === "number" ? rollout : 100,
      updatedAt: now(),
    };
    CONFIG_FLAGS.push(flag);
  } else {
    flag.value = value;
    flag.env = env || flag.env;
    flag.rollout = typeof rollout === "number" ? rollout : flag.rollout;
    flag.updatedAt = now();
  }
  return { ok: true, flag };
}

export function Config_removeFlag_extended(key, actor) {
  const idx = CONFIG_FLAGS.findIndex(f => f.key === key);
  if (idx < 0) return { error: "Flag not found" };
  const removed = CONFIG_FLAGS.splice(idx, 1)[0];
  return { ok: true, removed };
}

export function Config_getFlags(env) {
  return CONFIG_FLAGS.filter(
    f => f.env === env || f.env === "global"
  );
}

// Simple hashing helper for rollout
function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < String(str).length; i++) {
    h = (h << 5) - h + String(str).charCodeAt(i);
    h |= 0;
  }
  return h;
}

export function Config_rolloutCheck(key, userHash) {
  const flag = CONFIG_FLAGS.find(f => f.key === key);
  if (!flag) return false;
  const hash = Math.abs(simpleHash(userHash)) % 100;
  return hash < (flag.rollout || 0);
}

// ===== Versioning & audit trail =====
export function Config_setFlagVersioned(key, value, actor, env, rollout, reason) {
  const res = Config_setFlag_extended(key, value, actor, env, rollout);
  const entry = {
    id: Config_generateID_sequence("flagHist"),
    key,
    value,
    actor: actor || "system",
    env: env || "global",
    rollout: typeof rollout === "number" ? rollout : 100,
    reason: reason || "",
    timestamp: now(),
  };
  CONFIG_HISTORY.push(entry);
  return { ok: true, flag: res.flag, historyEntry: entry };
}

export function Config_flagAuditTrail(key) {
  return CONFIG_HISTORY.filter(h => h.key === key);
}

export function Config_rolloutScenario(key, userGroupHash) {
  const flag = CONFIG_FLAGS.find(f => f.key === key);
  if (!flag) return false;
  const hash = Math.abs(simpleHash(userGroupHash)) % 100;
  return hash < (flag.rollout || 0);
}

// ===== Feature flags / toggles (high-level) =====
export function Config_featureFlags() {
  return [
    { key: "marketplaceEnabled", desc: "Marketplace aktywny" },
    { key: "vrEnabled", desc: "VR aktywne" },
    { key: "governanceEnabled", desc: "Governance aktywne" },
  ];
}

export function Config_toggleFlag(flagKey, value) {
  // High-level toggle wrapper (stateless)
  const flags = {
    marketplaceEnabled: true,
    vrEnabled: true,
    governanceEnabled: false,
    aiAssistantEnabled: true,
  };
  flags[flagKey] = !!value;
  return { ok: true, flags };
}

export function Config_envSwitch(env) {
  return { ok: true, env };
}

/**
 * CITY SELF‑HEALING ENGINE
 * Automatyczna regeneracja struktury miasta.
 */

export const CitySelfHealingEngine = {
  healCity(city) {
    if (!city) city = {};

    if (!city.instances || typeof city.instances !== "object") {
      city.instances = {};
    }

    for (const [id, inst] of Object.entries(city.instances)) {
      if (!inst.createdAt) inst.createdAt = Date.now();
      if (!Array.isArray(inst.snapshots)) inst.snapshots = [];
      if (!inst.state || typeof inst.state !== "object") inst.state = {};
    }

    if (!city.shards || typeof city.shards !== "object") {
      city.shards = {};
    }

    for (const [id, shard] of Object.entries(city.shards)) {
      if (!Array.isArray(shard.entities)) shard.entities = [];
    }

    if (!city.globalEvents || !Array.isArray(city.globalEvents)) {
      city.globalEvents = [];
    }

    return city;
  }
};
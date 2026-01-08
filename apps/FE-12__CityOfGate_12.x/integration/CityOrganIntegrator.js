// apps/CityCore_12.x/integration/CityOrganIntegrator.js

export function createCityOrganIntegrator({ app, districts }) {
  const registry = new Map();

  function registerDistrict(id, dna) {
    registry.set(id, { dna, connected: false });
  }

  function connectAll() {
    for (const [id, entry] of registry) {
      const { dna } = entry;
      if (!dna.state?.initialized) dna.init(app);
      entry.connected = true;
    }

    // relacje między dzielnicami (równe z równym)
    for (const [idA, a] of registry) {
      for (const [idB, b] of registry) {
        if (idA === idB) continue;
        a.dna.onConnect?.(b.dna);
      }
    }
  }

  function tickAll() {
    for (const [id, entry] of registry) {
      entry.dna.tick?.(app);
    }
  }

  function reflectAll() {
    const reflections = {};
    for (const [id, entry] of registry) {
      reflections[id] = entry.dna.reflect?.();
    }
    return reflections;
  }

  function getOrgan(id) {
    return registry.get(id)?.dna || null;
  }

  return {
    registerDistrict,
    connectAll,
    tickAll,
    reflectAll,
    getOrgan
  };
}

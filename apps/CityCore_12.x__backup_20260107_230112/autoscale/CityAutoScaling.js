// CityCore_12.x/autoscale/CityAutoScaling.js

export function createCityAutoScaling({ app, healthMonitor }) {
  const replicas = new Map(); // districtId  [instances]

  function cloneDistrict(district) {
    const factory = district.config?.factory || district.bootstrap;
    return factory({ autoscaled: true });
  }

  function ensureReplicaList(districtId) {
    if (!replicas.has(districtId)) replicas.set(districtId, []);
    return replicas.get(districtId);
  }

  function scaleUp(district) {
    const list = ensureReplicaList(district.id);
    const newInstance = cloneDistrict(district);
    list.push(newInstance);
    console.log(`[AUTOSCALE] Scaled UP district ${district.id}  ${list.length} replicas`);
  }

  function scaleDown(district) {
    const list = ensureReplicaList(district.id);
    if (list.length > 1) {
      list.pop();
      console.log(`[AUTOSCALE] Scaled DOWN district ${district.id}  ${list.length} replicas`);
    }
  }

  function pickInstance(district) {
    const list = ensureReplicaList(district.id);
    if (list.length === 0) return district;

    // wybierz instancj o najmniejszym obcieniu
    return list.reduce((best, inst) => {
      const loadA = inst.workflows?.debug?.().load || 0;
      const loadB = best.workflows?.debug?.().load || 0;
      return loadA < loadB ? inst : best;
    }, list[0]);
  }

  // Patch router  wybiera instancj zamiast oryginau
  const originalResolve = app.runtime.router.resolve;
  app.runtime.router.resolve = (user) => {
    const resolved = originalResolve(user);
    const district = resolved.activeDistrict;

    const instance = pickInstance(district);
    resolved.activeDistrict = instance;

    return resolved;
  };

  // Autoscaling loop
  setInterval(() => {
    const { status } = healthMonitor.getHealth();

    for (const district of app.runtime.router.districts) {
      const list = ensureReplicaList(district.id);

      if (status.tick > 20 || status.ai > 25) {
        scaleUp(district);
      } else if (status.tick < 5 && list.length > 1) {
        scaleDown(district);
      }
    }
  }, 1000);

  return {
    replicas,
    scaleUp,
    scaleDown,
    pickInstance
  };
}


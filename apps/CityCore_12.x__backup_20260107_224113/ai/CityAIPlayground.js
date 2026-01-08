// CityCore_12.x/ai/CityAIPlayground.js

export function createCityAIPlayground({ app }) {
  const tests = [];

  function listDistricts() {
    return app.runtime.router.districts.map(d => d.id);
  }

  function run(districtId, payload) {
    const d = app.runtime.router.districts.find(x => x.id === districtId);
    if (!d || !d.ai || !d.ai.process) return null;

    const result = d.ai.process(payload);

    tests.push({
      at: Date.now(),
      district: districtId,
      input: payload,
      output: result
    });

    return result;
  }

  function getPipeline(districtId) {
    const d = app.runtime.router.districts.find(x => x.id === districtId);
    return d?.ai?.debug?.() || null;
  }

  function getTests() {
    return tests;
  }

  return {
    listDistricts,
    run,
    getPipeline,
    getTests
  };
}


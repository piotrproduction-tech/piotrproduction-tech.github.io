// CityCore_12.x/ai/CityAIConsole.js

export function createCityAIConsole({ app }) {
  function listDistricts() {
    return app.runtime.router.districts.map(d => d.id);
  }

  function getPipeline(districtId) {
    const d = app.runtime.router.districts.find(x => x.id === districtId);
    if (!d || !d.ai || !d.ai.debug) return null;
    return d.ai.debug();
  }

  function run(districtId, payload) {
    const d = app.runtime.router.districts.find(x => x.id === districtId);
    if (!d || !d.ai || !d.ai.process) return null;
    return d.ai.process(payload);
  }

  return {
    listDistricts,
    getPipeline,
    run
  };
}


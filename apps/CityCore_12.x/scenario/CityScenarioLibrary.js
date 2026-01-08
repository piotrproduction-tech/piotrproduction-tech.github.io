// CityCore_12.x/scenario/CityScenarioLibrary.js

export function createCityScenarioLibrary({ scenarioEngine }) {
  const scenarios = {
    // 1. Co by byo gdyby user poszed do innego districtu?
    alternateDistrict: (districtId) => [
      { type: "gotoDistrict", district: districtId }
    ],

    // 2. Co by byo gdyby user wybra inny widok?
    alternateView: (districtId, view) => [
      { type: "gotoDistrict", district: districtId },
      { type: "gotoView", view }
    ],

    // 3. Co by byo gdyby AI zwrcio inn decyzj?
    alternateAI: (districtId, payload) => [
      { type: "gotoDistrict", district: districtId },
      { type: "ai", district: districtId, payload }
    ],

    // 4. Co by byo gdyby workflow wykona si inaczej?
    alternateWorkflow: (districtId, payload) => [
      { type: "gotoDistrict", district: districtId },
      { type: "workflow", district: districtId, payload }
    ],

    // 5. Co by byo gdyby eventBus dosta inny event?
    alternateEvent: (districtId, event, payload) => [
      { type: "gotoDistrict", district: districtId },
      { type: "emit", district: districtId, event, payload }
    ],

    // 6. Pena alternatywna cieka uytkownika
    fullAlternatePath: (districtId, view, event, payload) => [
      { type: "gotoDistrict", district: districtId },
      { type: "gotoView", view },
      { type: "emit", district: districtId, event, payload }
    ]
  };

  function run(name, ...args) {
    const actions = scenarios[name](...args);
    return scenarioEngine.simulate(actions);
  }

  return {
    scenarios,
    run
  };
}


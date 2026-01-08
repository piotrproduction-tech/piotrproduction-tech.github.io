// CityCore_12.x/scenario/CityScenarioLibrary.js

export function createCityScenarioLibrary({ scenarioEngine }) {
  const scenarios = {
    // 1. Co by byĹ‚o gdyby user poszedĹ‚ do innego districtu?
    alternateDistrict: (districtId) => [
      { type: "gotoDistrict", district: districtId }
    ],

    // 2. Co by byĹ‚o gdyby user wybraĹ‚ inny widok?
    alternateView: (districtId, view) => [
      { type: "gotoDistrict", district: districtId },
      { type: "gotoView", view }
    ],

    // 3. Co by byĹ‚o gdyby AI zwrĂłciĹ‚o innÄ… decyzjÄ™?
    alternateAI: (districtId, payload) => [
      { type: "gotoDistrict", district: districtId },
      { type: "ai", district: districtId, payload }
    ],

    // 4. Co by byĹ‚o gdyby workflow wykonaĹ‚ siÄ™ inaczej?
    alternateWorkflow: (districtId, payload) => [
      { type: "gotoDistrict", district: districtId },
      { type: "workflow", district: districtId, payload }
    ],

    // 5. Co by byĹ‚o gdyby eventBus dostaĹ‚ inny event?
    alternateEvent: (districtId, event, payload) => [
      { type: "gotoDistrict", district: districtId },
      { type: "emit", district: districtId, event, payload }
    ],

    // 6. PeĹ‚na alternatywna Ĺ›cieĹĽka uĹĽytkownika
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


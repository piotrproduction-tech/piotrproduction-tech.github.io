// CityCore_12.x/scenario/CityScenarioEngine.js

export function createCityScenarioEngine({ app }) {
  function cloneDistrict(district) {
    const factory = district.config?.factory || district.bootstrap;
    return factory({ scenario: true });
  }

  function createSandbox() {
    const sandbox = {
      districts: {},
      router: {
        activeDistrict: null,
        navigateToDistrict(id) {
          sandbox.router.activeDistrict = sandbox.districts[id];
        },
        navigateToView(view) {
          sandbox.router.activeDistrict?.views?.[view]?.();
        }
      }
    };

    for (const district of app.runtime.router.districts) {
      sandbox.districts[district.id] = cloneDistrict(district);
    }

    return sandbox;
  }

  function simulate(actions = []) {
    const sandbox = createSandbox();

    for (const action of actions) {
      const { type, district, view, event, payload } = action;

      switch (type) {
        case "gotoDistrict":
          sandbox.router.navigateToDistrict(district);
          break;

        case "gotoView":
          sandbox.router.navigateToView(view);
          break;

        case "emit":
          sandbox.districts[district]?.eventBus?.emit(event, payload);
          break;

        case "workflow":
          sandbox.districts[district]?.workflows?.step(payload);
          break;

        case "ai":
          sandbox.districts[district]?.ai?.process(payload);
          break;
      }
    }

    const result = {
      activeDistrict: sandbox.router.activeDistrict?.id,
      snapshot: sandbox.router.activeDistrict?.store?.getSnapshot?.()
    };

    return result;
  }

  return {
    simulate
  };
}



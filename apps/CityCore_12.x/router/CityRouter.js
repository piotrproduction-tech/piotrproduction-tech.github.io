// CityCore_12.x/router/CityRouter.js

export function createCityRouter({ districts }) {
  let activeDistrict = null;
  let activeView = "renderMain";

  function navigateToDistrict(id) {
    activeDistrict = districts.find((d) => d.id === id) || null;
  }

  function navigateToView(viewName) {
    activeView = viewName;
  }

  function resolve(user) {
    if (!activeDistrict) {
      return {
        activeDistrict: null,
        viewObject: null,
        immersive: null
      };
    }

    const viewFn = activeDistrict.views[activeView] || activeDistrict.views.renderMain;
    const viewObject = viewFn(user);

    const immersive = activeDistrict.panels.getImmersiveState();

    return {
      activeDistrict,
      viewObject,
      immersive
    };
  }

  return {
    navigateToDistrict,
    navigateToView,
    resolve
  };
}

//
// AUTO-INTEGRATED DISTRICTS
// FE-21 Marketplace
// FE-33 Marketplace Street
//

// CityCore_12.x/app/createCityApp.js

import { createCityRuntime } from "../runtime/createCityRuntime.js";

export function createCityApp({ districts, eventBus }) {
  if (!Array.isArray(districts) || districts.length === 0) {
    throw new Error("CityApp requires at least one district.");
  }

  // 1. Build the full runtime (engine + router + shell + state)
  const runtime = createCityRuntime({
    districts,
    eventBus
  });

  // 2. Public API for the outside world
  function start(user, interval = 1000) {
    runtime.start(user, interval);
  }

  function stop() {
    runtime.stop();
  }

  function render(user) {
    return runtime.render(user);
  }

  function navigateToDistrict(id) {
    runtime.router.navigateToDistrict(id);
  }

  function navigateToView(viewName) {
    runtime.router.navigateToView(viewName);
  }

  return {
    start,
    stop,
    render,
    navigateToDistrict,
    navigateToView,
    runtime
  };
}



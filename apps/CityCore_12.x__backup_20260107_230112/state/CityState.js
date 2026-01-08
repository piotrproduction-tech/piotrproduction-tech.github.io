// CityCore_12.x/state/CityState.js

export function createCityState() {
  let state = {
    started: false,
    lastHeartbeat: null,
    activeDistrictId: null
  };

  function setActiveDistrict(id) {
    state = { ...state, activeDistrictId: id };
  }

  function markStarted() {
    state = { ...state, started: true, lastHeartbeat: Date.now() };
  }

  function markHeartbeat() {
    state = { ...state, lastHeartbeat: Date.now() };
  }

  function markStopped() {
    state = { ...state, started: false };
  }

  function getState() {
    return { ...state };
  }

  return {
    setActiveDistrict,
    markStarted,
    markHeartbeat,
    markStopped,
    getState
  };
}


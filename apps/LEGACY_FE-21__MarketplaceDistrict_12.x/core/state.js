// FE-21__MarketplaceDistrict_12.x/core/state.js

export function createStateLayer({ store, eventBus }) {
  function setFlag(key, value) {
    store.update("core", (prev) => ({
      ...prev,
      flags: {
        ...(prev.flags || {}),
        [key]: value
      }
    }));
    eventBus.emit("core:flag:set", { key, value });
  }

  function setMeta(key, value) {
    store.update("core", (prev) => ({
      ...prev,
      meta: {
        ...(prev.meta || {}),
        [key]: value
      }
    }));
    eventBus.emit("core:meta:set", { key, value });
  }

  function getCoreState() {
    return store.getSlice("core") || {};
  }

  store.registerSlice("core", {
    getState: () => ({
      flags: {},
      meta: {}
    })
  });

  return {
    setFlag,
    setMeta,
    getCoreState
  };
}

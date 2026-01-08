export function createStore({ eventBus }) {
    const slices = new Map();
    let state = {};

    function registerSlice(name, { getState }) {
      if (slices.has(name)) return;
      slices.set(name, { getState });
      recompute();
    }

    function recompute() {
      const next = {};
      for (const [name, slice] of slices.entries()) {
        next[name] = slice.getState();
      }
      state = next;
      eventBus.emit("store:updated", { state });
    }

    function getSnapshot() {
      return { ...state };
    }

    function getSlice(name) {
      return state[name];
    }

    function update(sliceName, updater) {
      const prev = state[sliceName] || {};
      const next = updater(prev);
      slices.set(sliceName, {
        getState: () => next
      });
      recompute();
    }

    function dispatch(action, payload) {
      eventBus.emit("store:action", { action, payload });
    }

    return {
      registerSlice,
      getSnapshot,
      getSlice,
      update,
      dispatch
    };
  }


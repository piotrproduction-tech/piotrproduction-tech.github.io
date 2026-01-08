export function createRegistry({ store, eventBus }) {
    const modules = new Map();

    function registerModule(id, definition) {
      if (modules.has(id)) {
        eventBus.emit("registry:warning", { id, reason: "already-registered" });
        return;
      }
      modules.set(id, definition);
      eventBus.emit("registry:registered", { id, definition });
    }

    function getModule(id) {
      return modules.get(id) || null;
    }

    function listModules() {
      return Array.from(modules.keys());
    }

    function invoke(id, method, ...args) {
      const mod = modules.get(id);
      if (!mod || typeof mod[method] !== "function") {
        eventBus.emit("registry:error", { id, method, reason: "not-found" });
        return null;
      }
      try {
        const result = mod[method](...args);
        eventBus.emit("registry:invoked", { id, method, args, result });
        return result;
      } catch (err) {
        eventBus.emit("registry:error", { id, method, error: String(err) });
        return null;
      }
    }

    store.registerSlice("registry", {
      getState: () => ({
        modules: listModules()
      })
    });

    return {
      registerModule,
      getModule,
      listModules,
      invoke
    };
  }


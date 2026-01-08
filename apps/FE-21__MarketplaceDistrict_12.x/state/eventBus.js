export function createEventBus() {
    const listeners = new Map();

    function on(event, handler) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event).add(handler);
      return () => off(event, handler);
    }

    function off(event, handler) {
      const set = listeners.get(event);
      if (!set) return;
      set.delete(handler);
    }

    function emit(event, payload) {
      const set = listeners.get(event);
      if (!set) return;
      for (const handler of set) {
        try {
          handler(payload);
        } catch (err) {
          // swallow for now
        }
      }
    }

    function clear() {
      listeners.clear();
    }

    return {
      on,
      off,
      emit,
      clear
    };
  }


// CityCore_12.x/events/EventBus.js

export function createEventBus() {
  const listeners = {};

  function on(event, handler) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(handler);
  }

  function off(event, handler) {
    if (!listeners[event]) return;
    listeners[event] = listeners[event].filter((h) => h !== handler);
  }

  function emit(event, payload) {
    if (!listeners[event]) return;
    for (const handler of listeners[event]) {
      handler(payload);
    }
  }

  return {
    on,
    off,
    emit
  };
}


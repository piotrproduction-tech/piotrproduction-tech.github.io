const listeners = {};

export const eventBus = {
  on(event, callback) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(callback);

    console.log(`🟦 eventBus.on → ${event} (listeners: ${listeners[event].length})`);
  },

  off(event, callback) {
    if (!listeners[event]) return;
    listeners[event] = listeners[event].filter(cb => cb !== callback);

    console.log(`🟧 eventBus.off → ${event}`);
  },

  emit(event, data) {
    console.log(`🟥 eventBus.emit → ${event}`, data);

    if (!listeners[event]) return;
    for (const cb of listeners[event]) cb(data);
  }
};

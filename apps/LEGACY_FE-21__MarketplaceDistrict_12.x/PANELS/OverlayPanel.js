// PANELS/OverlayPanel.js

export function createOverlayPanel({ eventBus }) {
  let messages = [];

  function push(message) {
    messages.push({
      id: messages.length + 1,
      message,
      at: Date.now()
    });
    eventBus.emit("overlay:message", { message });
  }

  function list() {
    return [...messages];
  }

  function refresh() {
    // overlays usually don't compute anything,
    // but ImmersivePanel expects this method
  }

  function reset() {
    messages = [];
  }

  // 🔥 optional: clear overlays on district destroy
  eventBus?.on?.("engine:destroy", reset);

  return {
    push,
    list,
    refresh,
    reset
  };
}

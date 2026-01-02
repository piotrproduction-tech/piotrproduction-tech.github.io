// Listener'y zdarzeń dla Stream Square (BE-22)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-22", (event) => {
    console.log("📡 Event in BE-22:", event);
  });
}

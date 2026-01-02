// Listener'y zdarzeń dla Admin Tower (BE-16)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-16", (event) => {
    console.log("📡 Event in BE-16:", event);
  });
}

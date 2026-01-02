// Listener'y zdarzeń dla Admin Tower (BE-50)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-50", (event) => {
    console.log("📡 Event in BE-50:", event);
  });
}

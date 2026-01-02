// Listener'y zdarzeń dla Admin Tower (BE-34)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-34", (event) => {
    console.log("📡 Event in BE-34:", event);
  });
}

// Listener'y zdarzeń dla Culture Gallery (BE-23)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-23", (event) => {
    console.log("📡 Event in BE-23:", event);
  });
}

// Listener'y zdarzeń dla Studio Hub (BE-54)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-54", (event) => {
    console.log("📡 Event in BE-54:", event);
  });
}

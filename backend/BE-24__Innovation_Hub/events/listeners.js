// Listener'y zdarzeń dla Innovation Hub (BE-24)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-24", (event) => {
    console.log("📡 Event in BE-24:", event);
  });
}

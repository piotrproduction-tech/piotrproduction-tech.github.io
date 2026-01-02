// Listener'y zdarzeń dla Innovation Hub (BE-40)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-40", (event) => {
    console.log("📡 Event in BE-40:", event);
  });
}

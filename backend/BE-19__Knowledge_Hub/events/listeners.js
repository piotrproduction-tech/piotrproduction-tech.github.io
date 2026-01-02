// Listener'y zdarzeń dla Knowledge Hub (BE-19)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-19", (event) => {
    console.log("📡 Event in BE-19:", event);
  });
}

// Listener'y zdarzeń dla Festival Hub (BE-52)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-52", (event) => {
    console.log("📡 Event in BE-52:", event);
  });
}

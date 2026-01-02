// Listener'y zdarzeń dla AI Companion (BE-38)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-38", (event) => {
    console.log("📡 Event in BE-38:", event);
  });
}

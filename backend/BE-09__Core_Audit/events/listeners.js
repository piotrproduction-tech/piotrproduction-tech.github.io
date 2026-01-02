// Listener'y zdarzeń dla Core Audit (BE-09)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-09", (event) => {
    console.log("📡 Event in BE-09:", event);
  });
}

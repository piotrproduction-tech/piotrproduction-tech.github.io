// Listener'y zdarzeń dla Sports Arena (BE-27)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-27", (event) => {
    console.log("📡 Event in BE-27:", event);
  });
}

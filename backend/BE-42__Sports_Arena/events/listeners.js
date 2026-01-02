// Listener'y zdarzeń dla Sports Arena (BE-42)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-42", (event) => {
    console.log("📡 Event in BE-42:", event);
  });
}

// Listener'y zdarzeń dla Media Tower (BE-53)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-53", (event) => {
    console.log("📡 Event in BE-53:", event);
  });
}

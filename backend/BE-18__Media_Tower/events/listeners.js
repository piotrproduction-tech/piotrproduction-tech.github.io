// Listener'y zdarzeń dla Media Tower (BE-18)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-18", (event) => {
    console.log("📡 Event in BE-18:", event);
  });
}

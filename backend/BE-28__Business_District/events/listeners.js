// Listener'y zdarzeń dla Business District (BE-28)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-28", (event) => {
    console.log("📡 Event in BE-28:", event);
  });
}

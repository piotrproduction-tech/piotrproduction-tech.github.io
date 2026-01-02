// Listener'y zdarzeń dla Business District (BE-48)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-48", (event) => {
    console.log("📡 Event in BE-48:", event);
  });
}

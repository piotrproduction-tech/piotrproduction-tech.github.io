// Listener'y zdarzeń dla Culture Gallery (BE-41)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-41", (event) => {
    console.log("📡 Event in BE-41:", event);
  });
}

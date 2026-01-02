// Listener'y zdarzeń dla Wellness Garden (BE-26)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-26", (event) => {
    console.log("📡 Event in BE-26:", event);
  });
}

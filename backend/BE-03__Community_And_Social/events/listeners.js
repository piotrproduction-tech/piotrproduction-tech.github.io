// Listener'y zdarzeń dla Community And Social (BE-03)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-03", (event) => {
    console.log("📡 Event in BE-03:", event);
  });
}

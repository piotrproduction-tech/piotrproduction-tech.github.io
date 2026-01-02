// Listener'y zdarzeń dla Innovation And Business (BE-04)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-04", (event) => {
    console.log("📡 Event in BE-04:", event);
  });
}

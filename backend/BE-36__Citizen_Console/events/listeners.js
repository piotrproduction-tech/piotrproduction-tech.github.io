// Listener'y zdarzeń dla Citizen Console (BE-36)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-36", (event) => {
    console.log("📡 Event in BE-36:", event);
  });
}

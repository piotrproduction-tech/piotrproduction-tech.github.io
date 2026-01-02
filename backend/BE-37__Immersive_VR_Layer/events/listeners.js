// Listener'y zdarzeń dla Immersive VR Layer (BE-37)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-37", (event) => {
    console.log("📡 Event in BE-37:", event);
  });
}

// Listener'y zdarzeń dla Education And DAO (BE-05)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-05", (event) => {
    console.log("📡 Event in BE-05:", event);
  });
}

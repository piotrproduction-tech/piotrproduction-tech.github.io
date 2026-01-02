// Listener'y zdarzeń dla Education And DAO (BE-51)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-51", (event) => {
    console.log("📡 Event in BE-51:", event);
  });
}

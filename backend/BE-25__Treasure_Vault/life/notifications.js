import { CitySuperEngine } from "../../BE-00__City/SUPER_ENGINE/CitySuperEngine.js";
// Powiadomienia dzielnicy Treasure Vault (BE-25)
export function mapEventToNotification(event) {
  return null;
}



export function mapEventToNotification(event) {
  if (event.module !== "BE-25") return null;
  const processed = CitySuperEngine.process(event);
  return processed.life.notification;
}

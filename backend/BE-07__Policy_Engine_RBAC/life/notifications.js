import { CitySuperEngine } from "../../BE-00__City/SUPER_ENGINE/CitySuperEngine.js";
// Powiadomienia dzielnicy Policy Engine RBAC (BE-07)
export function mapEventToNotification(event) {
  return null;
}



export function mapEventToNotification(event) {
  if (event.module !== "BE-07") return null;
  const processed = CitySuperEngine.process(event);
  return processed.life.notification;
}

import { CitySuperEngine } from "../../BE-00__City/SUPER_ENGINE/CitySuperEngine.js";
// Powiadomienia dzielnicy Education And DAO (BE-05)
export function mapEventToNotification(event) {
  return null;
}



export function mapEventToNotification(event) {
  if (event.module !== "BE-05") return null;
  const processed = CitySuperEngine.process(event);
  return processed.life.notification;
}

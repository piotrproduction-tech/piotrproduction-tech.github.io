import { CitySuperEngine } from "../../BE-00__City/SUPER_ENGINE/CitySuperEngine.js";
// Powiadomienia dzielnicy Studio Hub (BE-54)
export function mapEventToNotification(event) {
  return null;
}



export function mapEventToNotification(event) {
  if (event.module !== "BE-54") return null;
  const processed = CitySuperEngine.process(event);
  return processed.life.notification;
}

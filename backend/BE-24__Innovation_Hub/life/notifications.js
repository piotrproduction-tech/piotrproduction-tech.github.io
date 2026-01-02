import { CitySuperEngine } from "../../BE-00__City/SUPER_ENGINE/CitySuperEngine.js";
// Powiadomienia dzielnicy Innovation Hub (BE-24)
export function mapEventToNotification(event) {
  return null;
}



export function mapEventToNotification(event) {
  if (event.module !== "BE-24") return null;
  const processed = CitySuperEngine.process(event);
  return processed.life.notification;
}

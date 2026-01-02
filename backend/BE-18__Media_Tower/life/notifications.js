import { CitySuperEngine } from "../../BE-00__City/SUPER_ENGINE/CitySuperEngine.js";
// Powiadomienia dzielnicy Media Tower (BE-18)
export function mapEventToNotification(event) {
  return null;
}



export function mapEventToNotification(event) {
  if (event.module !== "BE-18") return null;
  const processed = CitySuperEngine.process(event);
  return processed.life.notification;
}
